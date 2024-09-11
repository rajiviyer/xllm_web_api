from typing_extensions import TypedDict

class frontendParamsType(TypedDict):    
    embeddingKeyMinSize: int
    embeddingValuesMinSize: int
    min_pmi: float
    Customized_pmi: bool
    minOutputListSize: int
    nABmin: int
    ContextMultitokenMinSize: int
    maxTokenCount: int
    ignoreList: str
    queryText: str
    bypassIgnoreList: int