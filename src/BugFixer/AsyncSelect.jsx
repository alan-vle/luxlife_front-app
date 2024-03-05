import React, { useEffect, useState } from "react";
import { Select, SelectProps } from "@material-tailwind/react";

const AsyncSelect = React.forwardRef((props, ref) => {
    const [key, setKey] = useState("");

    useEffect(() => setKey(getRandomInt(1,18)), [props]);

    return <Select key={key} ref={ref} {...props} />;
});

AsyncSelect.displayName = "AsyncSelect";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default AsyncSelect;