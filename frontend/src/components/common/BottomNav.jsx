import "./BottomNav.css";
import { Home, MessageCircle, Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BottomNav() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("user");

    const handleLoginCheck = () => {
        if (!isLoggedIn) {
            alert("로그인이 필요한 서비스입니다.");
            return;
        }
        navigate("/products/form");
    }

    return (
        <div className="bottom-wrapper">
            <Home size={25} className="nav-icon" onClick={() => navigate("/")} />
            <MessageCircle size={25} className="nav-icon" />
            <Plus size={25} className="nav-icon" onClick={handleLoginCheck} />
            <User size={25} className="nav-icon" />
        </div>
    )
}

export default BottomNav;