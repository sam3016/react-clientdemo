import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
        try {
          // use FM Odata API as authentication 
          const response = await fetch(`/fmi/odata/v4/${process.env.REACT_APP_DATABASE}/${process.env.REACT_APP_TABLE}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Basic " + btoa(data.username + ":" + data.password)
              }});
          
          if (response.status === 200) {
            // if success set the data to local storage
            setUser(data.username);
            setToken(data.password);
            localStorage.setItem("site", data.password);
            navigate("/client");
            return;
          }
          throw new Error(response.status);
        } catch (error) {
          console.error(error);
        }
    }

    const logOut = () => {
      setUser(null);
      setToken("");
      localStorage.removeItem("site");
      navigate("/login");
    };

    return (
      <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
        {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
