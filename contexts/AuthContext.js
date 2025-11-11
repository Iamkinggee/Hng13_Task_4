
import { useState, createContext, useContext } from "react";




const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);





    // const setAuth = authUser=>{
    //     setUser(authUser);
    // }


    // inside AuthContext.jsx
const setAuth = (user) => {
  // clone Supabase user into a plain object
  const plainUser = user ? JSON.parse(JSON.stringify(user)) : null;
  setUser(plainUser);
};




    const setUserData = useData =>{
        setUser({...setUserData});
    }

    return(
        <AuthContext.Provider value={{user, setAuth,setUserData}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>useContext(AuthContext);









// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { supabase } from '../lib/superbase';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);

//   const setAuth = (userObj) => {
//     // Deep clone Supabase user to remove non-configurable properties
//     const plainUser = userObj ? JSON.parse(JSON.stringify(userObj)) : null;
//     setUser(plainUser);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setAuth, userData, setUserData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);












