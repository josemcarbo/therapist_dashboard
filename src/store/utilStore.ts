import { create } from "zustand";
import moment from "moment";

const FORMAT = "YYYY-MM-DD";

interface UtilInnerState {
  from: string;
  to: string;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
}

interface UtilState {
  _util: UtilInnerState;
}

export const useUtilStore = create<UtilState>((set) => ({
  _util: {
    from: moment().subtract(30, "days").format(FORMAT),
    to: moment().format(FORMAT),
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
  },
}));