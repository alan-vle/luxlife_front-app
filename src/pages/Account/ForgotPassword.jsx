import {Button, Card, CardBody, Input, Typography} from "@material-tailwind/react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router";
import {toast} from "react-toastify";
import {ForgotPasswordService} from "@/service/api/AccountService.jsx";
import {isAuth} from "@/utils/auth.js";
import {emailValidator} from "@/utils/Forms/Validator/Validator.jsx";

const ForgotPassword = () => {
    if(isAuth()) {
        sessionStorage.removeItem("token")
    }

    const [email, setEmail] = useState(null);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [emailIsNotValid, setEmailIsNotValid] = useState(false);
    const goTo = useNavigate()

    const emailHandler = (e) => {
        emailValidator(e, setEmail, setEmailIsValid, setEmailIsNotValid)
    }

    const submitHandler = () => {
        if(emailIsValid) {
            ForgotPasswordService(email, goTo)
        } else {
            toast.error('L\'email n\'est pas valide', {
                position: "top-center"
            })
        }
    }
    return(
        <div className={"grid grid-cols-12 mt-28 mb-[300px]"}>
            <div className={"col-span-4"}></div>
            <div className={"col-span-4"}>
                <Card>
                    <CardBody>
                        <div className={"grid grid-cols-3 "}>
                            <div className={"col-span-3 flex justify-center"}>
                                <Typography variant={"h3"} className={"text-black font-bold"}>Rénitialiser votre mot de passe</Typography>
                            </div>
                            <div className={"col-span-1"}></div>
                            <div className={"col-span-1 mt-8 flex justify-center"}>
                                <Input label={"Email"} onChange={emailHandler} success={emailIsValid} error={emailIsNotValid}/>
                            </div>
                            <div className={"col-span-1"}></div>
                            <div className={"col-span-3 mt-8 flex justify-center"}>
                                <Button className={""} onClick={submitHandler}>Envoyer</Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className={"col-span-4"}></div>

        </div>
    );
}

export default ForgotPassword;