import {Alert, Button, Card, CardBody, Input, Typography} from "@material-tailwind/react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router";
import {isAuth} from "@/utils/auth.js";
import {OneFieldPassword, PasswordTooltips} from "@/utils/Forms/Password.jsx";
import {confirmPasswordValidator, passwordValidator} from "@/utils/Forms/Validator/Validator.jsx";
import {errorNotif} from "@/utils/Notif.js";
import {ResetPasswordService} from "@/service/api/AccountService.jsx";

const ResetPassword = () => {
    if(isAuth()) {
        sessionStorage.removeItem('auth')
    }

    const {token} = useParams();
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
        e.preventDefault();
        e.stopPropagation();
        
        if(passwordIsValid && confirmPasswordIsValid) {
            if(password !== confirmPassword) {
                errorNotif('Vos mots de passes sont différents !', 'same-password')
            } else {
                ResetPasswordService(token, password, goTo)
            }
        }
    }
    return(
        <div className={"grid grid-cols-12 mt-28 mb-[300px]"}>
            <div className={"col-span-4"}></div>
            <div className={"col-span-4"}>
                <form onSubmit={submitHandler}>
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
                                <div className={"col-span-4 mb-4 flex justify-center"}>
                                    {visiblePasswordTooltips &&
                                        <PasswordTooltips
                                            passwordLength={passwordLength}
                                            passwordLowUp={passwordLowUp}
                                            passwordNumber={passwordNumber}
                                            passwordSymbol={passwordSymbol}
                                        />
                                    }
                                </div>
                                <div className={"col-span-4 flex justify-center"}>
                                    <Button type={"submit"}>Modifier</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </form>
            </div>
            <div className={"col-span-4"}></div>
        </div>
    );
}

export default ResetPassword;