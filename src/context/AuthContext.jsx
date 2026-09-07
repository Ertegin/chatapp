import {createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../db/firebase";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  // misafir girişi
  const loginAsGuest = () => signInAnonymously(auth);

  // kayıtlı kullanıcı
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  // misafir mi? (yazma yetkisi yok)
  const isGuest = user?.isAnonymous ?? false;

  return (
    <AuthContext.Provider
      value={{ user, loading, isGuest, loginAsGuest, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.Context = AuthContext
