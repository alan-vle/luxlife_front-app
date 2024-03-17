import {createContext, useContext, useState} from "react";

const RentalFormContext = createContext(null);

export const RentalFormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        fromAgency: null,
        rentalType: null,
        mileageKilometers: null,
        fromDate: null,
        fromTime: null,
        toAgency: null,
        toDate: null,
        toTime: null,
        car: null
    });

    const [displayCars, setDisplayCars] = useState(false);
    const [formIsEmpty, setFormIsEmpty] = useState(true);

    return (
        <RentalFormContext.Provider value={{ formData, setFormData, displayCars, setDisplayCars, formIsEmpty, setFormIsEmpty }}>
            {children}
        </RentalFormContext.Provider>
    );
};

export const useRentalFormContext = () => useContext(RentalFormContext);