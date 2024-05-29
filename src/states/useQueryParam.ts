import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type queryType = {
  offset: string | undefined;
  pageSize: number;
};

type State = {
  query: queryType;
};

type Action = {
  setQueryParam: (query: queryType) => void;
};

const initialState: State = {
  query: {
    offset: undefined,
    pageSize: 10,
  },
};

export const useQueryParam = createWithEqualityFn<State & Action>()((set) => ({
  ...initialState,
  setQueryParam: (query: queryType) => set({ query }),
  shallow,
}));
