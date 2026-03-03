const User = ({user, status}) => {
    
    const {username, profileImage} = user;

    return <li className="flex items-center justify-between text-sm bg-zinc-900 px-5 rounded-md py-0.5">
        <div className="info flex items-center gap-1.5">
            <img src={profileImage} alt="" className="h-9 w-9 p-1 rounded-full" />
            <p>{username}</p>
        </div>

        <button className="border px-2 rounded-md py-0.5 cursor-pointer">Unfollow</button>
    </li>
}

export default User;