import React, { useState } from "react";
import { createUser } from "../systems/request";
import "../styles/SignUp.css";
import closeX from "../styles/close-x.svg";

const SignUp = ({ isOpen, onClose, onLoginOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const userData = { name, email, password };
      const response = await createUser(userData);

      console.log("회원가입 성공:", response);
      setSuccess(true);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("회원가입 실패", error);
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="smodal-overlay">
      <div className="smodal-container">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="sclose-button">
          <img className="sclose-icon" alt="close x" src={closeX} />
        </button>

        {/* 헤더 */}
        <div className="smodal-header">
          <h2 className="smodal-title">회원가입</h2>
        </div>

        {/* 폼 */}
        <form className="sform" onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="sinput-field"
            required
          />
          <input
            id="email"
            type="email"
            placeholder="메일 주소를 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sinput-field"
            required
          />
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="sinput-field"
            required
          />
          {error && <p className="serror-message">{error}</p>}
          <button type="submit" className="ssubmit-button">
            회원가입
          </button>
        </form>

        {/* 하단 링크 */}
        <div className="ssignup-footer">
          <p>
            이미 계정이 있으신가요?{" "}
            <span
              onClick={() => {
                onClose(); // 회원가입 모달 닫기
                onLoginOpen(); // 로그인 모달 열기
              }}
              className="slogin-link"
            >
              로그인
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
