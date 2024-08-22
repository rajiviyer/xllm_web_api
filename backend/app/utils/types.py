from typing_extensions import TypedDict

class frontendParamsType(TypedDict):    
    embeddingKeyMinSize: int
    embeddingValuesMinSize: int
    min_pmi: float
    Customized_pmi: int
    minOutputListSize: int
    nABmin: int
    ContextMultitokenMinSize: int
    ignoreList: str
    queryText: str
    bypassIgnoreList: int