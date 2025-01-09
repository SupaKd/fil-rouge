import useTitle from "../hooks/useTitle";

function Home() {
	useTitle("Home");

	return (
		<main id="home">
			
				<h1>Bienvenue sur la page !</h1>
				
				<video controls width="100%" height="auto">
                <source src="/Attack.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
			
		</main>
	);
}

export default Home;
