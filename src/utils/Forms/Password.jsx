import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {Alert, Button, Input, Typography} from "@material-tailwind/react";

const OneFieldPassword = ({
    label = "Mot de passe",
    ref= null,
    onChange = null,
    onFocus = null,
    onBlur = null,
    success = false,
    error = false
}) => {
    const [eyeVisible, setEyeVisible] = useState(false)

    return(
        <div>
            <div className="relative flex w-full max-w-[24rem]">
                <Input label={label} ref={ref} type={eyeVisible ? "text" : "password"}
                       placeholder={"**********"} onChange={onChange} onFocus={onFocus} onBlur={onBlur}
                       success={success} error={error}
                />
                <Button
                    size="sm"
                    className="!absolute right-1 top-1 rounded"
                    onClick={() => setEyeVisible(!eyeVisible)}
                    variant={"text"}
                >
                    {eyeVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                </Button>
            </div>
            <div className="relative flex w-full max-w-[24rem]">

        </div>
        </div>

    );
}

const PasswordTooltips = ({passwordLength, passwordLowUp, passwordNumber, passwordSymbol}) => {
    return (
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
                    <li>Au moins deux chiffres. &nbsp;
                        {!passwordNumber ?
                            <FontAwesomeIcon icon={faCircleXmark} style={{color: "#e01b24",}} />
                            : <FontAwesomeIcon icon={faCircleCheck}  style={{color: "#10c400",}}/>
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
export {OneFieldPassword, PasswordTooltips};