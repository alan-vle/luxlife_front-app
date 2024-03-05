import {Card, Select, Option, Typography, Spinner, Input} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {getAllAgencies} from "@/service/api/AgenciesService.jsx";
import {filterRemover, filterUpdater} from "@/utils/filter/objectFilter.js";
import DefaultLoader from "@/components/Loader/DefaultLoader.jsx";
import Agency from "@/components/Agencies/Agency.jsx";

const Agencies = () => {
    const [agencies, setAgencies] = useState(null)
    const [paramsFilter, setParamsFilter] = useState(null)

    useEffect(() => {
        fetchAgencies().then(result => setAgencies(result));
    }, [paramsFilter]);

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
                            <tr><td className={"text-left p-1 font-semibold"} colSpan={3}>Aucune agence trouvé.</td></tr>
                        ) : (
                            agencies.map((agency, index) => (<Agency {...agency} index={index} tdMode={true} />))
                        )
                }
                </tbody>
            </table>
        </Card>
    );
}

export default Agencies;