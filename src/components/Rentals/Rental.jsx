import {Card, CardBody} from "@material-tailwind/react";

const Rental = ({
    contract
}) => {
    return (
        <Card>
            <CardBody>Type de contract : {contract}</CardBody>
        </Card>
    )
}

export default Rental