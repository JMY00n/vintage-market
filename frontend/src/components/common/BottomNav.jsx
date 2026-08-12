import "./BottomNav.css";
import { Home, MessageCircle, Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BottomNav() {
    const navigate = useNavigate();
    return (
        <div className="bottom-wrapper">
            <Home size={25} className="nav-icon" />
            <MessageCircle size={25} className="nav-icon" />
            <Plus size={25} className="nav-icon" />
            <User size={25} className="nav-icon" />
        </div>
    )
}

export default BottomNav;