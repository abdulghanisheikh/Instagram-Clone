import FollowDetails from "../components/FollowDetails";
import FollowRequests from "../components/FollowRequests";
import Navbar from "../../shared/components/Navbar";
import Feed from "../components/Feed";

const FeedPage = () => {
    return <main className="min-h-screen flex justify-center w-screen bg-black text-white py-5 relative">
        <FollowDetails />
        <Feed />
        <Navbar page="Feed"/>
    </main>
}

export default FeedPage;