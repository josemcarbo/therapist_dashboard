import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  name?: string;
  email: string;
  password?: string;
  avatar?: string;
};

interface UserState {
  _user: {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
  };
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      _user: {
        user: null,
        login: (user) =>
          set((state) => ({
            _user: { ...state._user, user },
          })),
        logout: () =>
          set((state) => ({
            _user: { ...state._user, user: null },
          })),
      },
    }),
    {
      name: "__app_user",
      partialize: (state) => ({
        _user: {
          user: state._user.user,
        },
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._user.login = (user) =>
            useUserStore.setState((prev) => ({
              _user: {
                ...prev._user,
                user,
              },
            }));

          state._user.logout = () =>
            useUserStore.setState((prev) => ({
              _user: {
                ...prev._user,
                user: null,
              },
            }));
        }
      },
    }
  )
);
