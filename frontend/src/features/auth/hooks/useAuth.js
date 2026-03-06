import { AuthContext } from "../auth.context.jsx";
import { useContext } from "react";
import { login, register } from "../services/auth.api.js";

export function useAuth() {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    async function handleLogin(username, password) {
        setLoading(true);
        try {
            const data = await login(username, password);
            setUser(data.user);
            return data;
        }
        catch(err) {
            console.log(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    async function handleRegister(username, email, password) {
        setLoading(true);
        try {
            const data = await register(username, email, password);
            setUser(data.user);
            return data;
        }
        catch(err) {
            console.log(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return { user, loading, handleLogin, handleRegister };
}