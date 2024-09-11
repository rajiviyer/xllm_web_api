export interface FormType {
  embeddingKeyMinSize: number;
  embeddingValuesMinSize: number;
  min_pmi: number;
  nABmin: number;
  Customized_pmi: boolean;
  ContextMultitokenMinSize: number;
  maxTokenCount: number;
  minOutputListSize: number;
  queryText: string;
  bypassIgnoreList: number;
  ignoreList: ReadonlyArray<string>;
}

export interface OptionButtonProps {
  handleOptionButtonClick: (option: boolean) => void;
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
  id: number;
  agent: string;
  category: string;
  title: string;
  tags: string;
  description: string;
  modified_date: string;
  link_list_text: string;
  likes_list_text: string;
  raw_text: string;
}

export interface Embeddings {
  n: number;
  pmi: number;
  f: string;
  token: string;
  word: string;
}

// Define the interface for the function argument
export interface DataProps {
  embeddings: Embeddings[];
  docs: Doc[];
}
export interface ResultDocProps {
  setResult: (result: DataProps) => void;
}
