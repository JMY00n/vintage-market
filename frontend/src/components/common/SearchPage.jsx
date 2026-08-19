import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/productApi';
import { MoveLeft, Search, X } from 'lucide-react';
import ProductCard from '../product/ProductCard';
import "./SearchPage.css";
import "../../styles/Home.css";

export default function SearchPage() {
    const [keyword, setKeyWord] = useState("");
    const [products, setProducts] = useState([]);
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!keyword.trim()) return;
        getProducts(null, keyword)
            .then((response) =>  {
                setProducts(response.data);
                setSearched(true);
            })
            .catch((err) => console.log(err));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    const handleClear = () => {
        setKeyWord("");
        setProducts([]);
        setSearched(false);
    };

  return (
    <div className='home-page'>
        <div className='home-wrapper'>
            <div className="search-header">
                <MoveLeft size={20} onClick={() => navigate(-1)}/>
                <div className='search-input-box'>
                    <Search size={18} className='search-input-icon' />
                    <input
                        type="text" 
                        placeholder='상품명을 검색하세요.'
                        value={keyword}
                        onChange={(e) => setKeyWord(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    {keyword && (
                        <X size={16} className='search-clear-icon' onClick={handleClear} />
                    )}
                </div>
            </div>
            
            {searched && products.length === 0 && (
                <div className="search-empty">
                    <p>검색 결과가 없습니다.</p>
                </div>
            )}
            {products.length > 0 && (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}
