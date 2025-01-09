import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [alias, setAlias] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setAlias(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!alias || alias.length < 3) {
            setError("Le nom d'utilisateur doit contenir au moins 3 caractères.");
            return;
        }

        if (!password || password.length < 5) {
            setError("Le mot de passe doit contenir au moins 5 caractères.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find(user => user.alias === alias);
        if (userExists) {
            setError("Ce nom d'utilisateur est déjà pris.");
            setAlias("");
            setPassword("");

            return;
            
        }

        // ajoute un nouvelle utilisateur au tableau
        const newUser = { alias, password, role:"user"} ;
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        console.log("Username:", alias);
        console.log("Password:", password);

        navigate("/auth/login");
    }

    return (
        <main id="register">
            <form onSubmit={handleSubmit}>
                <label htmlFor="alias">Nom d'utilisateur :</label>
                <input
                    type="text"
                    name="alias"
                    id="alias"
                    value={alias}
                    onChange={handleChange}
                />

                <label htmlFor="password">Mot de passe :</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />

                {error&&{error}}
                <button type="submit">Créer un compte</button>
            </form>
        </main>
    );
}

export default Register;