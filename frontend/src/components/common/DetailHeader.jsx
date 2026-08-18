import "./DetailHeader.css";
import { MoveLeft, MenuIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../api/productApi";

export default function DetailHeader({ productId, sellerId }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
      console.log(isMenuOpen);
      setIsMenuOpen((prev) => !prev);
    }

    const handleDelete = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      const loggedInUserId = loggedInUser?.id;

      if (sellerId !== loggedInUserId) {
        console.log(id, loggedInUserId);
        alert("작성자만 삭제 가능합니다.");
        return;
      }

      try {
        await deleteProduct(productId);
      } catch (err) {
        console.log(err);
      }
      
      navigate("/");
    }

  return (
        <div className="detail-header">
            <MoveLeft size={20} onClick={() => navigate("/")}/>
            <h3>상품상세</h3>
            <button onClick={handleMenuToggle}>
              <MenuIcon size={20}/>
            </button>

            {isMenuOpen && (
              <div className="dropdown-menu">
                <button>수정하기</button>
                <button className="dropdown-menu-delete" onClick={handleDelete}>삭제하기</button>
              </div>
            )}
        </div>
  )
}
