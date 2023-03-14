import { faGift, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';

function LobbyMaker() {
    const [people, setPeople] = useState<string[]>([]);
    const [lobbyName, setLobbyName] = useState('');
    const [currentPerson, setCurrentPerson] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorLobbyName, setErrorLobbyName] = useState(false);
    const [errorPeople, setErrorPeople] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const lobbyNameSetter = (e: React.FormEvent<HTMLInputElement>): void => {
        const lobbyName = e.currentTarget.value;
        setLobbyName(lobbyName);
    }

    const currentPersonSetter = (e: React.FormEvent<HTMLInputElement>): void => {
        const currentPerson = e.currentTarget.value;
        setCurrentPerson(currentPerson);
    }

    const handlePlusClick = () => {
        if((currentPerson !== '') && (currentPerson.trim().length > 0)) {
            setPeople([...people, currentPerson])
            setCurrentPerson('');
        }
    }

    const handleTrashClick = (personToDelete: string) => {
        const peopleAfterDeleting = people.filter(person => personToDelete !== person);
        setPeople(peopleAfterDeleting);
    }

const validateLobbyName = () => {
    if((lobbyName === '') || (lobbyName.trim().length === 0)) {
        setErrorLobbyName(true);
        return true;
    } else {
        setErrorLobbyName(false);
    }
}

const validatePeople = () => {
    if(people.length < 2) {
        setErrorPeople(true);
        return true;
    } else {
        setErrorPeople(false);
    }
}

const validateInput = () => {
    const validateLobbyNameResult = validateLobbyName();
    const validatePeopleResult = validatePeople();
    return validateLobbyNameResult || validatePeopleResult;
}

const handleXLobbyClick = () => {
    setErrorLobbyName(false);
}

const handleXPeopleClick = () => {
    setErrorPeople(false);
}

    const handleGenerateClick = async () => {
        try {
            if(!validateInput()){
                setLoading(true);
                const res = await axios.post(`https://gifts-exchange-generator-backend.onrender.com/lobby`, {
                    name: lobbyName,
                    people: people
                })
                setLoading(false);
                navigate(`/lobby/${res.data.people[0].lobbyId}`);
            }
        }
        catch(error: any) {
            setLoading(false);
            const constraints = error.response.data.originalError[0].constraints;
            const errorName: string = String(Object.values(constraints)[0]);
            setErrorMessage(errorName);
        }
    }

    const handleGiftIconClick = () => {
        navigate('/');
    }

    return (
        <div className="lobby-maker">
            {loading && (
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            )}
            {!loading && (
                <>
                <div className="gift-icon">
                    <FontAwesomeIcon icon={faGift} onClick={() => handleGiftIconClick()}/>
                </div>
                <div className="adding-people-container">
                    <div className="input-container">
                        <input className="input-lobby" placeholder="Nazwa pokoju..." onChange={lobbyNameSetter}/>
                        <input value={currentPerson} className="input-participant" placeholder="Uczestnik..." onChange={currentPersonSetter}/>
                    </div>
                    <p className="plus" onClick={handlePlusClick}> + </p>
                </div>
                <div className="participants-container"> 
                    <p className="participants-list-header"> Lista uczestników </p>
                    <div className="participants-list">
                        {people.map(person => (
                            <div className="single-participant">
                                <p>{person}</p>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleTrashClick(person)} style={{cursor:"pointer"}}/>
                            </div>
                        ))}

                    </div>
                    <div className="button generate-button" onClick={handleGenerateClick}> Generuj </div>
                </div>
                {errorMessage && (<div className="error-message-container">
                    <p className="error-message"> Popraw wprowadzone dane! </p>
                </div>)}
                <CSSTransition in={!!errorLobbyName}
                    timeout={300}
                    classNames="error-lobby-name-animation"
                    unmountOnExit>
                        <div className="lobby-name-error-container">
                            <p className="lobby-name-error"> Nazwa pokoju nie może być pusta! </p>
                            <FontAwesomeIcon icon={faXmark} onClick={handleXLobbyClick}/>
                        </div>
                </CSSTransition>
                <CSSTransition in={!!errorPeople}
                    timeout={300}
                    classNames="error-people-animation"
                    unmountOnExit>
                        <div className="people-error-container">
                            <p className="people-error"> Podaj conajmniej dwóch uczestników! </p>
                            <FontAwesomeIcon icon={faXmark} onClick={handleXPeopleClick}/>
                        </div>
                </CSSTransition>
                
            </>
            )}

        </div>
    );
}

export default LobbyMaker;