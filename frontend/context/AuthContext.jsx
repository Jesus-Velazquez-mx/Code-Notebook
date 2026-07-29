import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/* Usamos esta clase para mantener el estado global del token una vez que se ha iniciado sesión. */
/* De esta manera la app siempre sabe cuál es le user logueado*/
export const AuthContext = createContext();
function AuthProvider({ children }) {
    const tokenInicial = localStorage.getItem('token_codeNotebook');
    const [token, setToken] = useState(tokenInicial);
    const [usuario, setUsuario] = useState(null);

    /* Cuando se renderice por primera vez, o cambie el token, pasará esto.*/
    useEffect(() => {
        /* Si hay un token activo */
        if (token) {
            try {
                /*El token tiene 3 partes separadas por un punto. El payload es la [1]
                 atob() lo descifra y JSON.parse lo convierte en objeto */
                const payloadDecodificado = JSON.parse(atob(token.split('.')[1]));
                setUsuario(payloadDecodificado);
            } catch (error) {
                console.error("Error al decodificar el token en el front");
            }

        } else {
            setUsuario(null);
        }
    }, [token]); /* Reacciona automáticamente al iniciar o cerrar sesión */

    /* Iniciar sesión */
    const login = (nuevoToken) => {
        localStorage.setItem('token_codeNotebook', nuevoToken);
        setToken(nuevoToken);
    };

    /* Cerrar sesión */
    const logout = () => {
        localStorage.removeItem('token_codeNotebook');
        setToken(null);
    };

    /* Empaquetamos todo lo que queremos compartir en un objeto */
    const valoresGlobales = {
        token,
        isAuth: !!token, /* Se convierte en 'true' si hay token, o 'false' si es null */
        login,
        usuario, /* Pasamos los datos del usuario logueado */
        logout
    };

    return (
        /* Entregamos el paquete a todos los 'children' (componentes hijos) */
        <AuthContext.Provider value={valoresGlobales}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;