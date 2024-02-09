import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {Button, Input} from "@material-tailwind/react";

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

export {OneFieldPassword};