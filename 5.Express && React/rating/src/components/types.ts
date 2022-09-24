export type rating = {
  recordId: string;
  name: string;
  score: number;
  content: string;
};

export type score = {
  score: number;
};

export type ratings = {
  ratings: rating[];
};
