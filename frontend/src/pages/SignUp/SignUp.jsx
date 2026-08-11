import "../../styles/AuthForm.css";
import "../../styles/global.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    return (
        <div className="auth-page">
            <div className="auth-wrapper">
                <div className="auth-header auth-header--left">
                    <h3>회원가입</h3>
                </div>
                <div>
                    <div className="auth-input">
                        <p>닉네임</p>
                        <input type="text" />
                    </div>
                    <div className="auth-input">
                        <p>이메일</p>
                        <input type="text" />
                    </div>
                    <div className="auth-input">
                        <p>비밀번호</p>
                        <input type="password" />
                    </div>
                    <div className="auth-input">
                        <p>비밀번호 확인</p>
                        <input type="password" />
                    </div>
                </div>
                <div className="auth-role">
                    <h4>가입유형</h4>
                    <label>
                        <input type="radio" name="role" /><span>개인사용자</span>
                    </label>
                    <label>
                        <input type="radio" name="role" /><span>상점(가입 후 인증 신청 가능)</span>
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