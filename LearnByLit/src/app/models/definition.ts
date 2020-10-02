export interface OxText {
  text: string;
}

export interface Audio {
  audioFile: string;
  playing: boolean;
}

export interface Definition {
  definitions: string[];
  examples: OxText;
  shortDefinitions?: string[];
  synonyms?: OxText[];
  antynyms?: OxText[];
}

export interface Entry {
  etymologies: string[];
  pronunctiations: Audio;
  senses: Definition[];
}

export interface Entries {
  entries: Entry[];
}

export interface OxfordDefinition {
  word: string;
  results: Entries[];
}
