import { Link } from "react-router-dom";

function MainMenuButton() {
    return (
        <Link to={`/stworz/pokoj`}>
            <div className="main-button button"> 
                Stwórz Pokój 
            </div>
        </Link>
    );
}

export default MainMenuButton;