import {Button, Card, CardBody, Input, Typography} from "@material-tailwind/react";
import mailboxImage from "@/assets/mailbox.png";

const NewsletterBlock = () => {
    return (
        <Card className="bg-[#cdeae1] rounded-md flex-row">
            <CardBody>
                <div className={"grid grid-cols-3 h-8"}>
                    <div className={"col-span-2"}>
                        <Typography color={"black"}>Restez informé !</Typography>
                        <Typography>Recevez des réductions, des sondages et les nouveautés concernant la société.</Typography>
                    </div>
                    <div className={"flex justify-center items-center"}>
                        <img src={mailboxImage} alt="mailbox image"/>
                </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className={"py-8"}>
                        <Input label={"Entrez votre adresse email"} className={"bg-white"}></Input>
                    </div>
                    <div className={"py-8 ml-4"}>
                        <Button type={"submit"}>S'abonner</Button>
                    </div>

                </div>
            </CardBody>
        </Card>
    );
}

export default NewsletterBlock;