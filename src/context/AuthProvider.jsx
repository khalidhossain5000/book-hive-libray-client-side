import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email, password) => {
    loading;
    return createUserWithEmailAndPassword(auth, email, password);
  };
    const logInUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
  //update profile
  const updateUserProfile = (updatedProfileInfo) => {
    return updateProfile(auth.currentUser, updatedProfileInfo);
  };
  //google regsi/login
  const handleGoogleUser = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const logOutUser = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
    });
    return () => {
      unSubscribe();
    };
  }, []);

  
  
  const userInfo = {
    createUser,
    user,
    setUser,
    loading,
    handleGoogleUser,
    updateUserProfile,
    logInUser,
    logOutUser,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
