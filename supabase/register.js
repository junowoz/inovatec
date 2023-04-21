import { supabase } from "supabase/client";

// Exportamos una función asíncrona llamada "register"
export default async function register(email, password, first_name, last_name) {
    try {
        // Utilizamos el método signUp de supabase.auth para registrar un usuario
        // Guardamos el resultado en una variable llamada "data"
        const { data, error } = await supabase.auth.signUp({
            email: email, // La dirección de correo electrónico proporcionada como argumento
            password: password, // La senha proporcionada como argumento
            options: {
                data: {
                    first_name: first_name, // El primer nombre proporcionado como argumento
                    last_name: last_name, // El apellido proporcionado como argumento
                },
            },
        });
        // Imprimimos los datos de registro del usuario en la consola
        console.log(data);
    } catch (error) {
        // Si ocurre un error, lo imprimimos en la consola
        console.log(error);
    }
}
