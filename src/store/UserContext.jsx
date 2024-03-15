import React, {createContext, useContext, useEffect, useState} from 'react';
import {CurrentUserName, CurrentUserUuid} from "@/utils/CurrentUser";
import {isAuth} from "@/utils/auth.js";
import {getUser} from "@/service/api/UsersService.jsx";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const [userName, setUserName] = useState(null);

    useEffect(() => {
        if(isAuth()) {
            fetchUserData().then(result => setUserName(result.fullName))
        } else {
            setUserName(null)
        }
    }, []);

    async function fetchUserData() {
        return await getUser(CurrentUserUuid());
    }
    const updateUser = (name) => {
        setUserName(name);
    };

    return (
        <UserContext.Provider value={{ userName, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};