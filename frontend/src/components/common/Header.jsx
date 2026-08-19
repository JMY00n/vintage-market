import "./Header.css";
import { Search, Bell, LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("user");

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    }

    return (
        <div className="home-header">
            <h3 onClick={() => navigate("/")}>Vintage market</h3>
            <div className="header-icons">
                {!isLoggedIn ? (
                    <LogIn size={20} onClick={() => navigate("/login")} />
                ) : (
                    <LogOut size={20} onClick={handleLogout}/>
                )}
                <Search size={20} onClick={() => navigate("/search")} />
                <Bell size={20}/>
            </div>
        </div>
    )
}

export default Header;