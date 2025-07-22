import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaUserCircle, FaEnvelope, FaLock, FaEyeSlash, FaEye, FaSpinner } from "react-icons/fa";
import { useAuthStore } from "../../sotre/authStore.ts";
import type { FormErrors } from "../../type";
import { useGoogleAuth } from "@/hooks/use-google-auth.ts";


const Register = () => {
    const { handleGoogleAuth } = useGoogleAuth();
    const navigate = useNavigate()
    const { 
        firstname, lastname, email, password, errorHttp, isLoading,
        setEmail, setPassword, setFirstname, setLastname, register
    } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmpassword] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (firstname.trim() === '') newErrors.firstName = "Prénom est requis";
        if (lastname.trim() === '') newErrors.lastName = "Nom est requis";
        if (email.trim() === '') {
            newErrors.email = "Email est requis";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email invalide";
        }
        if (password.trim() === '') {
        newErrors.password = "Mot de passe est requis";
        } else if (password.length < 6) {
        newErrors.password = "Mot de passe doit contenir au moins 6 caractères";
        }
        if (password !== confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(validateForm()){
            await register();
            navigate('/dashboard')
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Inscription</h1>
                    <p className="text-gray-600">Créez votre compte</p>
                </div>
                {
                    errorHttp && (
                    <p className="mt-1 text-sm text-red-600">
                        {errorHttp}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="space-y-1">
                        
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUserCircle />
                            </div>
                            <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            placeholder="Votre prénom"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            />
                            
                            {
                                errors.firstName && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>
                        </div>
                        <div className="space-y-1">
                        
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUserCircle />
                            </div>
                            <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            autoComplete="family-name"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            placeholder="Votre nom"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            />
                            {errors.lastName && (
                            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                            )}
                        </div>
                        </div>
                    </div>

                    <div className="space-y-1 mb-6">
                        
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
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                        </div>
                    </div>
                    <div className="space-y-1 mb-6">
                        
                        <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            required
                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            placeholder="Créez votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            { showPassword ? <FaEye/> :  <FaEyeSlash/>}
                        </div>
                        </div>
                    </div>

                    <div className="space-y-1 mb-6">
                        
                        <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock />
                        </div>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            required
                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            placeholder="Confirmez votre mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">
                            {errors.confirmPassword}
                            </p>
                        )}
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            { showConfirmPassword ? <FaEye/> :  <FaEyeSlash/>}
                            
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center mb-6">
                        <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                        required
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        J'accepte les{" "}
                        <a href="#" className="text-indigo-600 hover:text-indigo-500">
                            conditions d'utilisation
                        </a>
                        </label>
                    </div>
                    <div>
                        <button
                        type="submit"
                        className="!rounded-button whitespace-nowrap w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer"
                        >
                        {isLoading && <FaSpinner className="animate-spin text-xl" />}
                        
                        S'inscrire
                        </button>
                    </div>
                </form>
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
                            onClick={handleGoogleAuth}
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
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Déjà inscrit ?{" "}
                        <Link className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer" to="/login">Se connecter</Link> 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register