import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface People {
    name: string,
    hash: string
}

function Lobby() {
    const { lobbyId } = useParams();
    const [people, setPeople] = useState<People[]>([]);
    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            const peopleFromDb = await axios.get<People[]>(`https://gifts-exchange-generator-backend.onrender.com/lobby/${lobbyId}`);
            setPeople(peopleFromDb.data);
            console.log(peopleFromDb)
        })()
    }, [])

    const handleGiftIconClick = () => {
        navigate('/');
    }

    return (
        <div className="lobby">
            {people && (
                <>
                    <div className="gift-icon">
                        <FontAwesomeIcon icon={faGift} onClick={() => handleGiftIconClick()}/>
                    </div>
                    <p className="lobby-title"> Wyślij do każdej osoby </p>
                    <p className="lobby-title"> przyporządkowany jej link: </p>
                    <div className="lobby-table">
                            {people.map(person => (
                            <div className="person-data-container">
                                <div className="names-container">
                                    <p className="names"> {person.name} </p>
                                </div>
                                <div className="links-container">
                                    <div className="input-for-link">
                                    <p className="links"> {`${process.env.BACKEND_URL}/lobby/${lobbyId}/${person.hash}`} </p>
                                    </div>
                                </div>
                            </div>
                            
                            ))}
                    </div>
                </>
            )}
            {!people && (
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            )}

        </div>

    );
}

export default Lobby;