## This a reference python code which is used for creating the backend tables
## This is not part of this app functionality
## This app will just read the tables created by this code for retrieving relevant data

import pickle
import json
import ast

#--- [1] Backend: functions

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


def get_value(key, hash):
    if key in hash:
        value = hash[key]
    else:
        value = ''
    return(value)


def update_tables(backendTables, word, hash_crawl, backendParams):

    category = get_value('category', hash_crawl)
    tag_list = get_value('tag_list', hash_crawl)
    title    = get_value('title', hash_crawl)
    description =  get_value('description', hash_crawl)
    meta =  get_value('meta', hash_crawl)
    ID   = get_value('ID', hash_crawl)
    full_content = get_value('full_content', hash_crawl)

    extraWeights = backendParams['extraWeights']
    word = word.lower()  # add stemming
    weight = 1.0         
    if word in category:   
        weight += extraWeights['category']
    if word in tag_list:
        weight += extraWeights['tag_list']
    if word in title:
        weight += extraWeights['title']
    if word in meta:
        weight += extraWeights['meta']

    update_hash(backendTables['dictionary'], word, weight)
    update_nestedHash(backendTables['hash_context1'], word, category) 
    update_nestedHash(backendTables['hash_context2'], word, tag_list) 
    update_nestedHash(backendTables['hash_context3'], word, title) 
    update_nestedHash(backendTables['hash_context4'], word, description)
    update_nestedHash(backendTables['hash_context5'], word, meta) 
    update_nestedHash(backendTables['hash_ID'], word, ID) 
    update_nestedHash(backendTables['full_content'], word, full_content) 

    return(backendTables)

 
def clean_list(value):

    # change string "['a', 'b', ...]" to ('a', 'b', ...)
    value = value.replace("[", "").replace("]","")
    aux = value.split("~")
    value_list = ()
    for val in aux:
       val = val.replace("'","").replace('"',"").lstrip()
       if val != '':
           value_list = (*value_list, val)
    return(value_list)


def get_key_value_pairs(entity):

    # extract key-value pairs from 'entity' (a string)
    entity = entity[1].replace("}",", '")
    flag = False
    entity2 = ""

    for idx in range(len(entity)):
        if entity[idx] == '[':
            flag = True
        elif entity[idx] == ']':
            flag = False
        if flag and entity[idx] == ",":
            entity2 += "~"
        else:
            entity2 += entity[idx]

    entity = entity2
    key_value_pairs = entity.split(", '") 
    return(key_value_pairs)


def update_dict(backendTables, hash_crawl, backendParams):

    max_multitoken = backendParams['max_multitoken'] 
    maxDist  =  backendParams['maxDist']     
    maxTerms = backendParams['maxTerms']

    category = get_value('category', hash_crawl)
    tag_list = get_value('tag_list', hash_crawl)
    title = get_value('title', hash_crawl)
    description = get_value('description', hash_crawl)
    meta = get_value('meta', hash_crawl)

    text = category + "." + str(tag_list) + "." + title + "." + description + "." + meta
    text = text.replace('/'," ").replace('(',' ').replace(')',' ').replace('?','')
    text = text.replace("'", "").replace('"',"").replace('\\n','').replace('!','')
    text = text.replace("\\s", '').replace("\\t",'').replace(",", " ")
    ## Added by Rajiv
    text = text.replace('\n','').replace('\t','').replace('\s','')
    text = text.replace('\uf0e0',' ').replace('\u200b',' ').replace('�',' ')
    text = text.lower() 
    sentence_separators = ('.',)
    for sep in sentence_separators:
        text = text.replace(sep, '_~')
    text = text.split('_~') 

    hash_pairs = backendTables['hash_pairs']
    ctokens = backendTables['ctokens']
    hwords = {}  # local word hash with word position, to update hash_pairs

    for sentence in text:

        words = sentence.split(" ")
        position = 0
        buffer = []

        for word in words:

            if word not in stopwords: 
                # word is single token
                buffer.append(word)
                key = (word, position)
                update_hash(hwords, key)  # for word correlation table (hash_pairs)
                update_tables(backendTables, word, hash_crawl, backendParams)

                for k in range(1, max_multitoken):
                    if position > k:
                        # word is now multi-token with k+1 tokens
                        word = buffer[position-k] + "~" + word 
                        key = (word, position)
                        update_hash(hwords, key)  # for word correlation table (hash_pairs)
                        update_tables(backendTables, word, hash_crawl, backendParams)

                position +=1     

    for keyA in hwords:
        for keyB in hwords:

            wordA = keyA[0]
            positionA = keyA[1]
            n_termsA = len(wordA.split("~"))

            wordB = keyB[0]
            positionB = keyB[1]
            n_termsB = len(wordB.split("~"))

            key = (wordA, wordB)
            n_termsAB = max(n_termsA, n_termsB)
            distanceAB = abs(positionA - positionB)

            if wordA < wordB and distanceAB <= maxDist and n_termsAB <= maxTerms: 
                  hash_pairs = update_hash(hash_pairs, key) 
                  if distanceAB > 1:
                      ctokens = update_hash(ctokens, key)

    return(backendTables)


#--- [2] Backend: main (create backend tables based on crawled corpus)

tableNames = (
  'dictionary',     # multitokens
  'hash_pairs',     # multitoken associations
  'hash_context1',  # categories
  'hash_context2',  # tags
  'hash_context3',  # titles
  'hash_context4',  # descriptions
  'hash_context5',  # meta
  'ctokens',        # not adjacent pairs in hash_pairs
  'hash_ID',        # ID, such as document ID or url ID
  'full_content'    # full content
)

backendTables = {}
for name in tableNames:
    backendTables[name] = {}

stopwords = ('', '-', 'in', 'the', 'and', 'to', 'of', 'a', 'this', 'for', 'is', 'with', 'from', 
             'as', 'on', 'an', 'that', 'it', 'are', 'within', 'will', 'by', 'or', 'its', 'can', 
             'your', 'be','about', 'used', 'our', 'their', 'you', 'into', 'using', 'these', 
             'which', 'we', 'how', 'see', 'below', 'all', 'use', 'across', 'provide', 'provides',
             'aims', 'one', '&', 'ensuring', 'crucial', 'at', 'various', 'through', 'find', 'ensure',
             'more', 'another', 'but', 'should', 'considered', 'provided', 'must', 'whether',
             'located', 'where', 'begins', 'any')

backendParams = {
    'max_multitoken': 4, # max. consecutive terms per multi-token for inclusion in dictionary
    'maxDist' : 3,       # max. position delta between 2 multitokens to link them in hash_pairs
    'maxTerms': 3,       # maxTerms must be <= max_multitoken
    'extraWeights' :     # deafault weight is 1
       {
          'description': 0.0,
          'category':    0.3,
          'tag_list':    0.4,
          'title':       0.2,
          'meta':        0.1
       }
}

# get repository from local file
IN = open("repository.txt","r") 
data = IN.read()
IN.close()

entities = data.split("\n")

for entity_raw in entities: 

    entity = entity_raw.split("~~")
    
    if len(entity) > 1: 

        entity_ID = int(entity[0])
        hash_crawl = {} 
        hash_crawl['ID'] = entity_ID
        hash_crawl['full_content'] = entity_raw

        entity_json = ast.literal_eval(entity[1])
        hash_crawl['category'] = entity_json["category_text"]
        hash_crawl['tag_list'] = tuple(entity_json["tags_list_text"])
        hash_crawl['title'] = entity_json["title_text"]
        hash_crawl['description'] = entity_json["description_text"] if "description_text" in entity_json else ""
        hash_crawl['meta'] = entity_json["tower_option_tower"]
        
        backendTables = update_dict(backendTables, hash_crawl, backendParams)


print()
print(len(backendTables['dictionary']))
print(len(backendTables['hash_pairs']))
print(len(backendTables['ctokens']))

with open('./data/backend_tables.pkl', 'wb') as file:
    pickle.dump(backendTables, file)
