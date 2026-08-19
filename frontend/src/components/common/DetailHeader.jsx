import "./DetailHeader.css";
import { MoveLeft, MenuIcon } from "lucide-react";
import { useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../api/productApi";
import useIsOwner from "../../hook/useIsOwner";
import useClickOutside from "../../hook/useClickOutside";

export default function DetailHeader({ productId, sellerId }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isOwner = useIsOwner(sellerId);

  const headerRef = useRef(null);
  useClickOutside(headerRef, () => setIsMenuOpen(false));

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  }

  const handleDelete = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUserId = loggedInUser?.id;

    if (sellerId !== loggedInUserId) {
      console.log(sellerId);
      console.log(loggedInUser.id);
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
    <div className="detail-header" ref={headerRef}>
      <MoveLeft size={20} onClick={() => navigate(-1)} />
      <h3>상품상세</h3>

      {isOwner ? (
        <button onClick={handleMenuToggle}>
          <MenuIcon size={20} />
        </button>
      ) : (
        <div style={{ width: 20 }} />
      )}

      {isMenuOpen && isOwner && (
        <div className="dropdown-menu">
          <button onClick={() => navigate(`/products/${productId}/edit`)}>수정하기</button>
          <button className="dropdown-menu-delete" onClick={handleDelete}>삭제하기</button>
        </div>
      )}
    </div>
  )
}
