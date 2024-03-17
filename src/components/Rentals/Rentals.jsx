import Rental from "@/components/Rentals/Rental.jsx";
import {useEffect, useState} from "react";
import {getAllRentals} from "@/service/api/RentalsService.jsx";

const Rentals = () => {
    const [rentals, setRentals] = useState(null)

    useEffect(() => {
        fetchAllRentals().then(result => setRentals(result))
    }, [])

    async function fetchAllRentals() {
        return await getAllRentals({status: 4});
    }

    return (
        <>
            {rentals && (
                <div className={"grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 2xl:grid-cols-4"}>
                    {rentals.map((rental, index) => (
                        <div key={index}><Rental {...rental} /></div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Rentals;