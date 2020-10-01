interface OxText {
  text: string;
}

interface Audio {
  audioFile: string;
  playing: boolean;
}

interface Definition {
  definitions: string[];
  examples: OxText;
  shortDefinitions?: string[];
  synonyms?: OxText[];
  antynyms?: OxText[];
}

interface Entry {
  etymologies: string[];
  pronunctiations: Audio;
  senses: Definition[];
}

interface Entries {
  entries: Entry[];
}

export interface OxfordDefinition {
  word: string;
  results: Entries[];
}
