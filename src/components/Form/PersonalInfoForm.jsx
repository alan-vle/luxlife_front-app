import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {
    addressValidator, birthDateValidator, confirmPasswordValidator,
    emailValidator,
    fullNameValidator, passwordValidator,
    phoneNumberValidator
} from "@/utils/Forms/Validator/Validator.jsx";
import {RegisterService} from "@/service/api/AuthentificationService.jsx";
import {errorNotif} from "@/utils/Notif.js";
import {Button, Card, CardBody, Input, Typography} from "@material-tailwind/react";
import {OneFieldPassword, PasswordTooltips} from "@/utils/Forms/Password.jsx";
import {patchUser} from "@/service/api/UsersService.jsx";
import {getAllAgencies} from "@/service/api/AgenciesService.jsx";

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

const   PersonalInfoForm = ({
    fullName: fullNameProp = null,
    email: emailProp = null,
    address: addressProp = null,
    birthDate: birthDateProp = null,
    phoneNumber: phoneNumberProp = null,
    agency: agencyProp = null,
    uuid = null,
    createMode = false,
    adminMode = false,
    width = null,
    height = null,
    setUpdateStatusCallback,
    setReload
}) => {
    const [fullName, setFullName] = useState(fullNameProp);
    const [fullNameIsValid, setFullNameIsValid] = useState(!createMode);
    const [fullNameIsNotValid, setFullNameIsNotValid] = useState(false);
    const [email, setEmail] = useState(emailProp);
    const [emailIsValid, setEmailIsValid] = useState(!createMode);
    const [emailIsNotValid, setEmailIsNotValid] = useState(false);
    const [address, setAddress] = useState(addressProp);
    const [addressIsValid, setAddressIsValid] = useState(!createMode);
    const [addressIsNotValid, setAddressIsNotValid] = useState(false);
    const [birthDate, setBirthDate] = useState(birthDateProp);
    const [requiredAge, setRequiredAge] = useState(null)
    const [birthDateIsValid, setBirthDateIsValid] = useState(!createMode);
    const [birthDateIsNotValid, setBirthDateIsNotValid] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(phoneNumberProp);
    const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(!createMode);
    const [phoneNumberIsNotValid, setPhoneNumberIsNotValid] = useState(false);
    const [password, setPassword] = useState(null);
    const [passwordIsValid, setPasswordIsValid] = useState(false)
    const [passwordIsNotValid, setPasswordIsNotValid] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false)
    const [confirmPasswordIsNotValid, setConfirmPasswordIsNotValid] = useState(false)
    const [visiblePasswordTooltips, setVisiblePasswordTooltips] = useState(false);
    const [oldPassword, setOldPassword] = useState(null)
    const [passwordLength, setPasswordLength] = useState(false);
    const [passwordLowUp, setPasswordLowUp] = useState(false);
    const [passwordNumber, setPasswordNumber] = useState(false);
    const [passwordSymbol, setPasswordSymbol] = useState(false);
    const [allAgencies, setAllAgencies] = useState(null)
    const goTo = useNavigate()

    useEffect(() => {
        if(null !== agencyProp) {
            fetchAllAgencies().then(result => setAllAgencies(result))
        }
    }, [])

    async function fetchAllAgencies() {
        return await getAllAgencies();
    }

    const fullNameHandler = (e) => {
        fullNameValidator(e, setFullName, setFullNameIsValid, setFullNameIsNotValid)

        setFullName(e.target.value)
    };

    const emailHandler = (e) => {
        emailValidator(e, setEmail, setEmailIsValid, setEmailIsNotValid)

        setEmail(e.target.value)
    }

    const addressHandler = (e) => {
        addressValidator(e, setAddress, setAddressIsValid, setAddressIsNotValid)

        setAddress(e.target.value)
    }

    const phoneNumberHandler = (e) => {
        phoneNumberValidator(e, setPhoneNumber, setPhoneNumberIsValid, setPhoneNumberIsNotValid)

        setPhoneNumber(e.target.value)
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

        setBirthDate(e.target.value)
    }

    const submitHandler = () => {
        if(fullNameIsValid && emailIsValid && addressIsValid && phoneNumberIsValid && birthDateIsValid) {
            const userData = {
                fullName: !fullName && fullNameProp ? fullNameProp : fullName,
                email: !email && emailProp ? emailProp : email,
                address: !address && addressProp ? addressProp : address,
                birthDate: !birthDate && birthDateProp || (birthDate === birthDateProp) ? birthDateProp : new Date(convertStringToDateIso(birthDate)),
                phoneNumber:  !phoneNumber && phoneNumberProp ? phoneNumberProp : phoneNumber.replace(/0/, '')
            }

            if(createMode) {
                if(false === adminMode && passwordIsValid && confirmPasswordIsValid) {
                    userData['plainPassword'] = password

                    RegisterService(userData, goTo)
                } else {
                    errorNotif('Mots de passes non valides.')
                }
            } else {
                if(false === adminMode && passwordIsValid && confirmPasswordIsValid && oldPassword.length > 0) {
                    userData['plainPassword'] = password
                    userData['oldPassword'] = oldPassword
                }

                patchUser(uuid, userData, setUpdateStatusCallback, setReload)
            }
        } else {
            errorNotif('Remplissez le formulaire correctement.')
        }
    }

    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-12 2xl:grid-cols-12 mt-28 mb-28"}>
            <div className={"col-span-12 flex justify-center w-full h-auto"}>
                <Card>
                    <CardBody>
                        {!adminMode && (
                            <Typography className={"text-black font-extrabold text-2xl"}>
                                {createMode ? 'Rejoignez nous en devenant client !' : 'Modifier vos informations'}
                            </Typography>
                        )}
                        <div className={"grid md:grid-cols-2 lg:grid-cols-2 flex flex-col gap-2 mt-8 placeholder:text-slate-400 w-full"}>
                            <div className={"mb-4 "}>
                                <Input label={"Nom"} placeholder={"Ex : Jon Jony"}
                                       onChange={fullNameHandler}
                                       success={fullNameIsValid}
                                       error={fullNameIsNotValid}
                                       value={fullNameProp && null === fullName? fullNameProp : fullName}
                                />
                            </div>
                            <div className={"mb-4"}>
                                <Input label={"Email"} placeholder={"Ex : jon-jony13@gmail.com"}
                                       onChange={emailHandler}
                                       success={emailIsValid}
                                       error={emailIsNotValid}
                                       value={emailProp && null === email ? emailProp : email}
                                />
                            </div>
                            <div className={"mb-4"}>
                                <Input label={"Téléphone"} placeholder={"Ex : 0787652345"}
                                       onChange={phoneNumberHandler}
                                       success={phoneNumberIsValid}
                                       error={phoneNumberIsNotValid}
                                       maxLength={10}
                                       value={phoneNumberProp && null === phoneNumber ? `0${phoneNumberProp}` : null === phoneNumber || phoneNumber.startsWith("0") ? phoneNumber  : `0${phoneNumber}`}
                                />
                            </div>
                            <div className={"mb-4"}>
                                {false === requiredAge && (<Typography variant={"h3"} color={"red"}>Vous devez avoir 18 ans !</Typography>)}
                                <Input label={"Votre date de naissance"} type={"date"} placeholder={"Ex : 28/01/1995"}
                                       onChange={birthDateHandler}
                                       success={birthDateIsValid}
                                       error={birthDateIsNotValid}
                                       value={birthDateProp && null === birthDate ? birthDateProp.split('T')[0] : birthDate}
                                />
                            </div>
                            {!adminMode && (
                                <>
                                    <div className={"mb-4 w-full"}>
                                        <OneFieldPassword
                                            onChange={passwordHandler}
                                            onFocus={() => setVisiblePasswordTooltips(true)}
                                            onBlur={() => setVisiblePasswordTooltips(false)}
                                            success={passwordIsValid}
                                            error={passwordIsNotValid}
                                        />
                                    </div>
                                    <div className={"mb-4 w-full"}>
                                        <OneFieldPassword label={`Confirmez votre mot de passe`}
                                            onChange={confirmPasswordHandler}
                                            success={confirmPasswordIsValid}
                                            error={confirmPasswordIsNotValid}
                                        />
                                    </div>
                                    {false === createMode && passwordIsValid && (
                                        <div className={"mb-4 w-full"}>
                                            <OneFieldPassword label={"Mot de passe actuel"}
                                              onChange={(e) => setOldPassword(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {visiblePasswordTooltips &&
                                        <PasswordTooltips
                                            passwordLength={passwordLength}
                                            passwordLowUp={passwordLowUp}
                                            passwordNumber={passwordNumber}
                                            passwordSymbol={passwordSymbol}
                                        />
                                    }
                                </>
                            )}
                        </div>
                        <div className={"mb-4"}>
                            <Input label={"Adresse"} placeholder={"Ex : 12 rue des champignons, 13002 Marseille"}
                                   onChange={addressHandler}
                                   success={addressIsValid}
                                   error={addressIsNotValid}
                                   value={addressProp && null === address ? addressProp : address}
                            />
                        </div>
                        <div className={"col-span-2 flex place-content-center mt-2"}>
                            <Button type={"button"} onClick={submitHandler}>{createMode ? 'S\'inscrire' : 'Modifier'}</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className={"col-span-3"}></div>
        </div>
    )
}

function convertStringToDateIso(birthDate) {
    const parts = birthDate.split('/');

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

export default PersonalInfoForm;