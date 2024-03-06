import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCar,
    faCartPlus,
    faCirclePlus,
    faFileCircleExclamation,
    faLandmark,
    faRectangleList
} from "@fortawesome/free-solid-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
import Agency from "@/components/Agencies/Agency.jsx";
import Cars from "@/components/Cars/Cars.jsx";
import Users from "@/components/Users/Users.jsx";
import MainBlock from "@/components/parts/MainBlock.jsx";

const CustomerArea = () => {
    return (
        <Tabs value="current-location" className={"w-full ml-8 p-2 mt-8 mb-96"}>
            <TabsHeader className={"flex place-items-center w-fit"}>
                    <Tab value={"current-location"} className={"w-96"}>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faLandmark} className={"w-5 h-5"}/>
                        Location en cours
                    </div>
                </Tab>
                <Tab value={"rentals-history"} className={"w-96"}>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faRectangleList} className={"w-5 h-5"} />
                        Historique des locations
                    </div>
                </Tab>
                <Tab value={"new-rental"} className={"w-96"}>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCirclePlus} className={"w-5 h-5"} />
                        <FontAwesomeIcon icon={faCar} className={"w-5 h-5"}/>
                        <FontAwesomeIcon icon={faCartPlus} className={"w-5 h-5"}/>
                    </div>
                </Tab>
                <Tab value={"complaints"} className={"w-96"}>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faFileCircleExclamation} className={"w-5 h-5"} />
                        Réclamations
                    </div>
                </Tab>
            </TabsHeader>
            <TabsBody className={"pl-8"}>
                <TabPanel value={'current-location'}>
                    <p>Current location</p>
                </TabPanel>
                <TabPanel value={'rentals-history'}>
                    <p>Location history</p>
                </TabPanel>
                <TabPanel value={"new-rental"}>
                    <MainBlock />
                </TabPanel>
                <TabPanel value={"complaints"}>
                    Réclam
                </TabPanel>
            </TabsBody>
        </Tabs>
    )
}

export default CustomerArea;