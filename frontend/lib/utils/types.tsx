export interface FormType {
  embeddingKeyMinSize: 0;
  embeddingValuesMinSize: 0;
  min_pmi: 0;
  nABmin: 0;
  Customized_pmi: 0;
  ContextMultitokenMinSize: 0;
  minOutputListSize: 0;
  queryText: "";
  bypassIgnoreList: 1;
  ignoreList: ["data"];
}

export interface OptionButtonProps {
  handleOptionButtonClick: (data: boolean) => void;
  selectedOption: boolean;
  option1: string;
  option2: string;
}

export interface CardProps {
  category: string;
  title: string;
  description: string;
}
