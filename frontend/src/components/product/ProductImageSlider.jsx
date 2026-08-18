import React, { useState } from 'react'
import "./ProductImageSlider.css";
import "../../styles/global.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SERVER_URL = "http://localhost:8080";

export default function ProductImageSlider({ imageUrls }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!imageUrls || imageUrls.length === 0) {
    return <div className="product-image empty" />
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="product-image">
      <img src={`${SERVER_URL}${imageUrls[currentIndex]}`}
        alt={`상품 이미지 ${currentIndex + 1}`}
      />
      {imageUrls.length > 1 && (
        <>
          <button className="product-image-btn prev" onClick={handlePrev}>
            <ChevronLeft size={20} />
          </button>
          <button className="product-image-btn next" onClick={handleNext}>
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}
