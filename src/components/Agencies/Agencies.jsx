import {
    Card,
    Select,
    Option,
    Typography,
    Input,
    List,
    Button,
} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {getAllAgencies} from "@/service/api/AgenciesService.jsx";
import {filterRemover, filterUpdater} from "@/utils/filter/objectFilter.js";
import DefaultLoader from "@/components/Loader/DefaultLoader.jsx";
import {AddAgency, Agency} from "@/components/Agencies/Agency.jsx";
import {useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Agencies = () => {
    const [agencies, setAgencies] = useState(null)
    const [paramsFilter, setParamsFilter] = useState(null)
    const [reload, setReload] = useState(null)

    useEffect(() => {
        fetchAgencies().then(result => setAgencies(result));

        setReload(false)
    }, [paramsFilter, reload]);

    async function fetchAgencies() {
        return await getAllAgencies(paramsFilter);
    }

    const statusHandler = (value) => {
        if(value !== '*') {
            filterUpdater('status', value, setParamsFilter)
        } else {
            filterRemover('status', paramsFilter, setParamsFilter)
        }
    }

    const addressCityHandler = (e, key) => {
        const addressCityValue = e.target.value;

        if(addressCityValue.length >= 2) {
            filterUpdater(key, addressCityValue, setParamsFilter)
        } else {
            filterRemover(key, paramsFilter, setParamsFilter)
        }
    }

    return (
        <Card className="h-max] justify-center w-2/4 overflow-scroll">
            <div className={"flex justify-start mb-4"}>
                <AddAgency setReload={setReload} />
            </div>
            <table className="table-auto text-center min-h-[400px]">
                <thead className={"max-h-fit"}>
                <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                        >
                            Adresse <br />
                            <Input
                                variant="outlined" label="Adresse"
                                placeholder="2 rue des cannetons"
                                className={"bg-white w-96"}
                                onChange={(e) => addressCityHandler(e, 'address')}
                            />
                        </Typography>

                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                        >
                            Ville <br />
                            <Input
                                variant="outlined" label="Ville"
                                placeholder="13013 Marseille"
                                className={"bg-white w-96"}
                                onChange={(e) => addressCityHandler(e, 'city')}
                            />
                        </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Select variant="outlined" className={"bg-white"} label="Statut" onChange={statusHandler}>
                            <Option value={"*"}>Tous</Option>
                            <Option value={"1"}>Active</Option>
                            <Option value={"0"}>Fermée temporairement</Option>
                            <Option value={"2"}>Définitivement temporairement</Option>
                        </Select>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
                </tr>
                </thead>
                <tbody>
                {
                    !agencies ? <DefaultLoader /> :
                        0 === agencies.length ? (
                            <tr><td className={"text-left p-1 font-semibold h-[5%]"} colSpan={3}>Aucune agence trouvé.</td></tr>
                        ) : (
                            agencies.map((agency, index) => (<Agency {...agency} index={index} tdMode={true} />))
                        )
                }
                </tbody>
            </table>
        </Card>
    );
}

const ListOfAgencies = () => {
    const [agencies, setAgencies] = useState(null)
    const [paramsFilter, setParamsFilter] = useState(null)
    const [agency, setAgency] = useState(null)
    const [agencyInputValue, setAgencyInputValue] = useState(null)
    const goTo = useNavigate()

    useEffect(() => {
        if(paramsFilter !== null) {
            fetchAgencies().then(result => setAgencies(result));
        } else {
            setAgencies(null)
        }
    }, [paramsFilter]);

    async function fetchAgencies() {
        return await getAllAgencies(paramsFilter);
    }

    const agencyHandler = (e) => {
        const agencyValue = e.target.value;
        setAgencyInputValue(agencyValue)

        if(agencyValue.length >= 2) {
            filterUpdater('city', agencyValue, setParamsFilter)
        } else {
            setParamsFilter(null)
        }
    }
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 lg:gap-8 xl:grid-cols-12 2xl:grid-cols-12 gap-2 mt-24 mb-48 justify-center"}>
            <div className={"xl:col-start-4 xl:col-span-6 shadow-lg rounded-lg p-8 flex flex-wrap justify-between gap-8"}>
                <Card className="w-96 h-fit">
                    <Input
                        label="Rechercher une agence" placeholder={"13400, Aubagne"}
                        onChange={agencyHandler} value={`${agencyInputValue !== null ? agencyInputValue : ''}`}
                    />

                    {agencies && agencies.map((agency, index) => (
                        <List key={index} className={"border border-b-gray"}>
                            <Button type={"button"} variant={"text"} onClick={() => {
                                setAgency(agency)
                                setAgencyInputValue(agency.city)
                                setParamsFilter(null)
                            }}>{agency.city}</Button>
                        </List>
                    ))}
                </Card>
                {agency && (<Agency {...agency} />)}
            </div>
        </div>
    )
}

export {Agencies, ListOfAgencies};