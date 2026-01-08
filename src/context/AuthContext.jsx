import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem("role");
    });


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
        <AuthContext.Provider
            value={{ user, userRole, token, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
