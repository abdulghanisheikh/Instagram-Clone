import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import FeedPage from "./features/post/pages/FeedPage";
import CreatePost from "./features/post/pages/CreatePost";

const AppRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FeedPage />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createPost" element={<CreatePost />}></Route>
        </Routes>
    </BrowserRouter>
}

export default AppRoutes;