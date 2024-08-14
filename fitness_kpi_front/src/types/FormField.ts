export interface FormField {
  type: "text" | "number" | "email" | "password" | "checkbox" | "select";
  label: string;
  model: string;
  disabled?: boolean;
  options?: Array<{ value: any; text: string }>;
}

export interface FormConfig {
  fields: FormField[];
}

export interface FormErrors {
  [key: string]: { _errors: string[] };
}
