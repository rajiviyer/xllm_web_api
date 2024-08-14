export interface FormType {
  embeddingKeyMinSize: 0;
  embeddingValuesMinSize: 0;
  min_pmi: 0;
  nABmin: 0;
  Customized_pmi: 0;
  ContextMultitokenMinSize: 0;
  minOutputListSize: 0;
  bypassIgnoreList: 0;
  ignoreList: ["string"];
}

export interface OptionButtonProps {
  handleOptionButtonClick: (data: string) => void;
  selectedOption: string;
}
