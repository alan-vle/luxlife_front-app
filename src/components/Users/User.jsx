import {Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

const User = ({
    fullName,
    email,
    phoneNumber,
    agency,
    displayAgency = true,
    index
}) => {
    const classes = "p-4 border-b border-blue-gray-50";

    return (
        <tr key={index} className={"hover:bg-blue-gray-100"}>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {fullName}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {email}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    0{phoneNumber}
                </Typography>
            </td>
            {displayAgency && (
                <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {agency ? agency.city : 'Client'}
                    </Typography>
                </td>
            )}
            <td className={classes}>
                <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                >
                    <FontAwesomeIcon icon={faPenToSquare} style={{color: "#e01b24"}} />
                </Typography>
            </td>
        </tr>
    )
}

const AddUser = () => {

}
export {User, AddUser};