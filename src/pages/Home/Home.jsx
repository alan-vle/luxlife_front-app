import carBackgroundHome from "../../assets/car_background_home.jpg"
import Review from "../../components/Review/Review.jsx";
import CarsForm from "../../components/Home/Rental/RentalForm.jsx";
import {Button, Card, CardBody, CardHeader} from "@material-tailwind/react";
import carImage from "../../assets/button-car.png";
import trafficJamImage from "../../assets/traffic-jam.png";
import {useState} from "react";
import RentalForm from "../../components/Home/Rental/RentalForm.jsx";
import ListOfCars from "../../components/Home/List-of-cars/ListOfCars.jsx";
import "./Home.css"
const Home = () => {
    const [content, setContent] = useState('form');
    const [selectedBorder, setSelectedBorder] = useState('form');
    return(
        <div className={"mb-[200px]"}>
            <div className={"car-image"}>
                <img src={carBackgroundHome} alt={"Car background for home"} className={"w-full h-[400px]"}/>
                <div className={"absolute top-[10%] right-[2%] hidden"}><Review /></div>
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
                    <CardBody>{content === 'form' ? <RentalForm /> : <ListOfCars />}</CardBody>
                </Card>
            </div>
        </div>
    );
}

export default Home;