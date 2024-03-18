import "./Home.css"
import MainBlock from "@/components/parts/MainBlock.jsx";
import {useLocation} from "react-router";
const Home = () => {
    const {state} = useLocation();

    return <MainBlock fromAgency={state}/>;
}

export default Home;