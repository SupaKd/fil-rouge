import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTitle from "../hooks/useTitle";

function Dashboard() {
    useTitle("Dashboard");

    const [alias, setAlias] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    // Changer mdp
    const handleChangePassword = () => {
        let users = localStorage.getItem("users");
        let usersParsed = JSON.parse(users);

        const userIndex = usersParsed.findIndex(user => user.alias === alias);

        if (userIndex !== -1) {
            usersParsed[userIndex].password = newPassword;
            localStorage.setItem("users", JSON.stringify(usersParsed));
            setMessage("Mot de passe modifié avec succès.");
            navigate("/auth/login");
        } else {
            setMessage("Utilisateur non trouvé.");
        }
    };

    // supprimer
    const handleDeleteAccount = () => {
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
    
        if (isConfirmed) {
            let users = localStorage.getItem("users");
            let usersParsed = JSON.parse(users);
    
            const userIndex = usersParsed.findIndex(user => user.alias === alias);
    
            if (userIndex !== -1) {
                usersParsed.splice(userIndex, 1); 
                localStorage.setItem("users", JSON.stringify(usersParsed)); 
                setMessage("Compte supprimé avec succès.");
                navigate("/auth/login");
            } else {
                setMessage("Utilisateur non trouvé.");
            }
        }
    };

    return (
        <main>
            <h1>Page Dashboard</h1>
            {message && <p>{message}</p>}
            <section>
                <h2>Modifier le mot de passe</h2>
                <div>
                    <label>Nom de l'utilisateur :</label>
                    <input
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        placeholder="Entrez le nom"
                    />
                </div>
                <div>
                    <label>Nouveau mot de passe :</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Entrez le nouveau mot de passe"
                    />
                </div>
                <button onClick={handleChangePassword}>Modifier le mot de passe</button>
            </section>

            <section>
                <h2>Supprimer le compte</h2>
                <div>
                    <label>Nom de l'utilisateur :</label>
                    <input
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        placeholder="Entrez le nom"
                    />
                </div>
                <button onClick={handleDeleteAccount}>Supprimer le compte</button>
            </section>
        </main>
    );
}

export default Dashboard;