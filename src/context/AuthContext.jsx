import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [token, setToken] = useState(null);

    // Load from localStorage on refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");

        if (storedUser && storedToken && storedRole) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setUserRole(storedRole);
        }
    }, []);


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

export const useAuth = () => useContext(AuthContext);
