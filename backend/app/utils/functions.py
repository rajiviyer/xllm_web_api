from .params import (get_bin, ignore, sample_queries, 
                     sectionLabels, backendTables)
from .types import frontendParamsType
from typing import Optional, List
import ast
from datetime import datetime
    
def update_hash(hash, key, count=1):
    if key in hash:
        hash[key] += count
    else:
        hash[key] = count
    return(hash)


def update_nestedHash(hash, key, value, count=1):
    # 'key' is a word here, value is tuple or single value
    if key in hash:
        local_hash = hash[key]
    else:
        local_hash = {}
    if type(value) is not tuple: 
        value = (value,)
    for item in value:
        if item in local_hash:
            local_hash[item] += count
        else:
            local_hash[item] = count
        hash[key] = local_hash
    return(hash)

def custom_pmi(word: str, token: str) -> float:
    """
    Calculate the pointwise mutual information between two words in a corpus.

    Args:
        word (str): The first word in the pair.
        token (str): The second word in the pair.
        dictionary (dict): A dictionary containing the frequency of each word in the corpus.
        hash_pairs (dict): A dictionary containing the frequency of each pair in the corpus.

    Returns:
        float: The pointwise mutual information between the two words.
    """
    hash_pairs = backendTables['hash_pairs']
    dictionary = backendTables['dictionary']
    nAB = 0
    pmi = 0.00
    keyAB = (word, token)
    if word > token:
        keyAB = (token, word)
    if  keyAB in hash_pairs:
        nAB = hash_pairs[keyAB]
        nA = dictionary[word]
        nB = dictionary[token]
        pmi =  nAB/(nA*nB)**0.5
    return(pmi)

def distill_frontendTables(q_dictionary, q_embeddings, form_params):
    # purge q_dictionary then q_embeddings (frontend tables) 
    
    maxTokenCount = form_params['maxTokenCount']
    local_hash = {}    
    for key in q_dictionary:
        if q_dictionary[key] > maxTokenCount:
            local_hash[key] = 1
    for keyA in q_dictionary:
        for keyB in q_dictionary:
            nA = q_dictionary[keyA]
            nB = q_dictionary[keyB]
            if keyA != keyB:
                if (keyA in keyB and nA == nB) or (keyA in keyB.split('~')):
                    local_hash[keyA] = 1
    for key in local_hash:
        del q_dictionary[key]  

    local_hash = {}    
    for key in q_embeddings: 
        if key[0] not in q_dictionary:
            local_hash[key] = 1
    for key in local_hash:
        del q_embeddings[key] 
  
    return(q_dictionary, q_embeddings)
    
def get_docs(form_params: frontendParamsType) -> dict[List[dict], List[dict]]:
    """
    Get docs

    Args:
        form_params (frontendParamsType): User Input Data from Frontend  

    Returns:
        List[dict]: Dictionary of List of Embeddings & Docs
    """
    print("form_params", form_params)
    hash_pairs = backendTables['hash_pairs']
    dictionary = backendTables['dictionary']
    ID_to_agents = backendTables['ID_to_agents']
    ctokens = backendTables['ctokens']
    embeddings = backendTables["embeddings"]
    sorted_ngrams = backendTables["sorted_ngrams"]
    KW_map = backendTables["KW_map"]
        
    query = form_params['queryText']
    query = query.split(' ')
    ### New Code
    new_query = []
    for k in range(len(query)):
        token = query[k].lower()
        if token in KW_map: 
            token = KW_map[token]
        if token in dictionary:
            new_query.append(token)
    query = new_query.copy()    
    ### New Code
    query.sort() 
    q_embeddings = {} 
    q_dictionary = {} 

    # Logic for retrieving docs
    for k in range(1, 2**len(query)): 

        binary = get_bin(k, len(query))
        sorted_word = ""
        for k in range(0, len(binary)):
            if binary[k] == '1':
                if sorted_word == "":
                    sorted_word = query[k]
                else:
                    sorted_word += "~" + query[k]

        if sorted_word in sorted_ngrams:
            ngrams = sorted_ngrams[sorted_word]
            for word in ngrams:
                if word in dictionary:
                    q_dictionary[word] = dictionary[word]
                    if word in embeddings:
                        embedding = embeddings[word]
                        for token in embedding:
                            if form_params['Customized_pmi']:
                                pmi = embedding[token]
                            else:
                                # customized pmi
                                pmi = custom_pmi(word, token)
                            q_embeddings[(word, token)] = pmi        
    
    ## New Code
    distill_frontendTables(q_dictionary,q_embeddings,form_params) 
    
    local_hash_emb = {}  # used to not show same token 2x (linked to 2 different words) 
    q_embeddings = dict(sorted(q_embeddings.items(),
                               key=lambda item: item[1],
                               reverse=True))
    doc_embeddings = []
    # Logic for retrieving embeddings
    for key in q_embeddings:
        word  = key[0]
        token = key[1]
        pmi = q_embeddings[key]
        ntk1 = len(word.split('~'))
        ntk2 = len(token.split('~'))
        flag = " "
        nAB = 0
        keyAB = (word, token)
        # print("keyAB", keyAB)

        if word > token:
            keyAB = (token, word)
        if  keyAB in hash_pairs:
            nAB = hash_pairs[keyAB]
        if keyAB in ctokens:
            flag = '*'
        # print(f"keyab: {keyAB} ,nAB:{nAB}, flag: {flag}")
        if (  ntk1 >= form_params['embeddingKeyMinSize'] and 
            ntk2 >= form_params['embeddingValuesMinSize'] and
            pmi >= form_params['min_pmi'] and 
            nAB >= form_params['nABmin'] and
            token not in local_hash_emb and word not in ignore
            ): 
            # print(                {
            #         "n": nAB,
            #         "pmi": pmi,
            #         "f": flag,
            #         "token": token,
            #         "word": word
            #     }
            # )
            
            doc_embeddings.append(
                {
                    "n": nAB,
                    "pmi": pmi,
                    "f": flag,
                    "token": token,
                    "word": word
                }
                )
            local_hash_emb[token] = 1 # token marked as displayed, won't be accessed again    
    ## New Code
    
    local_hash = {}
    # agentAndWord_to_IDs = {}
    docs = []
    label = 'Whole'
    tableName = sectionLabels[label]
    table = backendTables[tableName]
    local_hash = {}
    # print(">>> RESULTS - SECTION: %s\n" % (label))
    
    for word in q_dictionary:
        ntk3 =  len(word.split('~'))
        if word not in ignore and ntk3 >= \
            form_params['ContextMultitokenMinSize']: 
            content = table[word]   # content is a hash
            count = int(dictionary[word])
            for item in content:
                update_nestedHash(local_hash, item, word, count)
                
    for item in local_hash:
        ID = ast.literal_eval(item.split("~~")[0])
        result_dict = ast.literal_eval(item.split("~~")[1])
        # print(f"Result: {result_dict}")
        # print(f"nEmbeddings: {len(doc_embeddings)}, nDocs: {len(docs)}")
        docs.append({
            "id": ID,
            "agent":list(ID_to_agents[ID].keys())[0] if ID in ID_to_agents else "",
            "category":result_dict["category_text"],
            "title":result_dict["title_text"],
            "tags": ", ".join([tag.strip() for tag in result_dict['tags_list_text']]),
            "description":result_dict["description_text"],
            "modified_date":datetime.strptime(
                result_dict["Modified Date"], 
                "%Y-%m-%dT%H:%M:%S.%fZ"
                ).strftime("%Y-%m-%d %I:%M %p") if "Modified Date" in result_dict else "",
            "link_list_text": result_dict["link_list_text"] if "link_list_text" in result_dict else "",
            "likes_list_text": result_dict["likes_list_text"] if "likes_list_text" in result_dict else "", 
            "raw_text": item.split("~~")[1]           
        })
    return {"embeddings": doc_embeddings, "docs": docs}

