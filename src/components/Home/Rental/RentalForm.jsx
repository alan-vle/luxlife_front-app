import {
    Button, Input, Select, Option
} from "@material-tailwind/react";
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router";
import {getAllAgencies} from "@/service/api/AgenciesService.jsx";
function RentalForm({
    fromAgency: fromAgencyProp = null,
    agencyUuid: agencyUuidProp = null,
    rentalType: rentalTypeProp = null,
    fromDate: fromDateProp = null,
    fromTime: fromTimeProp = null,
    toAgency: toAgencyProp = null,
    toDate: toDateProp = null,
    toTime: toTimeProp = null,
    returnPlace: returnPlaceProp = false,
    fromSuggestions: fromSuggestionsProp = null,
    toSuggestions: toSuggestionsProp = null
}) {
    const [fromAgency, setFromAgency] = useState(fromAgencyProp);
    const [agencyUuid, setAgencyUuid] = useState(agencyUuidProp);
    const [rentalType, setRentalType] = useState(rentalTypeProp);
    const [fromDate, setFromDate] = useState(fromDateProp);
    const [fromTime, setFromTime] = useState(fromTimeProp);
    const [toAgency, setToAgency] = useState(toAgencyProp);
    const [toDate, setToDate] = useState(toDateProp);
    const [toTime, setToTime] = useState(toTimeProp);
    const [returnPlace, setReturnPlace] = useState(returnPlaceProp);
    const [fromSuggestions, setFromSuggestions] = useState(fromSuggestionsProp);
    const [toSuggestions, setToSuggestions] = useState(toSuggestionsProp);
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

        goTo('/cars/search-result', {state: rentalFields})
    }

    async function inputAgencyHandler(e, type) {
        const inputValue = e.target.value;

        if (inputValue.length >= 2) {
            const foundAgencies = await getAllAgencies({'city': inputValue})
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
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4">
                    <div>
                        <div  style={{ position: 'relative', display: 'inline-block' }}>
                            <Input size="md" label="Agence de départ" placeholder={"Marseille"}
                                   className={"required"}
                                   onChange={(e) => setFromAgency(e.target.value)}  onInput={(e) => inputAgencyHandler(e,"from")}
                                    value={`${fromAgency !== null ? fromAgency : ''}`}
                            />
                            {fromSuggestions !== null && (
                                <div className={"w-fit h-fit"} ref={suggestionsRef} style={{
                                        position: 'absolute',
                                        top: '100%', left: 0,
                                        zIndex: 999,
                                        backgroundColor: '#fff',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px'
                                    }}
                                >
                                    <ul>
                                        {Array.isArray(fromSuggestions) ?
                                            fromSuggestions.map((fromSuggestion, index) => (
                                                <li key={index} className={"border border-b-8"} onClick={() => {
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
                    <div className=" col-span-1.5">
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