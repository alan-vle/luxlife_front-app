import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Dialog,
    DialogBody, DialogFooter, Input, Option,
    Select,
    Typography
} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCar, faClock, faLandmark, faLocationDot, faPenToSquare, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router";
import {IsAdmin, IsCustomer, IsDirector} from "@/utils/CurrentUser.js";
import {isAuth} from "@/utils/auth.js";
import React, {useEffect, useRef, useState} from "react";
import {addCar, getAllManufacturers} from "@/service/api/CarsService.jsx";
import {addAgency, getAllAgencies} from "@/service/api/AgenciesService.jsx";
import {errorNotif} from "@/utils/Notif.js";
import {hoursGenerator} from "@/utils/Forms/BusinessHours.jsx";

const Agency = ({
    address,
    city,
    status,
    openingHours,
    closingHours,
    isOpen,
    totalRentals = null,
    uuid,
    index,
    tdMode
}) => {
    const classes = "p-4 border-b border-blue-gray-50";
    const goTo = useNavigate('')
    return (
        tdMode ? (
            <tr key={index} className={"hover:bg-blue-gray-100"}>
                <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {address}
                    </Typography>
                </td>
                <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {city}
                    </Typography>
                </td>
                <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        {status} <br />
                        {totalRentals}
                    </Typography>
                </td>
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
            :
            <Card className="w-96 mt-8">
                <CardHeader color="blue-gray" className="relative h-56" children={""}></CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        <FontAwesomeIcon icon={faLocationDot} /> {address} {city}
                    </Typography>
                    <Typography>
                        <FontAwesomeIcon icon={faClock} /> {isOpen ? 'Ouverte' : 'Fermée'} <br />
                        Horaires : <br />
                        {openingHours} - {closingHours}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex justify-between">
                    {!isAuth() || IsCustomer() ? (
                        <Button type={"button"}
                            onClick={() => {
                                const fromAgencyProp = {
                                    address: address,
                                    city: city,
                                    uuid: uuid,
                                }

                                goTo('/', {state: fromAgencyProp})
                            }}
                        >
                            Voir les voitures disponibles
                        </Button>
                    ) : ''}
                </CardFooter>
            </Card>
    );
}

const AddAgency = ({setReload}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(IsDirector() || IsAdmin() ? !open : false);
    const [address, setAddress] = useState(null)
    const [city, setCity] = useState(null)
    const [email, setEmail] = useState(null)
    const [openingHours, setOpeningHours] = useState(null)
    const [closingHours, setClosingHours] = useState(null)
    const [status, setStatus] = useState(null)
    const formRef = useRef(null)


    const submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(address && city && email && openingHours && closingHours && status) {
            const agencyData = {
                address: address,
                city: city,
                email: email,
                openingHours: openingHours,
                closingHours: closingHours,
                status: status
            }

            addAgency(agencyData).then(result => {
                if(result) {
                    setReload(true)
                    setOpen(false)
                    formRef.current.reset()
                }
            })
        } else {
            errorNotif('Remplissez le formulaire correctement.')
        }
    }
    return (
        <>
            <Button type={"button"} variant={"gradient"} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faLandmark} size={"lg"} className={"w-5 h-5"}/>
                <FontAwesomeIcon icon={faPlus} className={"pb-2"}/>
            </Button>
            <Dialog open={open} size={"md"} handler={handleOpen}>
                <DialogBody>
                    <form onSubmit={submitHandler} ref={formRef}>
                        <div className={"grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8 xl:grid-cols-2 2xl:grid-cols-2 pl-8 mb-8 p-8"}>
                            <div>
                                <Input label={"Adresse"} placeholder={"2 rue du placebot"} type={"text"} onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div>
                                <Input label={"Ville"} placeholder={"13003 Marseille"} type={"text"} onChange={(e) => setCity(e.target.value)}/>
                            </div>
                            <div>
                                <Input label={"Email"} placeholder={"contact-marseille@luxlife.com"} type={"text"} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <Select label="Heure d'ouverture" onChange={(e) => setOpeningHours(e)}>
                                    {hoursGenerator()}
                                </Select>
                            </div>
                            <div>
                                <Select label="Heure de fermeture" onChange={(e) => setClosingHours(e)}>
                                    {hoursGenerator()}
                                </Select>
                            </div>
                            <div>
                                <Select variant={"outlined"} label={"Statut"} value={status} onChange={(value) => setStatus(value)}>
                                    <Option value={0}>Fermée temporairement</Option>
                                    <Option value={1}>Active</Option>
                                    <Option value={2}>Fermée définitivement</Option>
                                </Select>
                            </div>
                            <div className={"col-span-2"}>
                                <Button type={"submit"}>Ajouter</Button>
                            </div>
                        </div>
                    </form>
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
        </>
    )
}

export {Agency, AddAgency};