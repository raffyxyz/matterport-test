import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type State = {
  offsets: string[];
};

type Action = {
  addOffset: (offset: string) => void;
  removeLastOffset: () => void;
  resetOffset: () => void;
};

const initialState: State = {
  offsets: [],
};

export const useSetOffset = createWithEqualityFn<State & Action>()((set) => ({
  ...initialState,
  addOffset: (offset: string) =>
    set((state) => ({
      offsets: [...state.offsets, offset],
    })),
  removeLastOffset: () =>
    set((state) => ({
      offsets: state.offsets.slice(0, -1),
    })),
  resetOffset: () => set({ offsets: [] }),
  shallow,
}));
