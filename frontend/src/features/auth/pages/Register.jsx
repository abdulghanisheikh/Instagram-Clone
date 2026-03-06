import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router";

const Register = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const { handleRegister, loading } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const {username, email, password} = userData;
    
            const {success, message} = await handleRegister(username, email, password);
            setUserData({
                username: "",
                email: "",
                password: ""
            });

            if(success) {
                navigate("/");
            } else {
                console.log(message);
            }
        }
        catch(err) {
            console.log(err.message);
        }
    }

    if(loading) {
        return <main className="min-h-screen w-screen flex justify-center items-center py-30 px-5 bg-black/95 text-white">
            <h1 className="text-3xl mx-auto">Loading....</h1>
        </main>
    }

    return <main className='min-h-screen w-screen flex flex-col items-center gap-1 py-30 px-5 bg-black/95 text-white'>

        <div className='container flex flex-col items-center p-5 gap-9 rounded-md bg-zinc-900 lg:w-1/3 w-full'>
            <h1 className='text-4xl'>Register</h1>

            <form onSubmit={handleSubmit} className='flex flex-col justify-between gap-3 items-center w-full'>
                <input
                value={userData.username}
                onChange={(e) => setUserData({...userData, [e.target.name]: e.target.value})}
                type="text" name="username" placeholder='Enter username' className='p-2 outline-none border-none bg-zinc-800 w-full rounded-sm' />
                
                <input 
                value={userData.email}
                onChange={(e) => setUserData({...userData, [e.target.name]: e.target.value})}
                type="text" name="email" placeholder='Enter email' className='p-2 outline-none border-none bg-zinc-800 w-full rounded-sm' />
                
                <input
                value={userData.password}
                onChange={(e) => setUserData({...userData, [e.target.name]: e.target.value})} 
                type="password" name="password" placeholder='Enter password' className='p-2 outline-none border-none bg-zinc-800 w-full rounded-sm' />

                <button type="submit" className='hover:bg-blue-500 shadow-md shadow-black/50 hover:shadow-none rounded-sm px-8 py-1 active:scale-95 cursor-pointer mt-10 w-full text-lg bg-blue-600 duration-300 ease-in-out'>Register</button>
            </form>
        </div>

        <p className="text-sm">Already have an account? <Link to="/login"><span className="text-blue-500 font-semibold">Login</span></Link></p>

    </main>
}

export default Register