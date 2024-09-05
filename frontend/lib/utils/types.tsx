export interface FormType {
  embeddingKeyMinSize: number;
  embeddingValuesMinSize: number;
  min_pmi: number;
  nABmin: number;
  Customized_pmi: number;
  ContextMultitokenMinSize: number;
  maxTokenCount: number;
  minOutputListSize: number;
  queryText: string;
  bypassIgnoreList: number;
  ignoreList: ReadonlyArray<string>;
}

export interface OptionButtonProps {
  handleOptionButtonClick: (data: boolean) => void;
  selectedOption: boolean;
  option1: string;
  option2: string;
}

// export interface CardProps {
//   category: string;
//   title: string;
//   tags: string;
//   description: string;
// }

export interface CardProps {
  doc: Doc;
  onClick: () => void; // Prop for handling card clicks
}
export interface Doc {
  category: string;
  title: string;
  tags: string;
  description: string;
  modified_date: string;
  link_list_text: string;
}
export interface ResultDocProps {
  setResult: (result: Doc[]) => void;
}
