import "./DetailHeader.css";
import { MoveLeft, MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DetailHeader() {
    const navigate = useNavigate();
  return (
        <div className="detail-header">
            <MoveLeft size={20} onClick={() => navigate("/")}/>
            <h3>상품상세</h3>
            <MenuIcon size={20}/>
        </div>
  )
}
