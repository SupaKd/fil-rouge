import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setIsLogged }) {
    const navigate = useNavigate();

    const aliasRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        // Récupérer les utilisateurs depuis le localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const alias = aliasRef.current.value;
        const password = passwordRef.current.value;

        // Trouver l'utilisateur correspondant
        const user = users.find((user) => user.alias === alias);

        if (user) {
            // Vérifier le mot de passe
            if (user.password === password) {
                setError(""); // Réinitialiser l'erreur
                localStorage.setItem("isConnected", true); // Marquer l'utilisateur comme connecté
                setIsLogged(true); // Mettre à jour l'état de connexion

                // Rediriger en fonction du rôle de l'utilisateur
                if (user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
            } else {
                setError("Mot de passe incorrect");
            }
        } else {
            setError("Alias incorrect");
        }
    }

    return (
        <main id="login">
            <form onSubmit={handleSubmit} className="auth">
                <label htmlFor="alias">Nom utilisateur :</label>
                <input
                    type="text"
                    id="alias"
                    ref={aliasRef}
                    placeholder="Entrer votre alias"
                />

                <label htmlFor="password">Mot de passe :</label>
                <input
                    type="password"
                    id="password"
                    ref={passwordRef}
                    placeholder="Entrer votre mot de passe"
                />

                {error && <p>{error}</p>}

                <button type="submit">Se connecter</button>
            </form>

            <p>
                Pas de compte ? <Link to={"/auth/register"}>Créer un compte</Link>
            </p>
        </main>
    );
}

Login.propTypes = {
    setIsLogged: PropTypes.func.isRequired,
};

export default Login;