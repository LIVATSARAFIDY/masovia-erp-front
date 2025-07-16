import { useEffect, useState } from "react";
import { useAuthStore } from "../../sotre/authStore.ts";
import { Link, useNavigate  } from "react-router";
import { FaEnvelope, FaLock, FaEyeSlash, FaEye, FaSpinner } from "react-icons/fa";

const Login = () => {
    let navigate = useNavigate();
    const {email, password, isLoading, errorHttp,isAuthenticated ,setEmail, setPassword, login } = useAuthStore();

    const [showPassword, setShowPassword] = useState (false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login()
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Connexion</h1>
                <p className="text-gray-600">Connectez-vous à votre compte</p>
                {errorHttp && (
                    <p className="mt-1 text-sm text-red-600">
                        {errorHttp}
                    </p>
                )}
            </div>
        
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                    
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            required
                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            placeholder="Entrez votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div 
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            { showPassword ? <FaEye/> :  <FaEyeSlash/>}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                            Se souvenir de moi
                        </label>
                    </div>
                    <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Mot de passe oublié ?
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="!rounded-button whitespace-nowrap w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer"
                    >
                        {isLoading && <FaSpinner className="animate-spin text-xl" />}
                        Se connecter
                    </button>
                </div>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                    Pas encore de compte ?{' '}
                    <Link className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer" to="/register">S'inscrire</Link> 
                </p>
            </div>
            <div className="mt-10">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                        Ou continuer avec
                    </span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                    type="button"
                    className="!rounded-button whitespace-nowrap w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                    <i className="fab fa-google mr-2"></i>
                    Google
                    </button>
                    <button
                    type="button"
                    className="!rounded-button whitespace-nowrap w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                    <i className="fab fa-facebook-f mr-2"></i>
                    Facebook
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login