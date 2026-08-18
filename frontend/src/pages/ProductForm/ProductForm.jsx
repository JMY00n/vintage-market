import { useRef, useState } from "react";
import "../../styles/AuthForm.css";
import "./ProductForm.css";
import "../../styles/global.css";
import { MoveLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createProduct, productImageAdd } from "../../api/productApi";

export default function ProductForm() {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    // 드래그
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const removeImage = (indexToRemove) => {
        setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
        setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    }

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (images.length + files.length > 10) {
            alert("사진은 최대 10장까지 등록 가능합니다.");
            e.target.value = "";
            return;
        }

        setImages((prev) => [...prev, ...files]);

        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...newPreviews]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title) {
            alert("상품 이름을 입력해주세요.");
            return;
        }

        if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
            alert("가격을 올바르게 입력해주세요.");
            return;
        }

        if (!formData.category) {
            alert("카테고리를 선택해주세요.");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        try {
            const response = await createProduct({
                sellerId: user.id,
                title: formData.title,
                price: formData.price,
                description: formData.description,
                category: formData.category,
            });
            
            const productId = response.data.id;

            if (images.length > 0) {
                const imageFormData = new FormData();
                images.forEach((file) => imageFormData.append("images", file));

                await productImageAdd(productId, imageFormData);
            }

            navigate(`/products/${response.data.id}`);
        } catch (err) {
            console.log(err);
            
            if (err.response?.status === 400 && err.response.data) {
                const firstError = Object.values(err.response.data)[0];
                setError(firstError);
            } else {
                setError("상품 등록에 문제가 발생했습니다.")
            }
        }
    };

    return (
        <div>
            <div className="form-page">
                {error && (
                    <p className="error-msg">{error}</p>
                )}
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="productForm-header">
                            <MoveLeft size={20} onClick={() => navigate(-1)} />
                            <h3>상품 등록</h3>
                            <button type="submit">등록</button>
                        </div>
                        <div
                            className="product-image-upload"
                            ref={scrollRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            {images.length < 10 && (
                                <label className="image-upload-btn">
                                    <Camera size={18} />
                                    <span>{images.length}/10</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        style={{ display: "none" }}
                                    />
                                </label>
                            )}
                            {previews.map((url, index) => (
                                <div key={index} className="image-preview">
                                    <img src={url} alt={`업로드 ${index + 1}`} draggable={false} />
                                    <button
                                        className="image-remove-btn"
                                        type="button"
                                        onClick={() => removeImage(index)}
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="product-info-form">
                            <div className="product-input">
                                <p className="product-input-title">상품 이름</p>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="상품명을 입력해주세요."
                                    className="product-input-input"
                                />
                            </div>
                            <div className="product-input">
                                <p className="product-input-title">카테고리</p>
                                <select
                                    name="category"
                                    className="product-input-input"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">카테고리 선택</option>
                                    <option value="상의">상의</option>
                                    <option value="하의">하의</option>
                                    <option value="아우터">아우터</option>
                                    <option value="신발">신발</option>
                                    <option value="모자">모자</option>
                                    <option value="기타">기타</option>
                                </select>
                            </div>
                            <div className="product-input">
                                <p className="product-input-title">
                                    가격
                                </p>
                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="가격을 입력해주세요."
                                    className="product-input-input"
                                />
                            </div>
                            <div className="product-input">
                                <p className="product-input-title">
                                    상품 설명
                                </p>
                                <textarea 
                                    name="description" 
                                    type="text" 
                                    placeholder="상품 상태, 사이즈, 거래 방식 등을 자유롭게 적어주세요" 
                                    className="product-input-desc" 
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="product-form-bottom">
                                <p>비워두면 사진을 보고 AI가 자동으로 작성해요</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
