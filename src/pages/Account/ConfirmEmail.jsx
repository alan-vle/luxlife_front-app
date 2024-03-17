import {useNavigate, useParams} from "react-router";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ConfirmEmailService} from "@/service/api/AccountService.jsx";
import Login from "@/pages/Auth/Login.jsx";
import {Button, Card, CardBody, Input, Typography} from "@material-tailwind/react";
import {OneFieldPassword, PasswordTooltips} from "@/utils/Forms/Password.jsx";
import {confirmPasswordValidator, passwordValidator} from "@/utils/Forms/Validator/Validator.jsx";
import {errorNotif} from "@/utils/Notif.js";

const ConfirmEmail = () => {
    const {uuid} = useParams()
    const [queryParameters] = useSearchParams()
    const expires = queryParameters.get('expires')
    const signature = queryParameters.get('signature')
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

    const submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(signature)
        if(uuid && expires && signature && passwordIsValid && confirmPasswordIsValid) {
            const userData = {
                plainPassword: password
            }

            ConfirmEmailService(uuid, expires, signature, userData, goTo)
        } else {
            errorNotif('Remplissez le formulaire correctement.')
        }
    }
    return(
        <div className={"grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 lg:gap-8 xl:grid-cols-12 2xl:grid-cols-12 gap-2 mt-28 mb-28"}>
            <div className={"xl:col-start-5 xl:col-span-4 2xl:col-start-5 2xl:col-span-4 flex justify-center"}>
                <form onSubmit={submitHandler}>
                    <Card>
                        <CardBody>
                            <Typography as={"h3"} variant={"h3"} className={"text-bold"}>Créer votre mot de passe</Typography>
                            <div className={"flex justify-center flex-col p-2 gap-3 max-w-fit"}>
                                <div>
                                    <OneFieldPassword
                                        onChange={passwordHandler}
                                        onFocus={() => setVisiblePasswordTooltips(true)}
                                        onBlur={() => setVisiblePasswordTooltips(false)}
                                        success={passwordIsValid}
                                        error={passwordIsNotValid}
                                    />
                                </div>
                                <div>
                                    <OneFieldPassword label={`Confirmez votre mot de passe`}
                                          onChange={confirmPasswordHandler}
                                          success={confirmPasswordIsValid}
                                          error={confirmPasswordIsNotValid}
                                    />
                                </div>
                                <div>
                                    {visiblePasswordTooltips &&
                                        <PasswordTooltips
                                            passwordLength={passwordLength}
                                            passwordLowUp={passwordLowUp}
                                            passwordNumber={passwordNumber}
                                            passwordSymbol={passwordSymbol}
                                        />
                                    }
                                </div>
                                <div className={"col-span-2 mt-4 flex justify-start"}>
                                    <Button variant={"gradient"} type={"submit"}>Confirmer</Button>
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

export default ConfirmEmail;