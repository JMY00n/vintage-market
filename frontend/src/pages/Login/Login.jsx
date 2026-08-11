import { useNavigate } from "react-router-dom";
import "../../styles/AuthForm.css";
import "../../styles/global.css";

function Login() {
    const navigate = useNavigate();
    return (
        <div className="auth-page">
            <div className="auth-wrapper">
                <div className="auth-header">
                    <h3>vintage market</h3>
                    <p>다시 만나서 반가워요</p>
                </div>
                <div className="auth-input">
                    <p>이메일</p>
                    <input type="text" placeholder="name@eamil.com"/>
                    <p>비밀번호</p>
                    <input type="password" placeholder="비밀번호"/>
                </div>
                <div className="auth-button">
                    <button type="button">로그인</button>
                </div>
                <div className="auth-etc">
                    <p>계정이 없으신가요? </p>
                    <span onClick={() => navigate("/signup")}>회원가입</span>
                </div>
            </div>
        </div>
    )
}

export default Login;