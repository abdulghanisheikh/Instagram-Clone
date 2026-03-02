const FollowDetails = () => {
  return <div className="h-screen flex flex-col items-center px-3 mt-15 w-120 fixed top-1 left-3">

    <div className="Followers flex flex-col w-full h-1/2 gap-2">
        <h1 className="text-xl">Followers</h1>
        <ol className="overflow-y-auto">
            <li className="flex items-center justify-between text-sm bg-zinc-900 px-2 rounded-md">
                <div className="info flex items-center gap-1.5">
                    <img src="https://images.unsplash.com/photo-1772107756927-a3975482b1ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8" className="w-10 h-10 rounded-full p-1" alt="" />
                    <p>username</p>
                </div>

                <button></button>
            </li>
        </ol>
    </div>

    <div className="Following flex flex-col w-full h-1/2 gap-2">
        <h1 className="text-xl">Following</h1>
        <ol className="overflow-y-auto">
            <li className="flex items-center justify-between text-sm bg-zinc-900 px-2 rounded-md">
                <div className="info flex items-center gap-1.5">
                    <img src="https://images.unsplash.com/photo-1772107756927-a3975482b1ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8" className="w-10 h-10 rounded-full p-1" alt="" />
                    <p>username</p>
                </div>

                <button className="border px-2 rounded-md py-0.5 cursor-pointer">Unfollow</button>
            </li>
        </ol>
    </div>
  </div>
}

export default FollowDetails;