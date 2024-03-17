import carBackgroundHome from "@/assets/car_background_home.jpg";
import Review from "@/components/Review/Review.jsx";
import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import carImage from "@/assets/button-car.png";
import trafficJamImage from "@/assets/traffic-jam.png";
import RentalForm from "@/components/Home/Rental/RentalForm.jsx";
import ListOfCars from "@/components/Home/List-of-cars/ListOfCars.jsx";
import { useState } from "react";

const MainBlock = () => {
    const [content, setContent] = useState('form');
    const [selectedBorder, setSelectedBorder] = useState('form');
    const [autoMarginBottom, setAutoMarginBottom] = useState(null)
    return (
        <div className={`grid grid-cols-12 mt-4 ${autoMarginBottom && `mb-[${autoMarginBottom}px]`}`}>
            <div className={"col-span-12 relative"}>
                <img src={carBackgroundHome} alt={"Car background for home"} style={{"width": "100%", "height": "50%"}}/>
                <div className={"flex justify-center absolute top-1/3 w-full max-h-fit"}>
                    <Card className={""}>
                        <CardHeader
                            shadow={false}
                            floated={false}
                            className="m-0 w-full shrink-0 max-h-fit"
                        >
                            <div className={"flex items-center gap-4"}>
                                <Button className={
                                    "flex items-center gap-3 bg-transparent text-blue-gray-900 selected-element "
                                    + (selectedBorder === 'form' ? 'border-b-2 border-blue-500' : '')
                                }
                                        onClick={(e) => {
                                            setContent('form')
                                            setSelectedBorder('form')
                                            setAutoMarginBottom(null)
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
                                            setAutoMarginBottom('500')
                                        }}
                                        ripple={false}>
                                    <img src={trafficJamImage} alt={"traffic jam image"}  />
                                    Voir la liste des voitures
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            {content === 'form' ? <RentalForm /> : <ListOfCars />}
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className={"top-[10%] right-[2%] hidden"}><Review /></div>

        </div>
    )
}

export default MainBlock;
