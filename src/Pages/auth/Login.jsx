import { Link, useNavigate } from "react-router-dom"; 
import React, { useRef, useState } from 'react';


function Login() {
    const aliasRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    let users = localStorage.getItem("users");
    console.log(users)

    let usersParsed = JSON.parse(users);

    function handleSubmit(e) {
        e.preventDefault();
        const alias = aliasRef.current.value;
        const password = passwordRef.current.value;

        console.log("Username:", alias);
        console.log("Password:", password);
    

        // supprimer local storage, 
        // trouver l'utilisateur avec alias, si trouver comparer avec mdp, 
        // si correspond on procede a la connexion, avant de rediriger on verifie le role.

           

           const user = usersParsed.find((user) => user.alias === alias);
   
           console.log(user)
           
           if (user) {
               if (user.password === password) {
                   setError(null);
   
                   localStorage.setItem('isLogged', true);
                  
   
                   if (user.role === "admin") {
                       navigate("/admin");
                   } else {
                       navigate("/dashboard");
                   }
               } else {
                   setError("Mot de passe incorrect.");
               }
           } else {
               setError("Utilisateur non trouvé.");
           }
       }

    return (
        <main id="login">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Nom utilisateur :</label>
                <input type="text" name="username" id="username" ref={aliasRef}/>

                <label htmlFor="password">Mot de passe :</label>
                <input type="password" name="password" id="password" ref={passwordRef}/>

                {error && <p>{error}</p>}	
                <button type="submit">Connexion</button>
            </form>

            <p>
               Pas encore de compte ? {" "}
                <Link to={"/auth/register"}>Clique ici pour t'inscrire</Link>
            </p>
        </main>
    );
}

export default Login;