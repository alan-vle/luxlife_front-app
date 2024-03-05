import {useNavigate, useParams} from "react-router";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {ConfirmEmailService} from "@/service/api/AccountService.jsx";
import Login from "@/pages/Auth/Login.jsx";

const ConfirmEmail = () => {
    const {uuid} = useParams()
    const [queryParameters] = useSearchParams()
    const expires = queryParameters.get('expires')
    const signature = queryParameters.get('signature')
    const goTo = useNavigate()

    useEffect(() => {
        if(uuid && expires && signature) {
            ConfirmEmailService(uuid, expires, signature, goTo)
        }
    }, [])

    return(
        <Login />
    )
}

export default ConfirmEmail;