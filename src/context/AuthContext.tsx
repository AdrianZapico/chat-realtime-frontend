import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { connectSocket, disconnectSocket } from "../services/socket";

interface User {
    _id: string;
    name: string;
    email: string;
}


interface AuthContextData {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    loading: boolean;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            connectSocket();
        }

        setLoading(false);
    }, []);


    const login = async (email: string, password: string) => {
        const response = await api.post("/auth/login", {
            email,
            password,
        });

        const { token, user } = response.data;

        // 🔥 NORMALIZAÇÃO DEFINITIVA
        const normalizedUser = {
            _id: user._id || user.id, // cobre os dois casos
            name: user.name,
            email: user.email,
        };

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(normalizedUser));

        setToken(token);
        setUser(normalizedUser);

        connectSocket();
    };


    const register = async (name: string, email: string, password: string) => {
        await api.post("/auth/register", {
            name,
            email,
            password,
        });
    };

    const logout = () => {
        disconnectSocket();
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
