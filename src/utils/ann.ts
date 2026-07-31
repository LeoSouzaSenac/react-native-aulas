export interface TermOption {
  value: string;
  desc: string;
}

export interface AnnotatedSegment {
  term: string;
  note: string;
  options?: TermOption[];
}

export type CodeSegment = string | AnnotatedSegment;

export const t = (term: string, note: string, options?: TermOption[]): AnnotatedSegment => ({
  term,
  note,
  options,
});
