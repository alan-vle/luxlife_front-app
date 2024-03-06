import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCar, faLandmark} from "@fortawesome/free-solid-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
import Agencies from "@/components/Agencies/Agencies.jsx";
import Cars from "@/components/Cars/Cars.jsx";
import Users from "@/components/Users/Users.jsx";
import Agency from "@/components/Agencies/Agency.jsx";
import {useEffect, useState} from "react";
import {token} from "@/utils/auth.js";
import {jwtDecode} from "jwt-decode";
import {getAgency} from "@/service/api/AgenciesService.jsx";

const DirectorArea = () => {
    const [agency, setAgency] = useState(null)
    const agencyUuid = jwtDecode(token).agency.uuid

    useEffect(() => {
        if(null === agency) {
            fetchAgency(agencyUuid).then(result => setAgency(result))
        }
    }, [])

    async function fetchAgency(agencyUuid) {
        return await getAgency(agencyUuid);
    }
    return (
        <Tabs value="agency" className={"w-full p-2 mt-8 ml-8 mb-96"}>
            <TabsHeader className={"flex place-items-center w-fit"}>
                <Tab value={"agency"} className={"w-96"}>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faLandmark} className={"w-5 h-5"}/>
                        Mon agence
                    </div>
                </Tab>
                <Tab value={"cars"} className={"w-96"}>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCar} className={"w-5 h-5"}/>
                        Voitures
                    </div>
                </Tab>
                <Tab value={"users"} className={"w-96"} >
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faUsers} className={"w-5 h-5"}/>
                        Utilisateurs
                    </div>
                </Tab>
            </TabsHeader>
            <TabsBody className={"pl-8"}>
                <TabPanel value={'agency'}>
                    {agency && <Agency {...agency} tdMode={false} />}
                </TabPanel>
                <TabPanel value={'cars'}>
                    <Cars choseMode={false} agency={agencyUuid} displayAgencies={false}/>
                </TabPanel>
                <TabPanel value={'users'}>
                    <Users agency={agencyUuid}/>
                </TabPanel>
            </TabsBody>
        </Tabs>
    )
}

export default DirectorArea;