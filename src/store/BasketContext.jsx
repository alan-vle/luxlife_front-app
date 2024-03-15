import React, { useState, createContext, } from 'react';

export const BasketContext = createContext(null);
const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState({
        total: retrieveBasket(),
    });
    const [productError, setProductError] = useState( {
        error: null,
    });


    return <BasketContext.Provider value={{ basket, setBasket, productError, setProductError}}>{children}</BasketContext.Provider>;
};

function retrieveBasket() {
    return 0;
}
export default BasketProvider;