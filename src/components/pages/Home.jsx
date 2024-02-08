import carBackgroundHome from "../../assets/car_background_home.jpg"
import Review from "../Review/Review.jsx";
import CarsForm from "../forms/CarsForm.jsx";

const Home = () => {
    return(
        <div>
            <div className={"car-image"}>
                <img src={carBackgroundHome} alt={"Car background for home"} className={"w-full h-[400px]"}/>
                <div className={"absolute top-[10%] right-[2%] hidden"}><Review /></div>
                <CarsForm />
            </div>
            <div className="app-container">
                <h1>Home page</h1>
            </div>
        </div>

    );
}

export default Home;