import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTimes, faBars, faUser } from "@fortawesome/free-solid-svg-icons"; // Ajoutez faUser

import favicon from "/apple-touch-icon.png";

function Header(props) {
    const [isToggle, setIsToggle] = useState(false);

    function onClickHandler(e) {
        setIsToggle(!isToggle);
    }

    return (
        <>
            <header>
                <h1>
                    <NavLink to="/" end title="Go to home page">
                        <img src={favicon} alt="the logo" className="logo" />
                    </NavLink>
                </h1>
            <div class="fontawesome">
                <button>
                {!props.isLogged && (
                    <NavLink to="./auth/login" title="Go to login page" classname="b-login">
                        <FontAwesomeIcon icon={faUser} style={{ color: "#555" }} />
                    </NavLink>
                )}
                </button>
                
                {isToggle ? (
                    <nav>
                        <button id="burger" onClick={onClickHandler} className="close-menu">
                            <FontAwesomeIcon icon={faTimes} /> 
                        </button>
                        <NavLink to="/" end title="Go to home page">
                            Accueil
                        </NavLink>
                        <NavLink to="/details" end title="Go to details page">
                            Details
                        </NavLink>
                        <NavLink to="/details" end title="Go to details page">
                            Contact
                        </NavLink>
                        {props.isLogged ? (
                            <>
                                <NavLink
                                    to="/dashboard"
                                    end
                                    title="Go to dashboard page"
                                >
                                    Dashboard
                                </NavLink>
                                <button
                                    onClick={props.onClickLogoutHandler}
                                    title="Logout"
                                    className="cta logout"
                                >
                                    Logout
                                </button>
                            </>
                        ) : null}
                    </nav>
                ) : null}

                {!isToggle && (
                    <button onClick={onClickHandler}>
                        <FontAwesomeIcon icon={faBars} /> 
                    </button>
                )}
            </div>
            </header>
        </>
    );
}

Header.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    onClickLogoutHandler: PropTypes.func.isRequired,
};

export default Header;