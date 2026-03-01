import { IoMdAdd } from "react-icons/io";
import { PiCoffeeDuotone } from "react-icons/pi";
import {useNavigate} from "react-router";

const Navbar = ({page}) => {
    const navigate = useNavigate();

    return <nav className="px-5 py-2 z-10 bg-white/10 backdrop-blur-sm lg:w-[80%] w-[90%] rounded-lg justify-between fixed bottom-3 left-1/2 -translate-x-1/2 flex items-center">

        <p className="text-2xl font-semibold tracking-wider cursor-pointer">Insta</p>
        {page === "Feed" ?
        (
            <button onClick={() => navigate("/createPost")} className="px-4 py-0.5 rounded-md bg-blue-950 cursor-pointer flex items-center lg:gap-1 gap-0.5">
                <IoMdAdd />
                <p>New Post</p>
            </button>
        ) :
        (
            <button onClick={() => navigate("/")} className="px-4 py-0.5 rounded-md bg-blue-950 cursor-pointer flex items-center lg:gap-1 gap-0.5">
                <PiCoffeeDuotone />
                <p>Back to Feed</p>
            </button>
        )}
    </nav>
}

export default Navbar;