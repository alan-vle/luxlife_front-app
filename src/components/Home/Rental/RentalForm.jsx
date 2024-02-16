import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button, Input, Select, Option
} from "@material-tailwind/react";
import carImage from "../../../assets/button-car.png"
import trafficJamImage from "../../../assets/traffic-jam.png"
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {getAgenciesByCity} from "@/service/api/AgenciesService.jsx";
import {Navigate, useNavigate} from "react-router";
function RentalForm() {
    const [fromAgency, setFromAgency] = useState(null);
    const [agencyUuid, setAgencyUuid] = useState(null);
    const [rentalType, setRentalType] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [fromTime, setFromTime] = useState(null);
    const [toAgency, setToAgency] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [toTime, setToTime] = useState(null);
    const [returnPlace, setReturnPlace] = useState(false);
    const [fromSuggestions, setFromSuggestions] = useState(null);
    const [toSuggestions, setToSuggestions] = useState(null);
    const suggestionsRef = useRef(null);
    const goTo = useNavigate();

    function submitHandler() {
        const rentalFields = {
            fromAgency: fromAgency,
            agencyUuid: agencyUuid,
            rentalType: rentalType,
            fromDate: fromDate,
            fromTime: fromTime,
            toAgency: toAgency,
            toDate: toDate,
            toTime: toTime
        };

        goTo('/cars-found', {state: rentalFields})
    }
    async function inputAgencyHandler(e, type) {
        const inputValue = e.target.value;

        if (inputValue.length >= 2) {
            const foundAgencies = await getAgenciesByCity(inputValue)
            const notFoundMessage = "Aucune agence trouvée.";

            if (type === 'from') {
                setFromSuggestions(foundAgencies.length > 0 ? foundAgencies : notFoundMessage);
            } else if (type === 'to') {
                setToSuggestions(foundAgencies.length > 0 ? foundAgencies : notFoundMessage)
            }
        } else {
            setFromSuggestions(null)
            setToSuggestions(null)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setFromSuggestions(null);
                setToSuggestions(null)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <form>
                <div className="grid grid-cols-6 gap-4">
                    <div>
                        <div  style={{ position: 'relative', display: 'inline-block' }}>
                            <Input size="md" label="Agence de départ" placeholder={"Marseille"}
                                   className={"required"}
                                   onChange={(e) => setFromAgency(e.target.value)}  onInput={(e) => inputAgencyHandler(e,"from")}
                                    value={`${fromAgency !== null ? fromAgency : ''}`}
                            />
                            {fromSuggestions !== null && (
                                <div ref={suggestionsRef} style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
                                    <ul>
                                        {Array.isArray(fromSuggestions) ?
                                            fromSuggestions.map((fromSuggestion, index) => (
                                                <li key={index} onClick={() => {
                                                        setFromAgency(fromSuggestion.city)
                                                        setAgencyUuid(fromSuggestion.uuid)
                                                        setFromSuggestions(null)
                                                    }}
                                                >
                                                    {fromSuggestion.address} {fromSuggestion.city}
                                                </li>
                                            ))
                                            : <li>{fromSuggestions}</li>
                                        }
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>
                    <div>
                        <Select label="Type de location" onChange={(e) => setRentalType(e)}>
                            <Option value={"0"}>Classique</Option>
                            <Option value={"1"}>Longue durée</Option>
                        </Select>
                    </div>
                    <div>
                        <Input label="Date de prise en charge" type={"date"} onChange={(e) => setFromDate(e.target.value)}/>
                    </div>
                    <div>
                        <Select label="Heure de départ" onChange={(e) => setFromTime(e)}>
                            {hoursGenerator()}
                        </Select>
                    </div>
                    <div>
                        <Input label="Date de retour" type={"date"} onChange={(e) => setToDate(e.target.value)} />
                    </div>
                    <div>
                        <Select label="Heure de retour" onChange={(e) => setToTime(e)}>
                            {hoursGenerator()}
                        </Select>
                    </div>
                    <div className="col-span-1.5">
                        <Button className={"font-semibold"} variant="text"
                            onClick={() => {
                                setReturnPlace(!returnPlace)
                                setToAgency(null)
                            }}
                        >+ Lieux de retour différent?</Button>
                    </div>
                    <div>{returnPlace &&
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Input size="md" label="Agence de retour" placeholder={"Aix-en-provence"}
                               onChange={(e) => {
                                   setToAgency(e.target.value)
                               }} onInput={(e) => inputAgencyHandler(e,"to")}
                                   value={`${toAgency !== null ? toAgency : ''}`}
                            />
                            {toSuggestions !== null && (
                                <div ref={suggestionsRef} style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
                                    <ul>
                                        {Array.isArray(toSuggestions) ?
                                            toSuggestions.map((toSuggestion, index) => (
                                                <li key={index} onClick={() => {
                                                    setToAgency(toSuggestion.city)
                                                    setToSuggestions(null)
                                                    }}
                                                >
                                                    {toSuggestion.address} {toSuggestion.city}
                                                </li>
                                            ))
                                            : <li>{toSuggestions}</li>
                                        }
                                    </ul>
                                </div>
                            )}
                        </div>}
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className="text-end">
                        <Button className={"bg-[#cdeae1] text-black"} onClick={submitHandler}><FontAwesomeIcon icon={faMagnifyingGlass} /> Rechercher</Button>
                    </div>
                </div>
            </form>
        </>
    );
}

function hoursGenerator() {
        let options = [];
        let hours = 8;
        let minutes = 0;
        const halfHour = 30;

        while (hours < 21) {
            // Formatage de l'heure actuelle
            let hoursStr = hours.toString().padStart(2, '0');
            let minutesStr = minutes.toString().padStart(2, '0');
            let hoursAndMinutes = `${hoursStr}:${minutesStr}`;

            // Ajout de l'heure actuelle aux options
            options.push(<Option value={hoursAndMinutes}>{hoursAndMinutes}</Option>);

            // Incrémenter d'une demi-heure
            minutes += halfHour;
            if (minutes >= 60) {
                hours++;
                minutes = 0;
            }
        }

        return options;
}
export default RentalForm;