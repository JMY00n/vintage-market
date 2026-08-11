import { useState } from "react";
import "../../styles/AuthForm.css";
import "../../styles/global.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState({
        nickname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phone: "",
        role: "",
    });
    
    return (
        <div className="auth-page">
            <div className="auth-wrapper">
                <div className="auth-header auth-header--left">
                    <h3>회원가입</h3>
                </div>
                <div>
                    <div className="auth-input">
                        <p>닉네임</p>
                        <input 
                            type="text" 
                            placeholder="vintage-market"
                            name="nickname"
                            value={formData.nickname}
                        />
                    </div>
                    <div className="auth-input">
                        <p>이메일</p>
                        <input 
                            type="text"
                            placeholder="abcd@naver.com"
                            name="email"
                            value={formData.email}
                        />
                    </div>
                    <div className="auth-input">
                        <p>비밀번호</p>
                        <input 
                            type="password" 
                            placeholder="비밀번호를 입력해주세요."
                            name="password"
                            value={formData.password}
                        />
                    </div>
                    <div className="auth-input">
                        <p>비밀번호 확인</p>
                        <input 
                            type="password" 
                            placeholder="비밀번호를 다시 입력해주세요."
                            name="passwordConfirm"
                            value={formData.passwordConfirm}
                        />
                    </div>
                    <div className="auth-input">
                        <p>휴대폰 번호</p>
                        <input 
                            type="text" 
                            placeholder="010-1234-5678"
                            name="phone"
                            value={formData.phone}
                        />
                    </div>
                </div>
                <div className="auth-role">
                    <h4>가입유형</h4>
                    <label>
                        <input 
                            type="radio" 
                            name="role"
                            value="INDIVIDUAL"
                            checked={formData.role === "INDIVIDUAL"}
                        />
                        <span>개인사용자</span>
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="role"
                            value="STORE"
                            checked={formData.role === "STORE"}
                        />
                        <span>상점(가입 후 인증 신청 가능)</span>
                    </label>
                </div>
                <div className="auth-button">
                    <button type="button">가입하기</button>
                </div>
                <div className="auth-etc">
                    <p>이미 가입한 계정이 있으신가요? </p>
                    <span onClick={() => navigate("/login")}>로그인</span>
                </div>
            </div>

        </div>
    )
}

export default SignUp;