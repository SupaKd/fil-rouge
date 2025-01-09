import { useEffect } from "react";

function useTitle(title) {
    
	useEffect(() => {
		document.title = title + " | SupaKd";
	}, []);

}

export default useTitle;
