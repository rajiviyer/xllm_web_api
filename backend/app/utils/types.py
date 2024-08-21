from typing_extensions import TypedDict

class frontendParamsType(TypedDict):    
    embeddingKeyMinSize: int
    embeddingValuesMinSize: int
    min_pmi: float
    nABmin: int
    Customized_pmi: int
    ContextMultitokenMinSize: int
    minOutputListSize: int
    bypassIgnoreList: int
    ignoreList: tuple
    query: str
# frontendParamsType = TypedDict("frontendParamsType", 
#                                {
#                                 "embeddingKeyMinSize": int,
#                                 "embeddingValuesMinSize": int,
#                                 "min_pmi": float,
#                                 "nABmin": int,
#                                 "Customized_pmi": int,
#                                 "ContextMultitokenMinSize": int,
#                                 "minOutputListSize": int,
#                                 "bypassIgnoreList": int,
#                                 "ignoreList": tuple
#                                 }
#                                ) 