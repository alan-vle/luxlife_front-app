import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography, CardBody, Alert,
} from "@material-tailwind/react";
import {OneFieldPassword, PasswordTooltips} from "@/utils/Forms/Password.jsx";
import {useState} from "react";
import {RegisterService} from "@/service/api/AuthentificationService.jsx";
import "./Register.css"
import {useNavigate} from "react-router";
import {
    addressValidator, birthDateValidator, confirmPasswordValidator, emailValidator,
    fullNameValidator, passwordValidator,
    phoneNumberValidator
} from "@/utils/Forms/Validator/Validator.jsx";
import {errorNotif} from "@/utils/Notif.js";

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



export function Register() {
    const [fullName, setFullName] = useState(null);
    const [fullNameIsValid, setFullNameIsValid] = useState(false);
    const [fullNameIsNotValid, setFullNameIsNotValid] = useState(false);
    const [email, setEmail] = useState(null);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [emailIsNotValid, setEmailIsNotValid] = useState(false);
    const [address, setAddress] = useState(null);
    const [addressIsValid, setAddressIsValid] = useState(false);
    const [addressIsNotValid, setAddressIsNotValid] = useState(false);
    const [birthDate, setBirthDate] = useState(null);
    const [requiredAge, setRequiredAge] = useState(null)
    const [birthDateIsValid, setBirthDateIsValid] = useState(false);
    const [birthDateIsNotValid, setBirthDateIsNotValid] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);
    const [phoneNumberIsNotValid, setPhoneNumberIsNotValid] = useState(false);
    const [password, setPassword] = useState(null);
    const [passwordIsValid, setPasswordIsValid] = useState(false)
    const [passwordIsNotValid, setPasswordIsNotValid] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false)
    const [confirmPasswordIsNotValid, setConfirmPasswordIsNotValid] = useState(false)
    const [visiblePasswordTooltips, setVisiblePasswordTooltips] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);
    const [passwordLowUp, setPasswordLowUp] = useState(false);
    const [passwordNumber, setPasswordNumber] = useState(false);
    const [passwordSymbol, setPasswordSymbol] = useState(false);
    const goTo = useNavigate()
    const fullNameHandler = (e) => {
        fullNameValidator(e, setFullName, setFullNameIsValid, setFullNameIsNotValid)
    };

    const emailHandler = (e) => {
        emailValidator(e, setEmail, setEmailIsValid, setEmailIsNotValid)
    }

    const addressHandler = (e) => {
        addressValidator(e, setAddress, setAddressIsValid, setAddressIsNotValid)
    }

    const phoneNumberHandler = (e) => {
        phoneNumberValidator(e, setPhoneNumber, setPhoneNumberIsValid, setPhoneNumberIsNotValid)
    }
    const passwordHandler = (e) => {
        passwordValidator(
            e, setPassword, setPasswordIsValid, setPasswordIsNotValid,
            setPasswordLength, setPasswordLowUp, setPasswordNumber, setPasswordSymbol
        )
    }

    const confirmPasswordHandler = (e) => {
       confirmPasswordValidator(
           e, password, passwordIsValid, setConfirmPassword,
           setConfirmPasswordIsValid, setConfirmPasswordIsNotValid
       )
    }

    const birthDateHandler = (e) => {
        birthDateValidator(e, setBirthDate, setBirthDateIsValid, setBirthDateIsNotValid, setRequiredAge)
    }

    const submitHandler = () => {
        if(fullNameIsValid && emailIsValid && addressIsValid && phoneNumberIsValid && passwordIsValid && confirmPasswordIsValid && birthDateIsValid) {
            const registerData = {
                fullName: fullName,
                email: email,
                address: address,
                birthDate: new Date(convertStringToDateIso(birthDate)),
                plainPassword: password,
                phoneNumber: phoneNumber
            }

            RegisterService(registerData, goTo)
        } else {
           errorNotif('Remplissez le formulaire correctement.')
        }
    }

    return (
        <div className={"grid grid-cols-12 mt-28 mb-28"}>
            <div className={"col-span-3"}></div>
            <div className={"col-span-6 flex justify-center w-full h-auto"}>
                <Card>
                    <CardBody>
                        <Typography className={"text-black font-extrabold text-[40px]"}>Rejoignez nous en devenant client !</Typography>
                        <div className={"grid grid-cols-2 gap-2 mt-8 placeholder:text-slate-400"}>
                            <div className={"mb-4 "}>
                                <Input label={"Nom"} placeholder={"Ex : Jon Jony"}
                                   onChange={fullNameHandler}
                                   success={fullNameIsValid}
                                   error={fullNameIsNotValid}
                                />
                            </div>
                            <div className={"mb-4"}>
                                <Input label={"Email"} placeholder={"Ex : jon-jony13@gmail.com"}
                                   onChange={emailHandler}
                                   success={emailIsValid}
                                   error={emailIsNotValid}
                                />
                            </div>
                            <div className={"mb-4"}>
                                <Input label={"Adresse"} placeholder={"Ex : 12 rue des champignons, 13002 Marseille"}
                                   onChange={addressHandler}
                                   success={addressIsValid}
                                   error={addressIsNotValid}
                                />
                            </div>
                            <div className={"mb-4"}>
                                <Input label={"Téléphone"} placeholder={"Ex : 0787652345"}
                                   onChange={phoneNumberHandler}
                                   success={phoneNumberIsValid}
                                   error={phoneNumberIsNotValid}
                                   maxLength={10}
                                />
                            </div>
                            <div className={"mb-4"}>
                                <OneFieldPassword
                                    onChange={passwordHandler}
                                    onFocus={() => setVisiblePasswordTooltips(true)}
                                    onBlur={() => setVisiblePasswordTooltips(false)}
                                    success={passwordIsValid}
                                    error={passwordIsNotValid}
                                />
                            </div>
                            <div className={"mb-4"}>
                                <OneFieldPassword label={"Confirmez votre mot de passe"}
                                    onChange={confirmPasswordHandler}
                                    success={confirmPasswordIsValid}
                                    error={confirmPasswordIsNotValid}
                                />
                            </div>
                            {visiblePasswordTooltips &&
                                <PasswordTooltips
                                    passwordLength={passwordLength}
                                    passwordLowUp={passwordLowUp}
                                    passwordNumber={passwordNumber}
                                    passwordSymbol={passwordSymbol}
                                />
                            }
                            <div className={"mb-4"}>
                                {false === requiredAge && (<Typography variant={"h3"} color={"red"}>Vous devez avoir 18 ans !</Typography>)}
                                <Input label={"Votre date de naissance"} type={"date"} placeholder={"Ex : 28/01/1995"}
                                       onChange={birthDateHandler}
                                       success={birthDateIsValid}
                                       error={birthDateIsNotValid}
                                />
                            </div>
                        </div>
                        <div className={"col-span-2 flex place-content-center mt-2"}>
                            <Button type={"button"} onClick={submitHandler}>S'inscrire</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className={"col-span-3"}></div>
        </div>
        );
}

function convertStringToDateIso(birthDate) {
    const parts = birthDate.split('/');
    return parts[2] + '-' + parts[1] + '-' + parts[0];
}


export default Register;