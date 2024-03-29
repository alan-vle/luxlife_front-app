import './App.css'
import {Button} from "@material-tailwind/react";
import Router from "./pages/routes/Router.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return <>
    <ToastContainer limit={1}/>
    <Router />
  </>;
}

export default App
