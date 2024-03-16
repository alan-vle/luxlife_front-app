import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Select,
    Option,
    Typography
} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCar, faClock, faLocationDot, faPenToSquare, faPlus, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useRef, useState} from "react";
import {IsAdmin, IsDirector} from "@/utils/CurrentUser.js";
import {addCar, getAllManufacturers} from "@/service/api/CarsService.jsx";
import {token} from "@/utils/auth.js";
import {jwtDecode} from "jwt-decode";
import {getAllAgencies} from "@/service/api/AgenciesService.jsx";
import {errorNotif} from "@/utils/Notif.js";
const apiUrl = import.meta.env.VITE_API_URL;

function Car({
    displayAgency = false,
    choseMode,
    manufacturer,
    model,
    contentUrl,
    kilometers,
    status,
    agency,
    uuid
}) {
    return(
        <div className={"mr-4 shadow flex flex-col col-span-2 p-8 w-96 max-w-96 mb-8"}>
            <div className={"flex justify-center"}>
                <img src={`${apiUrl}/${contentUrl}`} className={"w-[300px] max-w-[300px] h-[169px] max-h-[169px]"} alt={""}/>
            </div>

            <Typography variant={"h4"} className={"font-bold mt-8"}>
                {manufacturer.name} {model} <br />
                {kilometers} km
            </Typography>
            {displayAgency &&
                <Typography variant={"paragraph"}>
                    <span><FontAwesomeIcon icon={faLocationDot} /> Agence de {agency.city}</span> <br />
                    <span><FontAwesomeIcon icon={faClock} /> {agency.isOpen ? 'Ouverte' : 'Fermée'}</span>
                </Typography>
            }
            <Typography variant={"paragraph"} as={"p"}>{status}</Typography>
            <div className={"flex justify-end"}>
                {choseMode ? (<Button type={"button"} onClick={() => alert(uuid)}>Choisir</Button>)
                    : (
                        <Button type={"button"} variant={"text"} onClick={() => alert(uuid)}>
                            <FontAwesomeIcon icon={faPenToSquare} size={"2xl"} style={{color: "#e01b24"}} />
                        </Button>
                    )
                }
            </div>
        </div>

    );
}

const AddCar = ({
    setReload
}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(IsDirector() || IsAdmin() ? !open : false);
    const [model, setModel] = useState(null)
    const [km, setKm] = useState(null)
    const [status, setStatus] = useState(null)
    const [pricePerKm, setPricePerKm] = useState(null)
    const [carImage, setCarImage] = useState(null)
    const [allManufacturers, setAllManufacturers] = useState(null)
    const [selectedManufacturer, setSelectedManufacturer] = useState(null)
    const [allAgencies, setAllAgencies] = useState(null)
    const [selectedAgency, setSelectedAgency] = useState(null)
    const formRef = useRef(null)

    useEffect(() => {
        fetchAllManufacturers().then(result => setAllManufacturers(result))

        fetchAllAgencies().then(result => setAllAgencies(result))
    }, [])

    async function fetchAllManufacturers() {
        return await getAllManufacturers()
    }

    async function fetchAllAgencies() {
        return await getAllAgencies()
    }
    const submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(model && km && pricePerKm && carImage && selectedManufacturer && selectedAgency) {
            const carFormData = new FormData();

            carFormData.append('agency', `/agencies/${selectedAgency}`);
            carFormData.append('manufacturer', `/manufacturers/${selectedManufacturer}`);
            carFormData.append('status', status)
            carFormData.append('model', model);
            carFormData.append('kilometers', km);
            carFormData.append('pricePerKilometer', pricePerKm);
            carFormData.append('file', carImage);

            addCar(carFormData).then(result => {
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
                <FontAwesomeIcon icon={faCar} size={"lg"} />
                <FontAwesomeIcon icon={faPlus} className={"pb-2"}/>
            </Button>
            <Dialog open={open} size={"md"} handler={handleOpen}>
                <DialogBody>
                    <form onSubmit={submitHandler} ref={formRef}>
                        <div className={"grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8 xl:grid-cols-2 2xl:grid-cols-2 pl-8 mb-8 p-8"}>
                            <div>
                                <Select variant="outlined" label="Agence" value={selectedAgency} onChange={(value => setSelectedAgency(value))}>
                                    {allAgencies && (
                                        allAgencies.map((agency, index) => (
                                            <Option key={index} value={agency.uuid} name={agency.city}>{agency.city} {agency.zipCode}</Option>
                                        ))
                                    )}
                                </Select>
                            </div>
                            <div>
                                <Select variant="outlined" label="Fabriquant" value={selectedManufacturer} onChange={(value => setSelectedManufacturer(value))}>
                                    {allManufacturers && (
                                        allManufacturers.map((manufacturer, index) => (
                                            <Option key={index} value={manufacturer.uuid} name={manufacturer.name}>{manufacturer.name}</Option>
                                        ))
                                    )}
                                </Select>
                            </div>
                            <div>
                                <Select variant={"outlined"} label={"Statut"} value={status} onChange={(value) => setStatus(value)}>
                                    <Option value={0}>Réservée</Option>
                                    <Option value={1}>Louée</Option>
                                    <Option value={2}>Disponible</Option>
                                    <Option value={3}>Problème</Option>
                                </Select>
                            </div>
                            <div>
                                <Input label={"Modèle"} placeholder={"Audi RS6"} type={"text"} onChange={(e) => setModel(e.target.value)}/>
                            </div>
                            <div className={"gap-4"}>
                                Max 50 000
                                <div className={"mt-4 mb-4"}>
                                    <Input label={"Kilomètres"} placeholder={"250 km"} type={"number"} onChange={(e) => setKm(e.target.value)} value={km}/>
                                </div>
                                <div>
                                    <Input label={"Kilomètres"} placeholder={"250 km"} type={"range"} min={0} max={50000} onChange={(e) => setKm(e.target.value)} value={km}/>
                                </div>
                            </div>
                            <div>
                                <Input label={"Prix € par km"} placeholder={"14 €"} type={"text"} onChange={(e) => setPricePerKm(e.target.value)}/>
                            </div>
                            <div>
                                <Input label="Photo" placeholder={"Photo"} type={"file"} onChange={(e) => setCarImage(e.target.files[0])}/>
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
export {Car, AddCar};