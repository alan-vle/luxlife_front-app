import {Button, Typography} from "@material-tailwind/react";
const apiUrl = import.meta.env.VITE_API_URL;

function Car({manufacturer, model, contentUrl, kilometers, uuid}) {
    return(
        <div className={"mr-4 shadow col-span-2 p-8 w-96 max-w-96"}>
            <div className={"flex justify-center"}>
                <img src={`${apiUrl}/${contentUrl}`} className={"w-[300px] max-w-[300px] h-[169px] max-h-[169px]"} alt={""}/>
            </div>

            <Typography as={"h4"} className={"font-bold mt-8"}>
                {manufacturer.name} {model} <br />
                {kilometers} km
            </Typography>

            <div className={"flex justify-end"}>
                <Button type={"button"} onClick={() => alert(uuid)}>Choisir</Button>
            </div>
        </div>

    );
}

export default Car;