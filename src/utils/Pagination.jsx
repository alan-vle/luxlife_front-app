import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function Pagination({pageMax}) {
    const [active, setActive] = React.useState(1);

    const getItemProps = (index) =>
        ({
            variant: active === index ? "filled" : "text",
            color: "gray",
            onClick: () => setActive(index),
        });

    const pagesGenerator = () => {
        const pages = [];
        for (let i = 1; i <= pageMax; i++) {
            pages.push(
                <IconButton key={i} {...getItemProps(i)}>
                    {i}
                </IconButton>
            );
        }
        return pages;
    };

    const next = () => {
        if (active === pageMax) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Précédent
            </Button>
            <div className="flex items-center gap-2">
                {pagesGenerator()}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === 5}
            >
                Suivant
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}



export default Pagination;