import {useEffect, useState} from "react";
import {getAllUsers} from "@/service/api/UsersService.jsx";
import {Card, Input, Option, Select, Typography} from "@material-tailwind/react";
import DefaultLoader from "@/components/Loader/DefaultLoader.jsx";
import {filterRemover, filterUpdater} from "@/utils/filter/objectFilter.js";
import {User} from "@/components/Users/User.jsx";

const Users = ({
    agency: agencyProp = null
}) => {
    const [users, setUsers] = useState(null)
    const [agency, setAgency] = useState(agencyProp)
    const [paramsFilter, setParamsFilter] = useState(agencyProp ? {'agency': `/agencies/${agencyProp}`} : null)
    const [reload, setReload] = useState(null)
    useEffect(() => {
        fetchUsers().then(result => setUsers(result))
        setReload(false)
    }, [paramsFilter, reload])

    async function fetchUsers() {
        return await getAllUsers(paramsFilter);
    }

    const nameHandler = (e) => {
        const nameValue = e.target.value

        if(nameValue.length >= 2) {
            nameValue.replace(' ', '%20')
            filterUpdater('fullName', nameValue, setParamsFilter)
        } else {
            filterRemover('fullName', paramsFilter, setParamsFilter)
        }
    }

    const customerIdHandler = (e) => {
        const customerIdValue = e.target.value

        if(customerIdValue.length >= 6) {
            filterUpdater('customerId', customerIdValue, setParamsFilter)
        } else {
            filterRemover('customerId', paramsFilter, setParamsFilter)
        }
    }

    const emailHandler = (e) => {
        const emailValue = e.target.value

        if(emailValue.length >= 2) {
            filterUpdater('email', emailValue, setParamsFilter)
        } else {
            filterRemover('email', paramsFilter, setParamsFilter)
        }
    }

    const agencyHandler = (e) => {
        const agencyValue = e.target.value

        if(agencyValue.length >= 2) {
            filterUpdater('agency.city', agencyValue, setParamsFilter)
        } else {
            filterRemover('agency.city', paramsFilter, setParamsFilter)
        }
    }

    const roleHandler = (value) => {
        if("*" !== value) {
            filterUpdater('role', value, setParamsFilter)
        } else {
            filterRemover('role', paramsFilter, setParamsFilter)
        }
    }

    return (
        <Card className="h-full justify-center w-full overflow-scroll">
            <table className="table-auto text-center">
                <thead>
                <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                        >
                            Nom
                            <div className={"flex justify-center w-80"}>
                                <Input
                                    variant="outlined" label="Nom"
                                    placeholder="Jon Johny"
                                    className={"bg-white"}
                                    onChange={nameHandler}
                                />
                            </div>
                        </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                        >
                            N° Client
                            <div className={"flex justify-center w-80"}>
                                <Input
                                    variant="outlined" label="N° Client"
                                    placeholder="6584554"
                                    className={"bg-white w-96"}
                                    onChange={customerIdHandler}
                                />
                            </div>
                        </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                        >
                            Email
                            <div className={"flex justify-center w-80"}>
                                <Input
                                    variant="outlined" label="Email"
                                    placeholder="jon.johny@luxlife.com"
                                    className={"bg-white w-96"}
                                    onChange={emailHandler}
                                />
                            </div>
                        </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                        >
                            Téléphone
                        </Typography>
                    </th>
                    {null === agencyProp && (
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                                Agence
                                <div className={"flex flex-row flex-wrap"}>
                                    {/*<div>*/}
                                    {/*    <Select className={"bg-white"} label="Agence" onChange={roleHandler}>*/}
                                    {/*        <Option value={"*"}>Tous</Option>*/}
                                    {/*        <Option value={"admin"}>Admin</Option>*/}
                                    {/*        <Option value={"director"}>Directeur</Option>*/}
                                    {/*        <Option value={"agent"}>Agent</Option>*/}
                                    {/*        <Option value={"customer"}>Client</Option>*/}
                                    {/*    </Select>*/}
                                    {/*</div>*/}
                                    <div>
                                        <Input
                                            variant="outlined" label="Ville de l'agence"
                                            placeholder="2 rue des cannetons"
                                            className={"bg-white w-96"}
                                            onChange={agencyHandler}
                                        />
                                    </div>
                                </div>
                            </Typography>
                        </th>
                    )}

                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
                </tr>
                </thead>
                <tbody>
                {
                    null === users ? <DefaultLoader /> : users.length === 0 ? (
                        <tr><td className={"text-left p-1 font-semibold"} colSpan={3}>Aucun utilisateur trouvé.</td></tr>
                    ) : (
                        users.map((user, index) => <User key={index} {...user} index={index} displayAgency={!agencyProp} setReload={setReload}/>)
                    )
                }
                </tbody>
            </table>
        </Card>
    )
}

export default Users;