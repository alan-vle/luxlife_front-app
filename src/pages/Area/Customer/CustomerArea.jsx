import {Select, Option, Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCar,
    faCartPlus,
    faCirclePlus,
    faFileCircleExclamation,
    faLandmark,
    faRectangleList
} from "@fortawesome/free-solid-svg-icons";
import MainBlock from "@/components/parts/MainBlock.jsx";
import Rentals from "@/components/Rentals/Rentals.jsx";
import {useState} from "react";

const CustomerArea = () => {
    const [selectedStatus, setSelectedStatus] = useState(3)

    return (
        <Tabs value="current-location" className={"w-full ml-8 mt-8 mb-96"}>
            <TabsHeader className={"flex place-items-center w-fit flex flex-col md:flex-row lg:flex-row p-2"}>
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
            <TabsBody>
                <TabPanel value={'current-location'} className={"pl-9 pt-8"}>
                    <div className={"flex w-96 mb-4"}>
                        <Select label={"Statut"} onChange={(value) => setSelectedStatus(value)} value={selectedStatus}>
                            <Option value={3}>En cours</Option>
                            <Option value={1}>Reservée</Option>
                            <Option value={2}>En cours de livraison</Option>
                            <Option value={0}>Brouillon</Option>
                        </Select>
                    </div>

                    <div className={"min-h-[250px]"}><Rentals status={selectedStatus} currentRental={true}/></div>
                </TabPanel>
                <TabPanel value={'rentals-history'} className={"pl-9 pt-8"}>
                    <Rentals />
                </TabPanel>
                <TabPanel value={"new-rental"} className={"w-full pt-8"}>
                    <MainBlock />
                </TabPanel>
                <TabPanel value={"complaints"} className={"pl-9 pt-8"}>
                    Réclam
                </TabPanel>
            </TabsBody>
        </Tabs>
    )
}

export default CustomerArea;