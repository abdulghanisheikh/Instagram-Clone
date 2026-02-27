import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    
    return <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
        {children}
    </AuthContext.Provider>
}