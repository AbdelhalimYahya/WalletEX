import React from "react";
import { createContext , useState } from "react";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user , setUser] = useState(null);
    
    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData); // For ezample when user logs in
    };

    // Function to clear user data
    const clearUser = () => {
        setUser(null); // For ezample when user logs out
    };

    return (
        <UserContext.Provider value={{ user , updateUser , clearUser }} >
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;