import { useRentalFormContext } from "@/store/RentalFormContext.jsx";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Option,
    Select,
    Typography
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router";
import {hoursGenerator} from "@/utils/Forms/BusinessHours.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyCheck} from "@fortawesome/free-solid-svg-icons";
import {errorNotif} from "@/utils/Notif.js";
import {addRental} from "@/service/api/RentalsService.jsx";
import {IsCustomer} from "@/utils/CurrentUser.js";
import {RegisterService} from "@/service/api/AuthentificationService.jsx";
import {isAuth} from "@/utils/auth.js";
const apiUrl = import.meta.env.VITE_API_URL;

const RentalProcess = () => {
    const { formData, setFormData } = useRentalFormContext();
    const goTo = useNavigate();
    const car = formData.car || null;

    useEffect(() => {
        if (!car) {
            goTo('/not-found');
        }
    }, []);

    function updateFormData(name, value) {
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const submitHandler = (e) => {
        if(!isAuth()) {
            alert('Créer un compte et revenez...')
        } else {
            alert(formData.contract)
            if(
                formData.car && formData.fromAgency && formData.fromDate && formData.fromTime
                && formData.contract && formData.toDate && formData.toTime && formData.mileageKilometers
            ) {
                const rentalData = {
                    car: `/cars/${car.uuid}`,
                    contract: formData.contract,
                    fromDate: `${formData.fromDate} ${formData.fromTime}`,
                    toDate: `${formData.toDate} ${formData.toTime}`,
                    mileageKilometers: parseInt(formData.mileageKilometers, 10),
                }

                const btnValue = e.target.value

                if(btnValue === 'draft') {
                    rentalData['draftRental'] = true
                }

                if(!IsCustomer()) {
                    const newCustomerData = {
                        fullName: 'fullName',
                        email: 'email',
                        phoneNumber: 'phoneNumber',
                        birthDate: 'birthDate',
                        address: 'address'
                    }

                    const [customerUuid, setCustomerUuid] = useState(null)

                    RegisterService(newCustomerData).then(result => setCustomerUuid(result))
                    rentalData['customer'] = `/users/${customerUuid}`
                }
                addRental(rentalData)

                if(IsCustomer()) {
                    goTo('/dashboard')
                }
            } else {
                errorNotif('Le formulaire n\'est pas correctement rempli.')
            }
        }
    }
    return (
        <>
            {car && (
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-1 lg:gap-8 xl:grid-cols-12 2xl:grid-cols-12 gap-2 pl-8 pt-4 mt-28">
                    <div className="xl:col-span-4 2xl:col-span-4 shadow-lg">
                        <Typography as="h5" variant="h5">
                            <span className="p-2 border-b-4 border-black">
                                Informations de départ
                            </span>
                        </Typography>
                        <div className={"flex flex-row flex-wrap gap-4 mt-8 p-4"}>
                            <div>
                                <Input size="md" label="Agence de départ" placeholder={"12 rue de la république"}
                                       className={"required"}
                                       value={`${formData.fromAgency.address}`}
                                       readOnly={true}
                                />
                            </div>
                            <div>
                                <Input size="md" label="Agence de départ" placeholder={"Marseille"}
                                   className={"required"}
                                   value={`${formData.fromAgency.city}`}
                                   readOnly={true}
                                />
                            </div>
                            <div>
                                <Select label="Type de location" onChange={(e) => updateFormData('contract', e)} value={formData.contract}>
                                    <Option value={"0"}>Classique</Option>
                                    <Option value={"1"}>Longue durée</Option>
                                </Select>
                            </div>
                            <div>
                                <Input size="md" label="Kilomètres" placeholder={"100"}
                                   className={"required"}
                                   onChange={(e) => updateFormData('mileageKilometers', e.target.value)}
                                   value={formData.mileageKilometers}
                                />
                            </div>
                            <div>
                                <Input
                                    label="Date de prise en charge" type={"date"}
                                    onChange={(e) => updateFormData('fromDate', e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    value={formData.fromDate}
                                />
                            </div>
                            <div>
                                <Select label="Heure de départ" onChange={(e) => updateFormData('fromTime', e)} value={formData.fromTime}>
                                    {hoursGenerator()}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-4 2xl:col-span-4 shadow-lg">
                        <Typography as="h5" variant="h5">
                            <span className="p-2 border-b-4 border-black">
                                Informations de retour
                            </span>
                        </Typography>
                        <div className={"flex flex-row flex-wrap gap-4 mt-8 p-4"}>
                            {formData.toAgency && (
                                <div>
                                    <Input size="md" label="Agence de retour" placeholder={"Marseille"}
                                       className={"required"}
                                       value={formData.toAgency.city}
                                       readOnly={true}
                                    />
                                </div>
                            )}
                            <div>
                                <Input
                                    label="Date de retour" type={"date"}
                                    onChange={(e) => updateFormData('toDate', e.target.value)}
                                    min={formData.toDate ? formData.toDate : new Date().toISOString().split('T')[0]}
                                    value={formData.toDate}
                                />
                            </div>
                            <div>
                                <Select label="Heure de retour" onChange={(e) => updateFormData('toTime', e)} value={formData.toTime}>
                                    {hoursGenerator()}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-2 2xl:col-span-2">
                        <Card className="mt-6 w-96">
                            <CardHeader color="blue-gray" className="relative h-36">
                                <img src={`${apiUrl}/${car.contentUrl}`} alt={`${car.model} image`} />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {car.manufacturer.name}
                                </Typography>
                                <Typography variant="paragraph" color="blue-gray" className="mb-2 font-semibold">
                                    {car.model}
                                </Typography>
                                <Typography>
                                    {car.kilometers} km
                                </Typography>
                            </CardBody>
                        </Card>
                    </div>
                    <div className={"xl:col-start-2 xl:col-span-5 2xl:col-start-2 2xl:col-span-5 shadow-lg"}>
                        <Typography as="h5" variant="h5">
                            <span className="p-2 border-b-4 border-black">
                                Informations de paiement
                            </span>
                        </Typography>
                        <div className={"flex flex-col flex-wrap gap-4 mt-8 p-4 max-w-fit p-4"}>
                            <div>
                                <Input label={"Nom du titulaire de la carte"} placeholder={"Jon Jony"}/>
                            </div>
                            <div>
                                <Input label={"Numéro de carte"} placeholder={"2222 4444 **** ****"} />
                            </div>
                            <div>
                                <div className={"flex flex-row gap-4"}>
                                    <div>
                                        <Select label={"Date exp"}>
                                            {hoursGenerator()}
                                        </Select>
                                    </div>
                                    <div>
                                        <Input label={"CVV"} placeholder={"***"} />
                                    </div>
                                </div>
                            </div>
                            <div className={"gap-4"}>
                                <Button type={"button"} variant={"gradient"} className={"mr-4"} onClick={submitHandler} value={"real"}>Valider</Button>
                                <Button type={"button"} variant={"outlined"} onClick={submitHandler} value={"draft"}>Sauvegarder</Button>
                            </div>
                        </div>
                    </div>
                    <div className={"xl:col-span-2 2xl:col-span-2"}>
                        <Card className="mt-6 w-96">
                            <CardBody>
                                <FontAwesomeIcon icon={faMoneyCheck} size={"2xl"}/>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                   Tarification
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Typography>Caution : 3000 €</Typography>
                                <Typography>Prix : {car.pricePerKilometer * formData.mileageKilometers} €</Typography>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
}

export default RentalProcess;
