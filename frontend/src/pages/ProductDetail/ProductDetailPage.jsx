import "../../styles/global.css";
import "./ProductDetailPage.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getProduct, updateProductStatus } from "../../api/productApi";
import DetailHeader from "../../components/common/DetailHeader";
import ProductImageSlider from "../../components/product/ProductImageSlider";
import SellerInfo from "../../components/product/SellerInfo";
import DetailBottom from "../../components/common/DetailBottom";
import ErrorModal from "../../components/error/ErrorModal";
import { MenuIcon, MoreHorizontal } from "lucide-react";
import useIsOwner from "../../hook/useIsOwner";
import useClickOutside from "../../hook/useClickOutside";

const STATUS_MAP = {
  ON_SALE: { label: "판매중", className: "status-onsale" },
  RESERVED: { label: "예약됨", className: "status-reserved" },
  SOLD: { label: "판매완료", className: "status-sold" }
}

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const isOwner = useIsOwner(product?.sellerId);
  const [isMenuOpen, setIsMenuOpen] = useState("");

  const categoryRef = useRef(null);

  useClickOutside(categoryRef, () => setIsMenuOpen(false));

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  }

  const handleStatusChange = async (status) => {
    try {
      const response = await updateProductStatus(product.id, status);
      setProduct(response.data);
      setIsMenuOpen(false);
    } catch (err) {
      console.log(err);
      alert("상태 변경에 실패했습니다.");
    }
  };

  useEffect(() => {
    getProduct(id)
      .then((response) => setProduct(response.data))
      .catch((err) => {
        const message = err.response?.data ?? "일시적인 오류가 발생했습니다";
        setError(message);
      });
  }, [id]);
  if (error) return <ErrorModal message={error} onConfrim={() => navigate("/")} />
  if (!product) return <div>상품정보 불러오는 중...</div>

  return (
    <div className="detail-page">
      <div className="detail-page-wrapper">
        <DetailHeader productId={product.id} sellerId={product.sellerId} />
        <ProductImageSlider imageUrls={product.imageUrls} />
        <SellerInfo sellerName={product.sellerName} sellerVerified={product.sellerVerified} />
        <div className="detail-info">
          <h3 className="detail-title">{product.title}</h3>
          <h4>{product.price.toLocaleString()}원</h4>
        </div>
        <div className="detail-category" ref={categoryRef}>
          <button className="detail-category-btn">{product.category}</button>
          <button className={STATUS_MAP[product.status]?.className}>
            {STATUS_MAP[product.status]?.label}
          </button>
          {isOwner && (
            <button className="detail-category-more" onClick={handleMenuToggle}>
              <MoreHorizontal size={20} />
            </button>
          )}
          {isOwner && isMenuOpen && (
            <div className="status-dropdown-menu">
              <button className="on-sale" onClick={() => handleStatusChange('ON_SALE')}>판매중</button>
              <button className="reserved" onClick={() => handleStatusChange('RESERVED')}>예약됨</button>
              <button className="sold" onClick={() => handleStatusChange('SOLD')}>판매완료</button>
            </div>
          )}
        </div>
        <div className="detail-desc">
          <p className="desc-label">상품 설명</p>
          <p className="desc-text">{product.description}</p>
        </div>
        <DetailBottom />
      </div>
    </div>
  )
}

export default ProductDetailPage;
