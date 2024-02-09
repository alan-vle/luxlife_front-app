import Car from "@/components/Cars/Car.jsx";
import ImageAndTextLoader from "@/components/Loader/ImageAndTextLoader.jsx";
import Pagination from "@/utils/Pagination.jsx";

function Cars({cars}) {
    return (
        <div className={"mb-8"}>
            <div className={"grid grid-cols-8 pl-8 mb-8"}>
                {cars !== null && cars.length > 0 ? cars.map(car => <Car {...car} />) : <ImageAndTextLoader />}
            </div>
            <div className={"grid justify-items-center"}>
                <Pagination pageMax={8} />
            </div>
        </div>
    );
}

export default Cars;