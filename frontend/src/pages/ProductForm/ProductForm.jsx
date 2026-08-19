import { useEffect, useRef, useState } from "react";
import "../../styles/AuthForm.css";
import "./ProductForm.css";
import "../../styles/global.css";
import { MoveLeft, Camera } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, getProduct, productImageAdd, updateProduct } from "../../api/productApi";

export default function ProductForm() {
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [images, setImages] = useState([]);

    useEffect(() => {
        if (isEditMode) {
            getProduct(id)
                .then((response) => {
                    setFormData({
                        title: response.data.title,
                        price: response.data.price,
                        description: response.data.description,
                        category: response.data.category,
                    });

                    const existingImages = response.data.imageUrls.map((url, index) => ({
                        id: `existing-${index}`,
                        type: 'existing',
                        url,
                    }));
                    setImages(existingImages);
                });
        }
    }, [id]);

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

        const newImages = files.map((file) => ({
            id: `new-${file.name}-${Date.now()}`,
            type: 'new',
            url: URL.createObjectURL(file), // 미리보기용 임시 URL
            file: file,                     // 나중에 실제 업로드할 진짜 파일
        }));

        setImages((prev) => [...prev, ...newImages]);
        e.target.value = "";
    }

    const removeImage = (idToRemove) => {
        setImages((prev) => prev.filter((img) => img.id !== idToRemove));
    };

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
            if (isEditMode) {
                // 수정 모드
                const productData = {
                    title: formData.title,
                    price: formData.price,
                    description: formData.description,
                    category: formData.category,
                    keepImageUrls: images
                        .filter((img) => img.type === 'existing')
                        .map((img) => img.url),
                };

                const multipartFormData = new FormData();
                multipartFormData.append(
                    "product",
                    new Blob([JSON.stringify(productData)], { type: "application/json" })
                );

                images
                    .filter((img) => img.type === 'new')
                    .forEach((img) => multipartFormData.append("newImages", img.file));

                await updateProduct(id, multipartFormData);
                navigate(`/products/${id}`);

            } else {
                // 기존 등록 로직 그대로
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
                    images.forEach((img) => imageFormData.append("images", img.file || img));
                    await productImageAdd(productId, imageFormData);
                }

                navigate(`/products/${response.data.id}`);
            }
        } catch (err) {
            console.log(err);
            if (err.response?.status === 400 && err.response.data) {
                const firstError = Object.values(err.response.data)[0];
                setError(firstError);
            } else {
                setError(isEditMode ? "상품 수정에 문제가 발생했습니다." : "상품 등록에 문제가 발생했습니다.");
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
                            {images.map((img) => (
                                <div key={img.id} className="image-preview">
                                    <img
                                        src={img.type === 'new' ? img.url : `http://localhost:8080${img.url}`}
                                        alt="미리보기"
                                        draggable={false}
                                    />
                                    <button
                                        className="image-remove-btn"
                                        type="button"
                                        onClick={() => removeImage(img.id)}
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
