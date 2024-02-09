import './App.css'
import {Button} from "@material-tailwind/react";
import Router from "./components/routes/Router.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return <>
    <ToastContainer />
    <Router />
  </>;
}

export default App
