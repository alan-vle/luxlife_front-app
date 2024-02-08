import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button, Input, Select, Option
} from "@material-tailwind/react";
import carImage from "../../assets/button-car.png"
import trafficJamImage from "../../assets/traffic-jam.png"
import {useState} from "react";
import InputDatePicker from "./DatePicker.jsx";
function CarsForm() {
    const [content, setContent] = useState('form');
    const [selectedBorder, setSelectedBorder] = useState('form');
    return (
        <Card className="w-3/4 absolute top-[40%] left-[10%] right-[10%]">
            <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-full shrink-0"
            >
                <div className={"flex items-center gap-4"}>
                    <Button className={
                        "flex items-center gap-3 bg-transparent text-blue-gray-900 selected-element "
                        + (selectedBorder === 'form' ? 'border-b-2 border-blue-500' : '')
                        }
                        onClick={(e) => {
                            setContent('form')
                            setSelectedBorder('form')
                        }}
                        ripple={false}
                    >
                    <img src={carImage} alt={"car image"}/>
                    Nouvelle location
                </Button>
                <Button className={
                        "flex items-center gap-3 bg-transparent text-blue-gray-900 selected-element "
                        + (selectedBorder === 'form' ? '' : 'border-b-2 border-blue-500')
                    }
                        onClick={() => {
                            setContent('cars-list')
                            setSelectedBorder('cars-list')
                        }}
                        ripple={false}>
                    <img src={trafficJamImage} alt={"traffic jam image"}  />
                    Voir la liste des voitures
                </Button>
                </div>
            </CardHeader>
            <CardBody>
                {
                    content === 'form' ?
                        <div className="grid grid-cols-6 gap-4">
                            <div><Input size="md" label="Choisi ton agence de départ" /></div>
                            <div>
                                <Select label="Type de location">
                                    <Option>Classique</Option>
                                    <Option>Longue durée</Option>
                                </Select>
                            </div>
                            <div className={"ml-3 pt-2 mr-3 border"}><InputDatePicker label="Date de prise en charge"/></div>
                            <div>
                                <Select label="Heure de départ">
                                    {hoursGenerator()}
                                </Select>
                            </div>
                            <div className={"ml-3 pt-2 mr-3"}><InputDatePicker label="Date de retour"/></div>
                            <div>
                                <Select label="Heure de retour">
                                    {hoursGenerator()}
                                </Select>
                            </div>
                        </div>

                    : <h1>List of cars</h1>
                }
            </CardBody>
        </Card>
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
            options.push(<Option>{hoursAndMinutes}</Option>);

            // Incrémenter d'une demi-heure
            minutes += halfHour;
            if (minutes >= 60) {
                hours++;
                minutes = 0;
            }
        }

        return options;
}
export default CarsForm;