import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography, CardBody, Alert,
} from "@material-tailwind/react";
import "./Register.css"
import {OneFieldPassword} from "@/utils/Password.jsx";
import {useState} from "react";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function IconOutlined() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
        </svg>
    );
}

function IconSolid() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function Register() {
    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [passwordLength, setPasswordLength] = useState(false);
    const [passwordLowUp, setPasswordLowUp] = useState(false);
    const [passwordSymb, setPasswordSymb] = useState(false);
    return (
        <div className={"grid grid-cols-12 mt-28 mb-28"}>
            Nom: {fullName} <br />
            Email : {email} <br />
            Address: {address} <br />
            Birthdate : {birthDate} <br />
            Pass : {password} <br />
           Conf pass:  {confirmPassword} <br />
            <div className={"col-span-3"}></div>
            <div className={"col-span-6 flex justify-center w-full h-auto"}>
                <Card>
                    <CardBody>
                        <Typography className={"font-extrabold text-[40px] text-black"}>Rejoignez nous en devenant client !</Typography>
                        <div className={"grid grid-cols-2 gap-2 mt-8 placeholder:text-slate-400"}>
                            <div className={"mb-4 "}>
                                <Input label={"Votre nom"} placeholder={"Ex : Jon Jony"}
                                       onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className={"mb-4"}>
                                <Input label={"Votre email"} placeholder={"Ex : jon-jony13@gmail.com"}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={"mb-4"}>
                                <Input label={"Votre adresse"} placeholder={"Ex : 12 rue des champignons, 13002 Marseille"}
                                       onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className={"mb-4"}>
                                <Input label={"Votre date de naissance"} type={"date"} placeholder={"Ex : 28/01/1995"}
                                       onChange={(e) => setBirthDate(e.target.value)}
                                />
                            </div>

                            <div className={"mb-4"}>
                                <OneFieldPassword onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className={"mb-4"}>
                                <OneFieldPassword label={"Confirmez votre mot de passe"}
                                      onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className={"col-span-2"}>
                                <Alert variant="outlined" icon={<IconSolid />}>
                                    <Typography className="font-medium">
                                       Votre mot de passe doit être conforme a ces règles:
                                    </Typography>
                                    <ul className="mt-2 ml-2 list-inside list-disc">
                                        <li>Au moins 10 caractères.&nbsp;
                                            {!passwordLength ?
                                                <FontAwesomeIcon icon={faCircleXmark} style={{color: "#e01b24",}} />
                                                : <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{color: "#10c400",}}
                                                />
                                            }
                                        </li>
                                        <li>
                                            Une minuscule, une majuscule.&nbsp;
                                            {!passwordLowUp ?
                                                <FontAwesomeIcon icon={faCircleXmark} style={{color: "#e01b24",}} />
                                                : <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{color: "#10c400",}}
                                                />
                                            }
                                        </li>
                                        <li>Et utiliser ces symboles : ! @ # ? &nbsp;
                                            {!passwordSymb ?
                                                <FontAwesomeIcon icon={faCircleXmark} style={{color: "#e01b24",}} />
                                                : <FontAwesomeIcon icon="fa-solid fa-circle-check" style={{color: "#10c400",}}
                                                />
                                            }
                                        </li>
                                    </ul>
                                </Alert>
                            </div>

                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className={"col-span-3"}></div>
        </div>
        );
}

export default Register;