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

    return (
        <RentalFormContext.Provider value={{ formData, setFormData}}>
            {children}
        </RentalFormContext.Provider>
    );
};

export const useRentalFormContext = () => useContext(RentalFormContext);