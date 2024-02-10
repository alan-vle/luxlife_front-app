import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography, CardBody, Alert,
} from "@material-tailwind/react";
import {OneFieldPassword} from "@/utils/Password.jsx";
import {useRef, useState} from "react";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import {RegisterService} from "@/service/AuthentificationService.jsx";
import "./Register.css"

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
    const [passwordSymbol, setPasswordSymbol] = useState(false);

    const fullNameHandler = (e) => {
        fullNameValidator(e, setFullName, setFullNameIsValid, setFullNameIsNotValid)
    }
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
            setPasswordLength, setPasswordLowUp, setPasswordSymbol
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
                birthDate: birthDate,
                plainPassword: password,
                phoneNumber: phoneNumber
            }

            RegisterService(registerData)
        } else {
            toast.error("Remplissez le formulaire correctement.", {
                position: "top-center"
            });
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
                            {visiblePasswordTooltips && (
                                <div className={"col-span-2 mb-2"}>
                                    <Alert variant="outlined" icon={<IconSolid />}>
                                        <Typography className="font-medium">
                                            Votre mot de passe doit être conforme a ces règles:
                                        </Typography>
                                        <ul className="mt-2 ml-2 list-inside list-disc">
                                            <li>Au moins 10 caractères.&nbsp;
                                                {!passwordLength ?
                                                    <FontAwesomeIcon icon={faCircleXmark} style={{color: "#e01b24",}} />
                                                    : <FontAwesomeIcon icon={faCircleCheck}  style={{color: "#10c400",}} />
                                                }
                                            </li>
                                            <li>
                                                Une minuscule, une majuscule.&nbsp;
                                                {!passwordLowUp ?
                                                    <FontAwesomeIcon icon={faCircleXmark} style={{color: "#e01b24",}} />
                                                    : <FontAwesomeIcon icon={faCircleCheck} style={{color: "#10c400",}}/>
                                                }
                                            </li>
                                            <li>Et utiliser au moins 2 de ces symboles : ! @ # ? &nbsp;
                                                {!passwordSymbol ?
                                                    <FontAwesomeIcon icon={faCircleXmark} style={{color: "#e01b24",}} />
                                                    : <FontAwesomeIcon icon={faCircleCheck}  style={{color: "#10c400",}}/>
                                                }
                                            </li>
                                        </ul>
                                    </Alert>
                                </div>
                            )}
                            <div className={"mb-4"}>
                                {false === requiredAge && (<Typography as={"h3"} color={"red"}>Vous devez avoir 18 ans !</Typography>)}
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

function fullNameValidator(e, setFullName, setFullNameIsValid, setFullNameIsNotValid) {
    const fullNameValue = e.target.value
    const frFullNameRegex = /^[a-zA-ZÀ-ÿ\-\' ]+$/;

    if(fullNameValue.length >= 2 && frFullNameRegex.test(fullNameValue)) {
        setFullName(fullNameValue)
        setFullNameIsValid(true)
        setFullNameIsNotValid(false)
    } else {
        setFullName(null)
        setFullNameIsValid(false)
        setFullNameIsNotValid(true)
    }
}

export function emailValidator(e, setEmail, setEmailIsValid, setEmailIsNotValid) {
    const emailValue = e.target.value
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailRegex.test(emailValue)) {
        setEmail(emailValue)
        setEmailIsValid(true)
        setEmailIsNotValid(false)
    } else {
        setEmail(null)
        setEmailIsValid(false)
        setEmailIsNotValid(true)
    }
}

function addressValidator(e, setAddress, setAddressIsValid, setAddressIsNotValid) {
    const addressValue = e.target.value
    const addressRegex = /^[0-9]+(?:[ ,.-][a-zA-ZÀ-ÿ0-9]+)+ (?:[0-9]{5}(?:-[0-9]{4})?|(?:[0-9]{5}(?:-[0-9]{4})? [a-zA-ZÀ-ÿ0-9]+))$/;
    if(addressRegex.test(addressValue)) {
        setAddress(addressValue)
        setAddressIsValid(true)
        setAddressIsNotValid(false)
    } else {
        setAddress(null)
        setAddressIsValid(false)
        setAddressIsNotValid(true)
    }
}

function passwordValidator(e, setPassword, setPasswordIsValid, setPasswordIsNotValid, setPasswordLength, setPasswordLowUp, setPasswordSymbol) {
    const passwordValue = e.target.value
    const isCorrectLength = has10Carac(passwordValue, setPasswordLength)
    const isLowerAndUpper = hasLowerAndUpperCarac(passwordValue, setPasswordLowUp)
    const isSymbol = containsSpecialSymbols(passwordValue, setPasswordSymbol)

    if(isCorrectLength && isLowerAndUpper && isSymbol) {
        setPassword(passwordValue)
        setPasswordIsValid(true)
        setPasswordIsNotValid(false)
    } else {
        setPassword(passwordValue)
        setPasswordIsValid(false)
        setPasswordIsNotValid(true)
    }
}

function phoneNumberValidator(e, setPhoneNumber, setPhoneNumberIsValid, setPhoneNumberIsNotValid) {
    const phoneValue = e.target.value
    const field = e.target
    const phoneRegex = /^(0|\+33|\+330|0033)[67]\d{0,8}$/;

    if (phoneValue.startsWith('+330')){
        field.maxLength = 13;
    } else if(phoneValue.startsWith('0')) {
        field.maxLength = 10;
    }

    if(phoneRegex.test(phoneValue)) {
        setPhoneNumber(phoneValue.replace(/^(0|\+330|0033)/, ''))
        setPhoneNumberIsValid(true)
        setPhoneNumberIsNotValid(false)
    } else {
        setPhoneNumber(null)
        setPhoneNumberIsValid(false)
        setPhoneNumberIsNotValid(true)
    }
}

function confirmPasswordValidator(e, password, passwordIsValid, setConfirmPassword, setConfirmPasswordIsValid, setConfirmPasswordIsNotValid) {
    const confirmPasswordValue = e.target.value

    if(confirmPasswordValue === password && passwordIsValid) {
        setConfirmPassword(confirmPasswordValue)
        setConfirmPasswordIsValid(true)
        setConfirmPasswordIsNotValid(false)
    } else {
        setConfirmPassword(null)
        setConfirmPasswordIsValid(false)
        setConfirmPasswordIsNotValid(true)
    }
}

function birthDateValidator(e, setBirthDate, setBirthDateIsValid, setBirthDateIsNotValid, setRequiredAge) {
    const birthDateValue = new Date(e.target.value);

    if (isNaN(birthDateValue.getTime())) {
        setBirthDate(null)
        setBirthDateIsValid(false)
        setBirthDateIsNotValid(true)
        setRequiredAge(false)
        return;
    }
    const currentDate = new Date()
    const requiredAge = currentDate.setFullYear(currentDate.getFullYear() - 18);

    if(birthDateValue <= requiredAge) {
        setBirthDate(birthDateValue.toLocaleDateString())
        setBirthDateIsValid(true)
        setBirthDateIsNotValid(false)
        setRequiredAge(true)
    } else {
        setBirthDate(null)
        setBirthDateIsValid(false)
        setBirthDateIsNotValid(true)
        setRequiredAge(false)
    }
}

function has10Carac(passwordValue, setPasswordLength) {
    if(passwordValue.length >= 10) {
        setPasswordLength(true)

        return true;
    } else {
        setPasswordLength(false)

        return false;
    }
}
function hasLowerAndUpperCarac(passwordValue, setPasswordLowUp) {
    const lowerCaracRegex = /[A-Z]/;
    const UpperCaracRegex = /[a-z]/;

    if(lowerCaracRegex.test(passwordValue) && UpperCaracRegex.test(passwordValue)) {
        setPasswordLowUp(true)

        return true;
    } else {
        setPasswordLowUp(false)

        return false;
    }
}


function containsSpecialSymbols(passwordValue, setPasswordSymbol) {
    const symbolsRegex = /[!@#?]/g;
    const symbolsMatch = passwordValue.match(symbolsRegex);

    if (symbolsMatch && symbolsMatch.length >= 2) {
        setPasswordSymbol(true);
        return true;
    } else {
        setPasswordSymbol(false);
        return false;
    }
}
export default Register;