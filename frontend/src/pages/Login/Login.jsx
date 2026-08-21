import { useNavigate } from "react-router-dom";
import "../../styles/AuthForm.css";
import "../../styles/global.css";
import { useState } from "react";
import { login } from "../../api/authApi";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        /* 로그인 처리 api 호출 */
        try {
            const response = await login(formData);
            const { token, ...userInfo } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userInfo));

            navigate("/");
        } catch (err) {
            if (err.response?.status === 401) {
                setError("이메일 또는 비밀번호를 확인해주세요.");
            } else {
                setError("로그인 중 오류가 발생했습니다.");
            }
        }
    };



    return (
        <div className="auth-page">
            <div className="auth-wrapper">
                <div className="auth-header">
                    <h3>vintage market</h3>
                    <p>다시 만나서 반가워요</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="auth-input">
                        <p>이메일</p>
                        <input
                            type="text"
                            placeholder="name@eamil.com"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <p>비밀번호</p>
                        <input
                            type="password"
                            placeholder="비밀번호"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <div className="auth-button">
                        <button type="submit">로그인</button>

                    </div>
                    {error && <p className="auth-error">{error}</p>}
                </form>
                <div className="auth-etc">
                    <p>계정이 없으신가요? </p>
                    <span onClick={() => navigate("/signup")}>회원가입</span>
                </div>
            </div>
        </div>
    )
}

export default Login;