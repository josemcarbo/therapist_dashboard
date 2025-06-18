import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  _ui: {
    theme: string;
    updateTheme: (theme: string) => void;
  };
}

export const useUIStore = create<UIState>()(
  persist(
    (set, _) => ({
      _ui: {
        theme: "light",
        updateTheme: (theme) =>
          set((state) => ({
            _ui: {
              ...state._ui,
              theme,
            },
          })),
      },
    }),
    {
      name: "__app_ui",
      partialize: (state) => ({
        _ui: {
          theme: state._ui.theme,
        },
      }),
      onRehydrateStorage: () => (state) => {
        if (state)
          state._ui.updateTheme = (theme: string) => {
            useUIStore.setState((current) => ({
              _ui: {
                ...current._ui,
                theme,
              },
            }));
          };
      },
    }
  )
);
