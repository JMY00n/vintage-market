import "../../styles/global.css";
import "./ProductDetailPage.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProduct } from "../../api/productApi";
import DetailHeader from "../../components/common/DetailHeader";
import ProductImageSlider from "../../components/product/ProductImageSlider";
import SellerInfo from "../../components/product/SellerInfo";
import DetailBottom from "../../components/common/DetailBottom";
import ErrorModal from "../../components/error/ErrorModal";

const STATUS_MAP = {
  ON_SALE: { label: "판매중", className: "status-onsale"},
  RESERVED: { label: "예약됨", className: "status-reserved"},
  SOLD: { label: "판매완료", className: "status-sold"}
}

function ProductDetailPage() {
  const { id } = useParams();
  const [ product, setProduct ] = useState(null);
  const [ error, setError ] = useState(null);
  const navigate = useNavigate();

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
        <DetailHeader productId={product.id} sellerId={product.sellerId}/>
        <ProductImageSlider imageUrls={product.imageUrls} />
        <SellerInfo sellerName={product.sellerName} sellerVerified={product.sellerVerified}/>
        <div className="detail-info">
          <h3 className="detail-title">{product.title}</h3>
          <h4>{product.price.toLocaleString()}원</h4>
        </div>
        <div className="detail-category">
          <button className="detail-category-btn">{product.category}</button>
          <button className={STATUS_MAP[product.status]?.className}>
            {STATUS_MAP[product.status]?.label}
          </button>
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
