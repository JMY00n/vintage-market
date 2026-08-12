import "../../styles/Home.css";
import "../../styles/global.css";
import Header from "../../components/common/Header";
import Category from "../../components/common/Category";
import ProductCard from "../../components/product/ProductCard";
import BottomNav from "../../components/common/BottomNav";

const dummyProducts = [
    { id: 1, sellerName: "vintage.shop", sellerVerified: true ,title: "코듀로이 셋업 자켓", price: 45000 },
    { id: 2, sellerName: "minsu_j", sellerVerified: false, title: "니트 가디건", price: 22000 },
    { id: 3, sellerName: "seoul.vtg", sellerVerified: true, title: "데님 팬츠", price: 18000 },
    { id: 4, sellerName: "yuna_k", sellerVerified: false, title: "체크 셔츠", price: 15000 },
    { id: 5, sellerName: "jmin", sellerVerified: false, title: "비니", price: 12000 },
];

function Home() {
    return (
        <div className="home-page">
            <div className="home-wrapper">
                <Header />
                <Category />
                <div className="product-grid">
                    {dummyProducts.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
                <BottomNav />
            </div>
            
        </div>
    )
}

export default Home;