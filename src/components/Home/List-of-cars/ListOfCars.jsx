import {Card, CardBody} from "@material-tailwind/react";

const ListOfCars = () => {
    return(
       <div className={"grid grid-cols-8 gap-2"}>
           <div><Card><CardBody>HEHE</CardBody></Card></div>
           <div><Card><CardBody>AZBAA</CardBody></Card></div>
           <div><Card><CardBody>aZAZE</CardBody></Card></div>
           <div><Card><CardBody>HEHzzzz</CardBody></Card></div>
           <div><Card><CardBody>Peugeot 208</CardBody></Card></div>
       </div>
    )
}

export default ListOfCars;