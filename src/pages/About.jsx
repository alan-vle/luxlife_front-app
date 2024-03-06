import {Typography} from "@material-tailwind/react";

const About = () => {
    return (
        <div className={"grid grid-cols-12 flex justify-center mt-24 mb-16 bg-gray"}>
            <div className={"md:col-span-3 lg:col-span-3"}></div>
            <div className={"col-span-12 md:col-span-6 lg:col-span-6 shadow-lg rounded-lg p-4 pt-8 font-semibold"}>
                <Typography as={"p"} variant={"paragraph"} className={"mb-8 flex pl-4"}>En deux mots....</Typography>
                <Typography as={"p"} variant={"paragraph"} className={"text-justify font-semibold p-4"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula leo tempor efficitur suscipit. Donec sapien lorem, ullamcorper a dapibus vel, ullamcorper sed ante. Morbi sollicitudin imperdiet velit, vel ultricies risus consectetur eget. Praesent eu lectus vel nisi sollicitudin lobortis ac id felis. In quis felis at est mollis lobortis quis quis mi. Donec sit amet massa sem. Donec tempus eget orci in malesuada. Donec elementum ullamcorper metus, nec porta sem tincidunt vel. Ut eleifend dictum pulvinar. Sed in urna non dolor dignissim venenatis.
                    Sed ac sem porttitor, tempor augue vitae, aliquam risus. Nam dictum ultrices pulvinar. Nunc laoreet ante quis ipsum faucibus pulvinar. Nam id metus nec justo volutpat bibendum in a justo. Nam eu nunc in risus sollicitudin porttitor. Curabitur tincidunt, est ut finibus sodales, quam orci ornare nisi, vel ultrices elit urna sit amet risus. Phasellus feugiat malesuada nisi sed sollicitudin. Curabitur consectetur quam non mi auctor scelerisque. Vestibulum quis arcu quis arcu consectetur gravida sit amet a metus. Donec eget dolor in orci suscipit gravida. Cras lectus odio, posuere eu urna fringilla, suscipit commodo nisl. Mauris ac orci mauris. Quisque sollicitudin pharetra enim non feugiat. Vestibulum sem lorem, egestas non quam et, eleifend pretium libero. Aliquam varius tellus nec est finibus tristique.
                </Typography>
                <div className="flex justify-end mt-8 pr-4">
                    Le directeur de Luxlife
                </div>
            </div>
        </div>
    );
}

export default About;