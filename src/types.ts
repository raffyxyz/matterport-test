export type sortType = "asc" | "desc" | "";
export type statusType = "active" | "inactive" | "";
export type privacyType = "public" | "private" | "";

export type ModelType = {
  id: string;
  name: string;
  upload_date: string;
  status: "active" | "inactive";
  privacy: "public" | "private";
};

export type ModelListType = {
  totalResults: number;
  nextOffset: string;
  results: ModelType[];
};

