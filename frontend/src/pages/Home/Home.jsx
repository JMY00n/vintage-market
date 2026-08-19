import "../../styles/Home.css";
import "../../styles/global.css";
import Header from "../../components/common/Header";
import Category from "../../components/common/Category";
import ProductCard from "../../components/product/ProductCard";
import BottomNav from "../../components/common/BottomNav";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";

function Home() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [keyword, setKeyWord] = useState("");

    useEffect(() => {
        getProducts(selectedCategory)
            .then((response) => setProducts(response.data))
            .catch((err) => console.log(err));
    }, [selectedCategory, keyword]);

    return (
        <div className="home-page">
            <div className="home-wrapper">
                <Header onSearch={keyword} />
                <Category selected={selectedCategory} onSelect={setSelectedCategory} />
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