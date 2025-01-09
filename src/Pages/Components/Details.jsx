import { useEffect, useState } from "react";
import Card from "./Card";


function Details() {
	const [datas, setDatas] = useState([]); // Initialiser avec un tableau vide
	const [loading, setLoading] = useState(true); // État de chargement
	const [error, setError] = useState(null); // Gestion des erreurs

	useEffect(() => {
		fetch("https://api.jikan.moe/v4/top/anime?type=ona")
			.then((res) => {
				if (!res.ok) {
					throw new Error("La réponse du réseau n'était pas OK");
				}
				return res.json();
			})
			.then((res) => {
				// Vérifie si la réponse contient bien un tableau de données
				if (res.data && Array.isArray(res.data)) {
					setDatas(res.data); // Utiliser res.data pour obtenir les anime
				} else {
					throw new Error("La réponse de l'API n'est pas valide");
				}
			})
			.catch((err) => {
				console.error("Erreur lors de la récupération des données :", err);
				setError(err.message); // Enregistrer l'erreur
			})
			.finally(() => {
				setLoading(false); // Arrêter le chargement
			});
	}, []);

	if (loading) {
		return <p>Chargement en cours...</p>;
	}

	if (error) {
		return <p>Erreur : {error}</p>;
	}

	return (
		<main id="details">
			<section>
				<h1>Top Anime (ONA) :</h1>
				<article>
					{datas.length === 0 ? (
						<p>Aucune donnée disponible.</p>
					) : (
						datas.map((data) => <Card key={data.mal_id} data={data} />)
					)}
				</article>
			</section>
		</main>
	);
}

export default Details;