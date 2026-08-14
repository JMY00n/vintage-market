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

function ProductDetailPage() {
  const { id } = useParams();
  const [ product, setProduct ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id)
      .then((response) => setProduct(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <div>상품정보 불러오는 중...</div>

  return (
    <div className="detail-page">
      <div className="detail-page-wrapper">
        <DetailHeader />
        <ProductImageSlider />
        <SellerInfo sellerName={product.sellerName} sellerVerified={product.sellerVerified}/>
        <div className="detail-info">
          <h3 className="detail-title">{product.title}</h3>
          <h4>{product.price.toLocaleString()}원</h4>
        </div>
        <div className="detail-category">
          <button className="detail-category-btn">{product.category}</button>
          <button className="detail-sale-btn">판매중</button>
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
