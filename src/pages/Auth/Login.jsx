import {Alert, Button, Card, CardBody, Input, Typography} from "@material-tailwind/react";
import {OneFieldPassword} from "@/utils/Forms/Password.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import {LoginService} from "@/service/api/AuthentificationService.jsx";
import {emailValidator} from "@/utils/Forms/Validator/Validator.jsx";

const Login = () => {
    const [email, setEmail] = useState(null);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [emailIsNotValid, setEmailIsNotValid] = useState(false);
    const [password, setPassword] = useState(null)
    const goTo = useNavigate()

    const emailHandler = (e) => {
        emailValidator(e, setEmail, setEmailIsValid, setEmailIsNotValid)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if(emailIsValid && null !== password) {
            const loginData = {
                email: email,
                password: password
            }

            LoginService(loginData, goTo)
        } else if(!emailIsValid) {
            toast.error('Votre email n\'est pas valide.', {
                position: "top-center"
            })
        } else if(null === password || password.length === 0) {
            toast.error('Votre mot de passe n\'est pas valide.', {
                position: "top-center"
            })
        } else {
            toast.error('Le formulaire n\'est pas valide.')
        }
    }

    return (
        <div className={"grid grid-cols-12 mt-28 mb-28"}>
            <div className={"md:col-span-4 lg:col-span-4"}></div>
            <div className={"col-span-12 md:col-span-4 lg:col-span-4 w-fit"}>
                <form onSubmit={submitHandler}>
                    <Card>
                        <CardBody>
                            <div className={"grid grid-cols-2 flex justify-center p-2 w-96"}>
                                <div className={"col-span-2 mt-4"}>
                                    <Typography as="h2" className={"text-black font-extrabold text-[40px]"}>
                                        Accédez à votre espace
                                    </Typography>
                                </div>
                                <div className={"col-span-2 mt-4"}>
                                    <Input label={"Email"} placeholder={"jon-jony@gmail.com"}
                                           onChange={emailHandler} success={emailIsValid} error={emailIsNotValid}
                                    />
                                </div>
                                <div className={"col-span-2 mt-4"}>
                                    <OneFieldPassword onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className={"col-span-2 mt-4 flex justify-center"}>
                                    <Button type={"submit"}>Connexion</Button>
                                </div>
                                <div className={"col-span-2 mt-4 flex justify-end"}>
                                    <Button variant={"text"} onClick={() => goTo('/forgot-password')}>Mot de passe oublié?</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </form>

            </div>
            <div className={"col-span-5"}></div>
        </div>
    )
}

export default Login;