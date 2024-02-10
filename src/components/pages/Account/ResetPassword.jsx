import {Alert, Button, Card, CardBody, Input, Typography} from "@material-tailwind/react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router";
import {confirmPasswordValidator, emailValidator, passwordValidator} from "@/components/pages/Auth/Register.jsx";
import {toast} from "react-toastify";
import {ResetPasswordService} from "@/service/AccountService.jsx";
import {isAuth} from "@/utils/auth.js";
import {OneFieldPassword, PasswordTooltips} from "@/utils/Forms/Password.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
    if(isAuth()) {
        sessionStorage.removeItem("token")
    }

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
    const goTo = useNavigate()

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
    const submitHandler = () => {

    }
    return(
        <div className={"grid grid-cols-12 mt-28 mb-[300px]"}>
            <div className={"col-span-4"}></div>
            <div className={"col-span-4"}>
                <Card>
                    <CardBody>
                        <div className={"grid grid-cols-4"}>
                            <div className={"col-span-4 flex justify-center"}>
                                <Typography variant={"h3"}>Modifier votre mot de passe</Typography>
                            </div>
                            <div className={"col-span-4 mb-4 mt-8 flex justify-center"}>
                                <OneFieldPassword
                                    onChange={passwordHandler}
                                    onFocus={() => setVisiblePasswordTooltips(true)}
                                    onBlur={() => setVisiblePasswordTooltips(false)}
                                    success={passwordIsValid}
                                    error={passwordIsNotValid}
                                />
                            </div>
                            <div className={"col-span-4 mb-4 flex justify-center"}>
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
                                    passwordSymbol={passwordSymbol}
                                />
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className={"col-span-4"}></div>

        </div>
    );
}

export default ResetPassword;