import { useState } from "react";
import { AuthContext } from "./AuthContext";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [token, setToken] = useState(null);

    const login = (data) => {
        setUser(data.user);
        setUserRole(data.user.role);
        setToken(data.token);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("token", data.token);
    };

    const logout = () => {
        setUser(null);
        setUserRole(null);
        setToken(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, userRole, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider