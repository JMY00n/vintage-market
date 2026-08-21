import "../../styles/Home.css";
import "../../styles/global.css";
import Header from "../../components/common/Header";
import Category from "../../components/common/Category";
import ProductCard from "../../components/product/ProductCard";
import BottomNav from "../../components/common/BottomNav";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import FilterBar from "../../components/common/FilterBar";
import { useSearchParams } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory = searchParams.get("category") || '전체';
    const onSaleOnly = searchParams.get("onSaleOnly") === "true";

    const [keyword, setKeyWord] = useState("");

    const handleCategoryChange = (category) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("category", category);
            return next;
        });
    };

    const handleOnSaleOnlyChange = (value) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("onSaleOnly", value);
            return next;
        });
    };

    useEffect(() => {
        getProducts(selectedCategory, keyword, onSaleOnly)
            .then((response) => setProducts(response.data))
            .catch((err) => console.log(err));
    }, [selectedCategory, keyword, onSaleOnly]);

    return (
        <div className="home-page">
            <div className="home-wrapper">
                <Header onSearch={keyword} />
                <Category selected={selectedCategory} onSelect={handleCategoryChange} />
                <FilterBar
                    onSaleOnly={onSaleOnly}
                    onOnSaleOnlyChange={handleOnSaleOnlyChange}
                // sortOption={sortOption}
                // onSortChange={setSortOption}
                />
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <BottomNav />
            </div>
        </div>
    )
}

export default Home;