import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

function successNotif(
    msg,
    id,
    config = {
        position: "top-center",
        hideProgressBar: true
    },
) {
    config['toastId'] = id;
    toast.success(msg, config)
}

function errorNotif(
    msg = 'Une erreur est survenue, réessayez plus tard.',
    id = 'error',
    config = {
        position: "top-center",
        hideProgressBar: true
    }
)
{
    config['toastId'] = id;
    toast.error(msg, config)
}

// const CustomToastWithLink = ({link, msg, msgInLink}) => {
//     return (
//         <div>
//             {msg}
//             <Link to={link} className={"text-blue"}>{msgInLink}</Link>.
//         </div>
//     )
// };

export {successNotif, errorNotif}