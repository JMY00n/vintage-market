import "./SellerInfo.css";
import { BadgeCheck } from "lucide-react";

export default function SellerInfo({ sellerName, sellerVerified }) {
    return (
        <p className="seller-info">
            {sellerVerified && (
                <BadgeCheck size={12} className="verified-icon" />
            )}
            {sellerName}
        </p>
    )
}
