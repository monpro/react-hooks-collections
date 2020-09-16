import React, { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

// this is the example provider
firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  appID: ""
});

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        return response.user
      })
  };

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout
  };
};

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};


