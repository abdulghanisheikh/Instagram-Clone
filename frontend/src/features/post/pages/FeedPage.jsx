import FollowDetails from "../components/FollowDetails";
import FollowRequests from "../components/FollowRequests";
import Navbar from "../../shared/components/Navbar";
import Feed from "../components/Feed";

const FeedPage = () => {
    return <main className="min-h-screen flex justify-center items-center w-screen bg-black text-white relative">
        <FollowDetails />
        <Feed />
        <FollowRequests />
        <Navbar page="Feed"/>
    </main>
}

export default FeedPage;