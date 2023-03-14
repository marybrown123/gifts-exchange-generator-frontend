import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Person {
    name: string,
    lobbyId: number,
    hash: string
}

interface Pair {
    personGiving: Person,
    personReceiving: Person
}

function PairReveal() {
    const {lobbyId} = useParams();
    const {hash} = useParams();
    const [personGiving, setPersonGiving] = useState<Person>();
    const [personReceiving, setPersonReceiving] = useState<Person>();
    useEffect(() => {
        (async () => {
            try {
                const pairFromDb = await axios.get<Pair>(`${process.env.REACT_APP_FRONTEND_URL}/lobby/${lobbyId}/${hash}`);
                setPersonGiving(pairFromDb.data.personGiving);
                setPersonReceiving(pairFromDb.data.personReceiving);
                console.log(encodeURIComponent(hash!));
            } catch(e) {
                console.log(e)
            }


        })()
    }, [])
    return (
        <div className="pair-reveal"> 
            {personGiving && personReceiving && (
                <>
                    <div className="reveal-first-row">
                        <p className="first-row-text"> Cześć </p> 
                        <p className="person-giving-name"> {personGiving.name} </p>
                    </div>
                    <div className="reveal-second-row">
                        <p className="second-row-text"> Kupujesz prezent dla: </p>
                    </div>
                    <div className="reveal-third-row">
                        <p className="person-receiving-name"> {personReceiving.name} </p>
                    </div>
                </>
            )}
            {(!personGiving || !personReceiving) && (
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            )}
        </div>
    );
}

export default PairReveal;