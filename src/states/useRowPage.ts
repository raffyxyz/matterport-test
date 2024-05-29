import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type State = {
  row: number;
};

type Action = {
  setRow: (row: number) => void;
};

const initialState: State = {
  row: 10,
};

export const useRowPage = createWithEqualityFn<State & Action>()((set) => ({
  ...initialState,
  setRow: (row: number) => set({ row }),
  shallow,
}));
