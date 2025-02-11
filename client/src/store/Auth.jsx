import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };
  //logout functionality
  let isLoggedIn = !!token;

  const LogoutUser = ()=>{
    setToken("");
    return localStorage.removeItem ("token");
  }

  //Jwt Authentication - currently loggedIn user data
  const  userAuthentication = async () =>{
    try {
      const response = await fetch ("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization : `Bearer ${token}`,
        },
      });

      if(response.ok){
        const data = await response.json();
        setUser(data.userData);
      }
      
    } catch (error) {
      console.error("error fatching user data")
    }
  }
  //fetching service data from database
  const getServices = async ()=>{
    try {
      const response = await  fetch("http://localhost:5000/api/data/service",{
        method: "GET",
      });
      
      if(response.ok){
        const data = await response.json()
        console.log(data);
        setServices(data)
      }
    } catch (error) {
      console.log(`services frontend error: ${error}`)
    }
  }
  

  useEffect(()=>{
    getServices();
    userAuthentication();
  },[]);

  return (
    <AuthContext.Provider value={{ isLoggedIn,storeTokenInLS ,LogoutUser,user,services}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};