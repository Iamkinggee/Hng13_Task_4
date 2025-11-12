

import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Sets full Supabase user object
  const setAuth = (authUser) => {
    const plainUser = authUser ? JSON.parse(JSON.stringify(authUser)) : null;
    setUser(plainUser);
  };

  // ✅ Updates user data (used for profile updates)
  const setUserData = (userData) => {
    setUser((prev) => ({
      ...prev,
      ...userData,
    }));
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);












