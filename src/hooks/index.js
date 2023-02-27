import { useContext, useState } from "react";
import { AuthContext } from '../providers/AuthProvider';
import { login as userLogin } from '../api';
import { setItemInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemInLocalStorage } from "../utlis";
export const useAuth = () => {
    return useContext(AuthContext);
}
export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        const response = await userLogin(email, password);
        setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
        if (response.success) {
            setUser(response.data.user);
            return {
                success: true
            }
        } else {
            return {
                success: false,
                message: response.message,
            }
        }
    };
    const logout = () => {
        setUser(null);
        removeItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    };
    return {
        user,
        loading,
        login,
        logout,

    }

};