import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import {faCircleUser} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import PersonalInfoForm from "@/components/Form/PersonalInfoForm.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {token} from "@/utils/auth.js";
import {getUser} from "@/service/api/UsersService.jsx";

const Account = () => {
    const [user, setUser] = useState(null)
    const userUuid = jwtDecode(token).uuid

    useEffect(() => {
        fetchUserData().then(result => setUser(result))
    }, [])

    async function fetchUserData() {
        return await getUser(userUuid)
    }

    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 lg:gap-8 xl:grid-cols-12 2xl:grid-cols-12 mt-24"}>
            <div className={"col-start-3 col-span-8 flex justify-center h-full w-full"}>
                <Tabs value="personal-informations" orientation="vertical" className={"shadow-lg rounded-lg w-full"}>
                    <TabsHeader className="">
                        <Tab value={"personal-informations"} className="place-items-start">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faCircleUser} className={"w-5 h-5"} />
                                Vos informations
                            </div>
                        </Tab>
                        <Tab value={"payment-informations"} className="place-items-start">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faCreditCard} className={"w-5 h-5"} />
                                Informations de paiement
                            </div>
                        </Tab>
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel value={"personal-informations"} className="py-0">
                            <PersonalInfoForm {...user} />
                        </TabPanel>
                        <TabPanel value={"payment-informations"} className="py-0">
                            card
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>

        </div>
    )
}

export default Account;