import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/authApi";
import "../../styles/AuthForm.css";
import "../../styles/global.css";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    role: "",
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

    if (formData.password !== formData.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!formData.role) {
      setError("가입 유형을 선택해주세요.");
      return;
    }

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        role: formData.role,
        phone: formData.phone,
      });
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("이미 가입된 이메일입니다.");
      } else if (err.response?.status === 400) {
        setError("입력값을 다시 확인해주세요.");
      } else {
        setError("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-header auth-header--left">
          <h3>회원가입</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="auth-input">
              <p>닉네임</p>
              <input
                type="text"
                placeholder="vintage-market"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
              />
            </div>
            <div className="auth-input">
              <p>이메일</p>
              <input
                type="text"
                placeholder="abcd@naver.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="auth-input">
              <p>비밀번호</p>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="auth-input">
              <p>비밀번호 확인</p>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </div>
            <div className="auth-input">
              <p>휴대폰 번호</p>
              <input
                type="text"
                placeholder="(-) 하이픈 없이 입력해주세요."
                name="phone"
                value={formData.phone}
                onChange={handleChange}
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
                onChange={handleChange}
              />
              <span>개인사용자</span>
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="STORE"
                checked={formData.role === "STORE"}
                onChange={handleChange}
              />
              <span>상점(가입 후 인증 신청 가능)</span>
            </label>
          </div>

          {error && <p className="auth-error">{error}</p>}
          <div className="auth-button">
            <button type="submit">가입하기</button>
          </div>
        </form>
        <div className="auth-etc">
          <p>이미 가입한 계정이 있으신가요? </p>
          <span onClick={() => navigate("/login")}>로그인</span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
