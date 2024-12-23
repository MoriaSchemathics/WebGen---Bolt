export interface ElementStyle {
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontWeight?: string;
  transform?: string;
  position?: string;
  top?: string;
  left?: string;
}

export interface FormQuestion {
  id: string;
  question: string;
  type: 'text' | 'choice';
  options?: string[];
}

export interface PageElement {
  id: string;
  type: 'text' | 'image' | 'form' | 'container';
  content: string;
  style: ElementStyle;
  children?: PageElement[];
  questions?: FormQuestion[];
  currentStep?: number;
}