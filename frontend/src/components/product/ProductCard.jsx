import "./ProductCard.css";
import { BadgeCheck } from "lucide-react";

export default function ProductCard({product}) {
  return (
    <div className="product-card-wrapper">
        <div className="product-card-image">
            
        </div>
        <div className="product-card-info">
            <p className="seller-name">
                {product.sellerVerified && (
                    <BadgeCheck size={12} className="verified-icon"/>
                )}
                {product.sellerName}
            </p>
            <p className="product-name">{product.title}</p>
            <h4 className="product-price">{product.price}원</h4>
        </div>
    </div>
  )
}
