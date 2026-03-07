import { IoMdAdd } from "react-icons/io";
import { PiCoffeeDuotone } from "react-icons/pi";
import {useNavigate} from "react-router";
import { CiLogin } from "react-icons/ci";

const Navbar = ({page}) => {
    const navigate = useNavigate();

    return <nav className="px-5 py-2 z-10 bg-white/10 backdrop-blur-sm lg:w-[80%] w-[90%] rounded-lg justify-between fixed top-3 left-1/2 -translate-x-1/2 flex items-center">

        <p className="text-2xl font-semibold tracking-wider cursor-pointer">Insta</p>

        <div className="flex items-center justify-center lg:gap-3 gap-1">
            <button 
            onClick={() => navigate("/login")}
            className="px-4 py-0.5 rounded-md bg-green-900 cursor-pointer flex items-center lg:gap-1 gap-0.5">
                <CiLogin size={18} />
                <p>Login</p>
            </button>
        
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
        </div>
    </nav>
}

export default Navbar;