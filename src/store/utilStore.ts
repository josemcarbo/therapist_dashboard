import { create } from "zustand";
import moment from "moment";

const FORMAT = "YYYY-MM-DD";

interface UtilInnerState {
  from: string;
  to: string;
  search: string;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setRange: (from: string, to: string) => void;
  setSearch: (search: string) => void;
  setFilter: (from: string, to: string, search: string) => void;
}

interface UtilState {
  _util: UtilInnerState;
}

export const useUtilStore = create<UtilState>((set) => ({
  _util: {
    from: moment().subtract(30, "days").format(FORMAT),
    to: moment().add(1, 'day').format(FORMAT),
    search: "",
    setFrom: (from: string) =>
      set((state) => ({
        _util: {
          ...state._util,
          from: moment(from).format(FORMAT),
        },
      })),
    setTo: (to: string) =>
      set((state) => ({
        _util: {
          ...state._util,
          to: moment(to).format(FORMAT),
        },
      })),
    setRange: (from: string, to: string) =>
      set((state) => ({
        _util: {
          ...state._util,
          from: moment(from).format(FORMAT),
          to: moment(to).format(FORMAT),
        },
      })),
    setSearch: (search: string) =>
      set((state) => ({
        _util: {
          ...state._util,
          search,
        },
      })),
    setFilter: (from: string, to: string, search: string) =>
      set((state) => ({
        _util: {
          ...state._util,
          from: moment(from).format(FORMAT),
          to: moment(to).format(FORMAT),
          search,
        },
      })),
  },
}));
