import "./ProductCard.css";
import { BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SellerInfo from "./SellerInfo";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    return (
        <div className="product-card-wrapper" onClick={() => navigate(`/products/${product.id}`)}>
            <div className="product-card-image">
                {product.imageUrls && product.imageUrls.length > 0 ? (
                    <img 
                        src={`http://localhost:8080${product.imageUrls[0]}`} 
                        alt={product.title}
                    />
                ) : null}
            </div>
            <div className="product-card-info">
                <SellerInfo sellerName={product.sellerName} sellerVerified={product.sellerVerified} />
                <p className="product-name">{product.title}</p>
                <h4 className="product-price">{product.price.toLocaleString()}원</h4>
            </div>
        </div>
    )
}
