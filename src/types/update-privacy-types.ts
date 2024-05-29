type Location = {
  line: number;
  column: number;
};

type ErrorDetail = {
  message: string;
  locations: Location[];
  path: string[];
  extensions: {
    code: string;
    retry: string;
    classification: string;
  };
};

type Publication = {
  published: boolean;
  url: string;
  embed: string;
};

type UpdateModelVisibility = {
  id: string;
  publication: Publication;
};

type Data = {
  updateModelVisibility: UpdateModelVisibility;
};

export type UpdatePrivacyResponse = {
  data: Data;
  errors?: ErrorDetail[];
};
