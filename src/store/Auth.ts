import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/clint/config";
import { immer } from "zustand/middleware/immer";

export interface UserPrefs {
  reputation: number;
  // more user prefrences linke darkmode,lightmode,etc will be here
}

interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;

  setHydrated(): void;
  verifySession(): Promise<void>;
  login(
    email: string,
    Password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;

  createAccount(
    name: string,
    email: string,
    Password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;

  logout(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          const session = await account.getSession("current");
          set({ session });
        } catch (error) {
          console.log("verifySession Error ::", error);
        }
      },

      async login(email, Password) {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            Password
          );
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);

          if (!user.prefs?.reputation)
            await account.updatePrefs<UserPrefs>({ reputation: 0 });

          set({ session, user, jwt });
          return { success: true };
        } catch (error) {
          console.log("login Error ::", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async createAccount(name, email, Password) {
        try {
          await account.create(ID.unique(), email, Password, name);
          return { success: true };
        } catch (error) {
          console.log("create account Error ::", error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async logout() {
        try {
          await account.deleteSessions();
          set({ session: null, jwt: null, user: null });
        } catch (error) {
          console.log("logout Error ::", error);
        }
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
