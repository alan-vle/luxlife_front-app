import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import UserModal from "@/components/modal/UserModal.jsx";
import React, {useState} from "react";
import PersonalInfoForm from "@/components/Form/PersonalInfoForm.jsx";

const User = ({
    fullName,
    email,
    phoneNumber,
    birthDate,
    address,
    agency,
    uuid,
    displayAgency = true,
    index,
    setReload
}) => {
    const classes = "p-4 border-b border-blue-gray-50";
    const [open, setOpen] = useState(false);
    const [updateStatusCallback, setUpdateStatusCallback] = useState(null)

    const handleOpen = () => setOpen(!open);
    const user = {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        birthDate: birthDate,
        address: address,
        uuid: uuid
    }
    if(null !== agency) {
        user['agency'] = agency
    }

    return (
        <tr key={index} className={"hover:bg-blue-gray-100"}>
            <Dialog open={open} size={"md"} handler={handleOpen}>
                <DialogHeader>{updateStatusCallback && updateStatusCallback}</DialogHeader>
                <DialogBody>
                    <PersonalInfoForm {...user} adminMode={true} setUpdateStatusCallback={setUpdateStatusCallback} setReload={setReload}/>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Revenir</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <td className={classes}>
                <Typography
                    as={"button"}
                    variant="small"
                    color="blue-gray"
                    className="font-normal hover:text-[#70a5ea]"
                    onClick={handleOpen}
                >
                    {fullName}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    as={"button"}
                    variant="small"
                    color="blue-gray"
                    className="font-normal hover:text-[#70a5ea]"
                    onClick={handleOpen}
                >
                    {email}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    as={"button"}
                    variant="small"
                    color="blue-gray"
                    className="font-normal hover:text-[#70a5ea]"
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