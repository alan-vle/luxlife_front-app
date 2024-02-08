import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button, Input, Select, Option
} from "@material-tailwind/react";
import carImage from "../../../assets/button-car.png"
import trafficJamImage from "../../../assets/traffic-jam.png"
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
function RentalForm() {
    const [fromAgency, setFromAgency] = useState(null);
    const [rentalType, setRentalType] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [fromTime, setFromTime] = useState(null);
    const [toAgency, setToAgency] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [toTime, setToTime] = useState(null);
    const [returnPlace, setReturnPlace] = useState(false);

    function handleSubmit() {
        alert(fromAgency+ '\n'+rentalType+ '\n'+fromDate+ '\n'+fromTime+ '\n'+toAgency+ '\n'+toDate+ '\n'+toTime)
    }

    return (
        <form>
            <div className="grid grid-cols-6 gap-4">
                <div>
                    <Input size="md" label="Choisi ton agence de départ" onChange={(e) => setFromAgency(e.target.value)}/>
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
                        onClick={() => setReturnPlace(!returnPlace)}
                    >+ Lieux de retour différent?</Button>
                </div>
                <div>{returnPlace && <Input size="md" label="Choisi ton agence de retour" onChange={(e) => setToAgency(e.target.value)} />}</div>
                <div></div>
                <div></div>
                <div></div>
                <div className="text-end">
                    <Button className={"bg-[#cdeae1] text-black"} onClick={handleSubmit}><FontAwesomeIcon icon={faMagnifyingGlass} /> Rechercher</Button>
                </div>
            </div>
        </form>

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