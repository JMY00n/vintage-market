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

    useEffect(() => {
        getProducts()
            .then((response) => setProducts(response.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="home-page">
            <div className="home-wrapper">
                <Header />
                <Category />
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