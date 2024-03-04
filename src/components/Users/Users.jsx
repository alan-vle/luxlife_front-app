import {useEffect, useState} from "react";
import {getAllCars} from "@/service/api/CarsService.jsx";
import {getAllUsers} from "@/service/api/Users.jsx";
import {Card, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

const Users = ({
    agency: agencyProp = null
}) => {
    const [users, setUsers] = useState(null)
    const [agency, setAgency] = useState(agencyProp)
    const [paramsFilter, setParamsFilter] = useState(agencyProp ? {'agency': `/agencies/${agencyProp}`} : null)

    useEffect(() => {
        fetchUsers().then(result => setUsers(result))
    }, [paramsFilter])

    async function fetchUsers() {
        return await getAllUsers(paramsFilter);
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
                        </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                        >
                            Email
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
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                        >
                            Agence
                        </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
                </tr>
                </thead>
                <tbody>
                {users && users.map((user, index) => {
                    const isLast = index === users.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                    return (
                        <tr key={index}>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {user.fullName}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {user.email}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {user.phoneNumber}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {user.agency ? user.agency.city : 'Client'}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    as="a"
                                    href="#"
                                    variant="small"
                                    color="blue-gray"
                                    className="font-medium"
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} style={{color: "#e01b24"}} />
                                </Typography>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </Card>
    )
}

export default Users;