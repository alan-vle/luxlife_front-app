import {
    Button, Input, Select, Option, List
} from "@material-tailwind/react";
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router";
import {getAllAgencies} from "@/service/api/AgenciesService.jsx";
import {errorNotif, successNotif} from "@/utils/Notif.js";
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
    const [mileageKilometers, setMileageKilometers] = useState(null)
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
        setFromAgency(e.target.value)
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
                                   onChange={(e) => inputAgencyHandler(e,'from')}
                                   value={`${fromAgency !== null ? fromAgency : ''}`}
                            />
                            {fromSuggestions && Array.isArray(fromSuggestions) && fromSuggestions.length > 0 ? fromSuggestions.map((fromSuggestion, index) => (
                                <List key={index} className={"border border-b-gray"}>
                                    <Button type={"button"} variant={"text"} onClick={() => {
                                        setFromAgency(fromSuggestion.city)
                                        setAgencyUuid(fromSuggestion.uuid)
                                        setFromSuggestions(null)
                                    }}> {fromSuggestion.address} {fromSuggestion.city}</Button>
                                </List>
                            )) : fromSuggestions && fromSuggestions.length > 0 ? <List className={"border border-b-gray"}>Aucune agence trouvée.</List> : ''}
                        </div>
                    </div>
                    <div>
                        <Select label="Type de location" onChange={(e) => setRentalType(e)}>
                            <Option value={"0"}>Classique</Option>
                            <Option value={"1"}>Longue durée</Option>
                        </Select>
                    </div>
                    <div>
                        <Input size="md" label="Kilomètres" placeholder={"100"}
                               className={"required"}
                               onChange={(e) => setMileageKilometers(e.target.value)}
                               value={`${mileageKilometers !== null ? mileageKilometers : ''}`}
                        />
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
                    <div>
                        {
                            returnPlace && (
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <Input size="md" label="Agence de retour" placeholder={"Aix-en-provence"}
                                       onChange={(e) => {
                                           setToAgency(e.target.value)
                                       }} onInput={(e) => inputAgencyHandler(e,"to")}
                                           value={`${toAgency !== null ? toAgency : ''}`}
                                    />
                                        {toSuggestions && Array.isArray(toSuggestions) && toSuggestions.length > 0 ? toSuggestions.map((toSuggestion, index) => (
                                            <List key={index} className={"border border-b-gray"}>
                                                <Button type={"button"} variant={"text"} onClick={() => {
                                                    if(toAgency.uuid === fromAgency.uuid) {
                                                        errorNotif('Votre agence de retour n\'est pas différente de celle de départ.', 'same-agency')
                                                    } else {
                                                        setToAgency(toSuggestion.city)
                                                        setToSuggestions(null)
                                                    }
                                                }}> {toSuggestion.address} {toSuggestion.city}</Button>
                                            </List>
                                        )) : toSuggestions && toSuggestions.length > 0 ? <List className={"border border-b-gray"}>Aucune agence trouvée.</List> : ''}

                                </div>
                            )}
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