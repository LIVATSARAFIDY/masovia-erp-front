import { create } from "zustand";
import { loginRequest, registerRequest } from "../service/authService.ts";
import type { User } from "../type.ts";


type AuthState = {
  firstname: string
  lastname: string
  email: string
  password: string
  isLoading: boolean
  isAuthenticated: boolean
  errorHttp: string | null
  token: string | null
  setFirstname: (f: string) => void
  setLastname: (l: string) => void
  setEmail: (u: string) => void
  setPassword: (p: string) => void
  login: () => Promise<void>
  register: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  isLoading: false,
  isAuthenticated: false,
  errorHttp: null,
  token: localStorage.getItem('token'),

  setFirstname: firstname => set({ firstname }),
  setLastname: lastname => set({ lastname }),

  setEmail: email => set({ email }),
  setPassword: password => set({ password }),

  register: async () => {
    const { firstname, lastname, email, password } = get()
    set({ isLoading: true,isAuthenticated:false ,errorHttp: null })

    try {
      const res:User & {token:string} = await registerRequest(firstname, lastname, email, password)
      
      localStorage.setItem('userConnected', JSON.stringify({ 
        user:{ 
          id: res.id,
          email: res.email,
          firstname: res.firstname,
          lastname: res.lastname,
          userStatus: res.userStatus,
          role: res.role 
        }, 
        token: res.token
      }))
      set({isAuthenticated: true, token: res.token})

    } catch (err: any) {
      if(err.name === 'HTTPError') {
        const status = err.response.status;
        if (status === 409) {
          set({ errorHttp: 'L\'adresse mail que vous avez utilisée est déjà prise' });
          return
        } else if (status === 500) {
          set({ errorHttp: 'Erreur interne du serveur.' });
          return
        } else {
          set({ errorHttp: 'Erreur inconnue.' });
          return
        }
      }
      set({ errorHttp: err.message || 'Enregistrement échoué' })
       
    } finally {
      set({ isLoading: false })
    }
  },

  login: async () => {
    const { email, password } = get()
    set({ isLoading: true, isAuthenticated:false, errorHttp: null })

    try {
      const res:User & {token:string} = await loginRequest(email, password)
      localStorage.setItem('userConnected', JSON.stringify({ 
        ...res, 
        token: res.token
      }))
      set({ token: res.token,isAuthenticated: true })
    } catch (err: any) {
      if(err.name === 'HTTPError') {
        const status = err.response.status;
        if (status === 401) {
          set({ errorHttp: 'Informations d\'identification non valides' });
          return
        } else if (status === 500) {
          set({ errorHttp: 'Erreur interne du serveur.' });
          return
        } else {
          set({ errorHttp: 'Erreur inconnue.' });
          return
        }
      }
      set({ errorHttp: err.message || 'Login failed' })
    } finally {
      set({ isLoading: false })
    }
  },

  logout: () => {
    localStorage.removeItem('userConnected')
    set({ token: null, email: '', password: '' })
  }
}))