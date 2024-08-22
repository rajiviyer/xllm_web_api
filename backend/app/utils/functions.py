from .params import (get_bin, ignore, sample_queries, 
                     sectionLabels, backendTables)
from .types import frontendParamsType
from typing import Optional, List
import ast
    
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

# def generate_embeddings(hash_pairs: dict, dictionary: dict)-> dict:
#     """
#     Generate the multitoken embeddings based on the hash_pairs and dictionary.

#     Args:
#         hash_pairs (dict): A dictionary containing the frequency of each pair in the corpus.
#         dictionary (dict): A dictionary containing the frequency of each word in the corpus.

#     Returns:
#         dict: A dictionary containing the embeddings for each word in the corpus.
#     """
    
#     embeddings = {}

#     for key in hash_pairs:
#         wordA = key[0]
#         wordB = key[1]
#         nA = dictionary[wordA]
#         nB = dictionary[wordB]
#         nAB = hash_pairs[key]
#         pmi = nAB/(nA*nB)**0.5
#         update_nestedHash(embeddings, wordA, wordB, pmi)
#         update_nestedHash(embeddings, wordB, wordA, pmi)

#     return(embeddings)

# def generate_sorted_ngrams(dictionary: dict)-> dict:
#     """
#     Generate the sorted ngram embeddings that match ngram prompts with embeddings entries.

#     Args:
#         dictionary (dict): A dictionary containing the frequency of each word in the corpus.

#     Returns:
#         dict: A dictionary containing the ngram embeddings for each word in the corpus.
#     """
#     sorted_ngrams = {}

#     for word in dictionary:
#         tokens = word.split('~')
#         tokens.sort()
#         sorted_ngram = tokens[0]
#         for token in tokens[1:len(tokens)]:
#             sorted_ngram += "~" + token
#         update_nestedHash(sorted_ngrams, sorted_ngram, word)
    
#     return(sorted_ngrams)    

def process_docs(q_dictionary, q_embeddings, frontendParams)->dict:
    hash_pairs = backendTables['hash_pairs']
    dictionary = backendTables['dictionary']
    ctokens = backendTables['ctokens']
    
    local_hash = {}  # used to not show same token 2x (linked to 2 different words)     
    q_embeddings = dict(sorted(q_embeddings.items(),key=lambda item: item[1],reverse=True))

    for key in q_embeddings:
        word  = key[0]
        token = key[1]
        pmi = q_embeddings[key]
        ntk1 = len(word.split('~'))
        ntk2 = len(token.split('~'))
        flag = " "
        nAB = 0
        keyAB = (word, token)
        if word > token:
            keyAB = (token, word)
        if  keyAB in hash_pairs:
            nAB = hash_pairs[keyAB]
        if keyAB in ctokens:
            flag = '*'
        if (  ntk1 >= frontendParams['embeddingKeyMinSize'] and 
              ntk2 >= frontendParams['embeddingValuesMinSize'] and
              pmi >= frontendParams['min_pmi'] and 
              nAB >= frontendParams['nABmin'] and
              token not in local_hash and word not in ignore
            ):
            print("%3d %4.2f %1s %s %s" 
                      %(nAB,pmi,flag,token.ljust(35),word.ljust(35)))
            local_hash[token] = 1 # token marked as displayed, won't be showed again
    

    local_hash = {}

    for label in ('category','tags','titles','descr.','ID','whole'):
        tableName = sectionLabels[label]
        table = backendTables[tableName]
        local_hash = {}
        # print(">>> RESULTS - SECTION: %s\n" % (label))
        for word in q_dictionary:  
            ntk3 =  len(word.split('~'))
            if word not in ignore and ntk3 >= frontendParams['ContextMultitokenMinSize']: 
                content = table[word]   # content is a hash
                count = int(dictionary[word])
                for item in content:
                    update_nestedHash(local_hash, item, word, count)
        for item in local_hash:
            hash2 = local_hash[item]
            if len(hash2) >= frontendParams['minOutputListSize']:
                print("   %s: %s [%d entries]" % (label, item, len(hash2))) 
                for key in hash2:
                    print("   Linked to: %s (%s)" %(key, hash2[key]))
                print()
        print()  
    return {"status":"Docs processed"}  
    
def get_docs(form_params: frontendParamsType) -> List[dict]:
    print("form_params", form_params)
    query = form_params['queryText']
    query = query.split(' ')
    query.sort() 
    q_embeddings = {} 
    q_dictionary = {} 
    
    # hash_pairs = backendTables['hash_pairs']
    dictionary = backendTables['dictionary']
    # ctokens = backendTables['ctokens']
    embeddings = backendTables["embeddings"]
    sorted_ngrams = backendTables["sorted_ngrams"]

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
                            if form_params['Customized_pmi'] == 0:
                                pmi = embedding[token]
                            else:
                                # customized pmi
                                pmi = custom_pmi(word, token)
                            q_embeddings[(word, token)] = pmi        
    
    if len(query) == 1:
        # single-token query
        form_params['embeddingKeyMinSize'] = 1
        form_params['ContextMultitokenMinSize'] = 1
        
    local_hash = {}
    result = []

    for label in ('category','tags','titles','descr.','ID','whole'):
        tableName = sectionLabels[label]
        table = backendTables[tableName]
        local_hash = {}
        print(">>> RESULTS - SECTION: %s\n" % (label))
        for word in q_dictionary:  
            ntk3 =  len(word.split('~'))
            if word not in ignore and ntk3 >= form_params['ContextMultitokenMinSize']: 
                content = table[word]   # content is a hash
                count = int(dictionary[word])
                for item in content:
                    update_nestedHash(local_hash, item, word, count)
        for item in local_hash:
            if label == 'whole':
                result_dict = ast.literal_eval(item.split("~~")[1])
                result.append({
                    "category":result_dict["category_text"],
                    "title":result_dict["title_text"],
                    "tags": ", ".join([tag.strip() for tag in result_dict['tags_list_text']]),
                    "description":result_dict["description_text"]
                })
            hash2 = local_hash[item]
            if len(hash2) >= form_params['minOutputListSize']:
                print("   %s: %s [%d entries]" % (label, item, len(hash2))) 
                for key in hash2:
                    print("   Linked to: %s (%s)" %(key, hash2[key]))
                print()
        print()
    return result

