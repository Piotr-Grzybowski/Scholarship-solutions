export type element = {
  name: string;
  regularPrice: number;
  salePrice: number;
};

export type phrase = {
  phrase: string;
};

export type listOfElements = {
  elements: element[];
  phrase: string;
};

export type highlighterProps = {
  phrase: string;
  name: string;
};
