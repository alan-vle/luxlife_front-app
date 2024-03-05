const filterUpdater = (key, newValue, setParamsFilter) => {
    setParamsFilter(prevData => ({
        ...prevData,
        [key]: newValue
    }));
};

const filterRemover = (keyToRemove, paramsFilter, setParamsFilter) => {
    const newParamsFilter = {};
    for (const key in paramsFilter) {
        if (key !== keyToRemove) {
            newParamsFilter[key] = paramsFilter[key];
        }
    }

    setParamsFilter(newParamsFilter)
}

export {filterUpdater, filterRemover}