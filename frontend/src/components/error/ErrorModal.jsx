import "../../styles/global.css";
import "./ErrorModal.css";
import { useNavigate } from "react-router-dom";

export default function ErrorModal({message, onConfrim}) {
    const navigate = useNavigate();

    return (
        <div className="error-modal-overlay">
            <div className="error-modal">
                <p className="error-modal-message">{message}</p>
                <button className="error-modal-confirm" onClick={onConfrim}>확인</button>
            </div>
        </div>
    )
}