import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  email: null,
  posts: [],
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: localStorage.getItem("email"),
    posts: [],
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
