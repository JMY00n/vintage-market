import "../../styles/AuthForm.css";
import "./ProductForm.css";
import { MoveLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="form-page">
                <div className="form-wrapper">
                    <div className="productForm-header">
                        <MoveLeft size={20} onClick={() => navigate(-1)} />
                        <h3>상품 등록</h3>
                        <p>등록</p>
                    </div>
                    <div className="product-image-upload">
                        <label className="image-upload-btn">
                            <Camera size={18} />
                            <span>0/10</span>
                        </label>
                    </div>
                    <div className="product-info-form">
                        <div className="product-input">
                            <p className="product-input-title">제목</p>
                            <input type="text" placeholder="상품명을 입력해주세요." className="product-input-input"/>
                        </div>
                        <div className="product-input">
                            <p className="product-input-title">카테고리</p>
                            <select name="category" id="" className="product-input-input">
                                <option value="">카테고리 선택</option>
                                <option value="상의">상의</option>
                                <option value="상의">아우터</option>
                                <option value="상의">신발</option>
                                <option value="상의">모자</option>
                                <option value="상의">기타</option>
                            </select>
                        </div>
                        <div className="product-input">
                            <p className="product-input-title">가격</p>
                            <input type="text" placeholder="가격을 입력해주세요." className="product-input-input" />
                        </div>
                        <div className="product-input">
                            <p className="product-input-title">상품 설명</p>
                            <textarea type="text" placeholder="상품 상태, 사이즈, 거래 방식 등을 자유롭게 적어주세요" className="product-input-desc" />
                        </div>
                        <div className="product-form-bottom">
                            <p>비워두면 사진을 보고 AI가 자동으로 작성해요</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
