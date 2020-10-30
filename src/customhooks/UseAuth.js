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

  const signIn = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        return response.user
      })
  };

  const signUp = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        return response.user;
      });
  };

  const signOut = () => {
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
    // always get latest auth
    return () => unsubscribe();
  }, []);

  return {
    user,
    signIn,
    signUp,
    signOut
  };
};

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => {
  return useContext(authContext);
};

/**
 * Add example to demonstrate useAuth hook
 *
const Test = () => {
  return (
    // wrap the component that will consume the auth props
    <ProvideAuth>
      <Nav></Nav>
    </ProvideAuth>
  )
};

const Nav = (props) => {
  const auth = useAuth();

  return (
    <div>
      {auth && auth.user ?
        <button onClick={() => auth.signout()}>Sign out</button>
        : <button onClick={() => auth.signin()}>Sign in</button>}
    </div>
  )
};

export default Test;
**/
