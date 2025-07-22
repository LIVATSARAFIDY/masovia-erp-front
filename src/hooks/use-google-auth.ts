import { useNavigate } from "react-router";
import { useCallback } from "react";

export const useGoogleAuth = () => {
    const navigate = useNavigate();
    const authUrl = import.meta.env.DEV ? 'http://localhost:3001/api/auth/google' : import.meta.env.VITE_SERVER_BASE_URL+'auth/google';
    const handleGoogleAuth = useCallback(() => {
        window.open(
            authUrl,
            "_blank",
            "width=500,height=600"
        );
        const messageListener = (event: MessageEvent) => {
            if (typeof event.data === "object") {
                localStorage.setItem('userConnected', JSON.stringify(event.data))
                navigate("/dashboard");  
            }
            window.removeEventListener("message", messageListener);
        };

        window.addEventListener("message", messageListener);


    },[navigate])
    return {handleGoogleAuth};
}