import "./Header.css";
import { Search, Bell } from "lucide-react";

function Header() {
    return (
        <div className="home-header">
            <h3>Vintage market</h3>
            <div className="header-icons">
                <Search size={20}/>
                <Bell size={20}/>
            </div>
        </div>
    )
}

export default Header;