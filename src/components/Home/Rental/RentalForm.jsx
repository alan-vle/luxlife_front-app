import {
    Button, Input, Select, Option, List
} from "@material-tailwind/react";
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router";
import {getAllAgencies} from "@/service/api/AgenciesService.jsx";
import {errorNotif, successNotif} from "@/utils/Notif.js";
import {hoursGenerator} from "@/utils/Forms/BusinessHours.jsx";
import Cars from "@/components/Cars/Cars.jsx";
import {useRentalFormContext} from "@/store/RentalFormContext.jsx";
function RentalForm({
    fromAgency: fromAgencyProp = null,
    agencyUuid: agencyUuidProp = null,
    contract: contractProp = null,
    fromDate: fromDateProp = null,
    fromTime: fromTimeProp = null,
    toAgency: toAgencyProp = null,
    toDate: toDateProp = null,
    toTime: toTimeProp = null,
    returnPlace: returnPlaceProp = false,
    fromSuggestions: fromSuggestionsProp = null,
    toSuggestions: toSuggestionsProp = null
}) {
    const { formData, setFormData } = useRentalFormContext();
    const [fromAgency, setFromAgency] = useState(fromAgencyProp);
    const [contract, setContract] = useState(contractProp);
    const [fromDate, setFromDate] = useState(fromDateProp);
    const [fromTime, setFromTime] = useState(fromTimeProp);
    const [toAgency, setToAgency] = useState(toAgencyProp);
    const [toDate, setToDate] = useState(toDateProp);
    const [toTime, setToTime] = useState(toTimeProp);
    const [mileageKilometers, setMileageKilometers] = useState(null)
    const [returnPlace, setReturnPlace] = useState(returnPlaceProp);
    const [fromSuggestions, setFromSuggestions] = useState(fromSuggestionsProp);
    const [toSuggestions, setToSuggestions] = useState(toSuggestionsProp);
    const [displayCars, setDisplayCars] = useState(false);
    const suggestionsRef = useRef(null);
    const goTo = useNavigate();

    async function inputAgencyHandler(e, type, setter) {
        const agencyValue = e.target.value;

        setter({city: agencyValue})

        if (agencyValue.length >= 2) {
            const foundAgencies = await getAllAgencies({'city': agencyValue})
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

    function updateFormData(name, value, setter) {
        setter(value)

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    useEffect(() => {
        if(null !== fromAgencyProp) {
            updateFormData('fromAgency', {
                address: fromAgencyProp.address,
                city: fromAgencyProp.city,
                uuid: fromAgencyProp.uuid
            }, setFromAgency)

            submitHandler(new Event("submit"))
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if(fromAgency) {
            setDisplayCars(true)
        } else {
            setDisplayCars(false)
            errorNotif('Vous devez au moins choisir une agence de départ !')
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 2xl:grid-cols-6 gap-4 block flex-col">
                    <div>
                        <div className={"w-full"} style={{ position: 'relative', display: 'inline-block' }}>
                            <Input size="md" label="Agence de départ" placeholder={"Marseille"}
                                   className={"required"}
                                   onChange={(e) => inputAgencyHandler(e,'from', setFromAgency)}
                                   value={`${fromAgency !== null && fromAgency.city ? fromAgency.city : ''}`}
                            />
                            {fromSuggestions && Array.isArray(fromSuggestions) && fromSuggestions.length > 0 ? fromSuggestions.map((fromSuggestion, index) => (
                                <List key={index} className={"border border-b-gray"}>
                                    <Button type={"button"} variant={"text"} onClick={() => {
                                        updateFormData('fromAgency', {
                                            address: fromSuggestion.address,
                                            city: fromSuggestion.city,
                                            uuid: fromSuggestion.uuid
                                        }, setFromAgency)
                                        setFromSuggestions(null)
                                        setDisplayCars(false)
                                    }}> {fromSuggestion.address} {fromSuggestion.city}</Button>
                                </List>
                            )) : fromSuggestions && fromSuggestions.length > 0 ? <List className={"border border-b-gray"}>Aucune agence trouvée.</List> : ''}
                        </div>
                    </div>
                    <div>
                        <Select label="Type de location" onChange={(e) => updateFormData('contract', e, setContract)}>
                            <Option value={"0"}>Classique</Option>
                            <Option value={"1"}>Longue durée</Option>
                        </Select>
                    </div>
                    <div>
                        <Input size="md" label="Kilomètres" placeholder={"100"}
                               className={"required"}
                               onChange={(e) => updateFormData('mileageKilometers', e.target.value, setMileageKilometers)}
                               value={`${mileageKilometers !== null ? mileageKilometers : ''}`}
                        />
                    </div>
                    <div>
                        <Input
                            label="Date de prise en charge" type={"date"}
                            onChange={(e) => updateFormData('fromDate', e.target.value, setFromDate)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                    <div>
                        <Select label="Heure de départ" onChange={(e) => updateFormData('fromTime', e, setFromTime)}>
                            {hoursGenerator()}
                        </Select>
                    </div>
                    <div>
                        <Input
                            label="Date de retour"
                            type={"date"}
                            onChange={(e) => updateFormData('toDate', e.target.value, setToDate)}
                            value={fromDate && !toDate || fromDate > toDate ? fromDate : toDate}
                            min={fromDate ? fromDate : new Date().toISOString().split('T')[0]}
                        />
                    </div>
                    <div>

                        <Select label="Heure de retour" onChange={(e) => updateFormData('toTime', e, setToTime)}>
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
                                       onInput={(e) => inputAgencyHandler(e,'to', setToAgency)}
                                           value={`${toAgency !== null && toAgency.city !== null ? toAgency.city : ''}`}
                                    />
                                        {toSuggestions && Array.isArray(toSuggestions) && toSuggestions.length > 0 ? toSuggestions.map((toSuggestion, index) => (
                                            <List key={index} className={"border border-b-gray"}>
                                                <Button type={"button"} variant={"text"} onClick={() => {
                                                    if(toAgency.uuid === fromAgency.uuid) {
                                                        errorNotif('Votre agence de retour n\'est pas différente de celle de départ.', 'same-agency')
                                                    } else {
                                                        updateFormData('toAgency', {
                                                            address: toSuggestion.address,
                                                            city: toSuggestion.city,
                                                            uuid: toSuggestion.uuid
                                                        }, setToAgency)
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
                        <Button className={"bg-[#cdeae1] text-black"} type={"submit"}><FontAwesomeIcon icon={faMagnifyingGlass} /> Rechercher</Button>
                    </div>
                </div>
            </form>
            {displayCars && (
                <div>
                    <div className={"mt-8"}><Cars choseMode={true} agency={formData.fromAgency.uuid}/></div>
                </div>
            )}
        </>
    );
}

function addOneDayToFromDate(fromDate)
{
    const fromDateObject = new Date(fromDate);

    fromDateObject.setDate(fromDateObject.getDate() + 1);

    return fromDateObject.toISOString().split('T')[0];
}

export default RentalForm;