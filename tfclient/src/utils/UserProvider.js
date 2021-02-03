import React, { useEffect, createContext, useState } from "react";
import { auth, generateUserDocument } from "./firebase";

export const UserContext = createContext({ user: null });

function UserProvider({children}){
  const [user, setUser] = useState()

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      const creds = await generateUserDocument(userAuth);
      setUser( creds );
    });
  }, []);

    return (
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    );
  
}

export default UserProvider;
