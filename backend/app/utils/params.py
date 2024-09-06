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
                    'stellar table',
                 )

sectionLabels = { 
    # map section label (in output) to corresponding backend table name
    'Dict' :'dictionary', 
    'Pairs':'hash_pairs', 
    'Category':'hash_context1', 
    'Tags'  :'hash_context2', 
    'Titles':'hash_context3', 
    'Descr.':'hash_context4', 
    'Meta'  :'hash_context5',
    'ID'    :'hash_ID',
    'Agents': 'hash_agents',
    'Whole' :'full_content'
}

with open(f"{DATA_DIR}/{DATAFILE}", "rb") as file:
    backendTables = pickle.load(file)