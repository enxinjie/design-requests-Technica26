import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { auth, db } from "../firebase/firebase";

import type {
  PersonSummary,
  TechnicaTeam,
  UserRole,
} from "../types/request";

interface AuthContextValue {
  currentUser: User | null;
  userProfile: PersonSummary | null;
  loading: boolean;

  signUp: (
    fullName: string,
    email: string,
    password: string,
    team: TechnicaTeam,
  ) => Promise<void>;

  logIn: (
    email: string,
    password: string,
  ) => Promise<void>;

  logOut: () => Promise<void>;
}

type StoredUserProfile = Omit<
  PersonSummary,
  "id"
>;

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );

export const AuthProvider = ({
  children,
}: PropsWithChildren) => {
  const [currentUser, setCurrentUser] =
    useState<User | null>(null);

  const [userProfile, setUserProfile] =
    useState<PersonSummary | null>(null);

  const [loading, setLoading] =
    useState(true);

  const signUp = async (
    fullName: string,
    email: string,
    password: string,
    team: TechnicaTeam,
  ): Promise<void> => {
    const cleanEmail =
      email.trim().toLowerCase();

    const role: UserRole =
      team === "design"
        ? "designer"
        : "organizer";

    await setPersistence(
      auth,
      browserLocalPersistence,
    );

    const credential =
      await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password,
      );

    await updateProfile(credential.user, {
      displayName: fullName,
    });

    const storedProfile: StoredUserProfile = {
      fullName,
      email: cleanEmail,
      team,
      role
    };

    await setDoc(
      doc(
        db,
        "users",
        credential.user.uid,
      ),
      {
        ...storedProfile,

        createdAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp(),
      },
    );

    setCurrentUser(credential.user);

    setUserProfile({
      id: credential.user.uid,
      ...storedProfile,
    });
  };

  const logIn = async (
    email: string,
    password: string,
  ): Promise<void> => {
    await signInWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password,
    );
  };

  const logOut = async (): Promise<void> => {
    await signOut(auth);

    setCurrentUser(null);
    setUserProfile(null);
  };

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {
          setLoading(true);

          setCurrentUser(user);

          try {
            if (!user) {
              setUserProfile(null);
              return;
            }

            const profileSnapshot =
              await getDoc(
                doc(
                  db,
                  "users",
                  user.uid,
                ),
              );

            if (!profileSnapshot.exists()) {
              console.error(
                "User is authenticated, but no Firestore profile exists.",
              );

              setUserProfile(null);

              return;
            }

            const storedProfile =
              profileSnapshot.data() as StoredUserProfile;

            setUserProfile({
              id: user.uid,
              ...storedProfile,
            });
          } catch (error) {
            console.error(
              "Could not load user profile:",
              error,
            );

            setUserProfile(null);
          } finally {
            setLoading(false);
          }
        },
      );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        signUp,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider",
    );
  }

  return context;
};