import { create } from "zustand";
import { persist } from "zustand/middleware";
import moment from "moment";

const FORMAT = "YYYY-MM-DD";

interface UtilState {
  _util: {
    from: string;
    to: string;
    setFrom: (from: string) => void;
    setTo: (to: string) => void;
  };
}

export const useUtilStore = create<UtilState>()(
  persist(
    (set, _) => ({
      _util: {
        from: moment().startOf("month").format(FORMAT),
        to: moment().endOf("month").format(FORMAT),
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
    }),
    {
      name: "__app_util",
      partialize: (state) => ({
        _util: {
          from: state._util.from,
          to: state._util.to,
        },
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._util.setFrom = (from: string) => {
            useUtilStore.setState((current) => ({
              _util: {
                ...current._util,
                from: moment(from).format(FORMAT),
              },
            }));
          };
          state._util.setTo = (to: string) => {
            useUtilStore.setState((current) => ({
              _util: {
                ...current._util,
                to: moment(to).format(FORMAT),
              },
            }));
          };
        }
      },
    }
  )
);
