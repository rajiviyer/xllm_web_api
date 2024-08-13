import pickle 

get_bin = lambda x, n: format(x, 'b').zfill(n)

ignore = ('data',)

DATA_DIR = "./app/data"
DATAFILE = "backend_tables.pkl"

sample_queries = (
                    'parameterized datasets map tables sql server',
                    'data load templates importing data database data warehouse',
                    'pipeline extract data eventhub files',
                    'blob storage single parquet file adls gen2',
                    'eventhub files blob storage single parquet',
                    'parquet blob eventhub more files less storage single table',
                    'MLTxQuest Data Assets Detailed Information page'
                    'stellar', 'table',
                 )

sectionLabels = { 
    # map section label (in output) to corresponding backend table name
    'dict' :'dictionary', 
    'pairs':'hash_pairs', 
    'category':'hash_context1', 
    'tags'  :'hash_context2', 
    'titles':'hash_context3', 
    'descr.':'hash_context4', 
    'meta'  :'hash_context5',
    'ID'    :'hash_ID',
    'whole' :'full_content'
}

with open(f"{DATA_DIR}/{DATAFILE}", "rb") as file:
    backendTables = pickle.load(file)