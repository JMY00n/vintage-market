import "./DetailBottom.css";
import { MessageCircle } from "lucide-react";

export default function DetailBottom() {
  return (
    <div className='bottom-btn-wrapper'>
      <button className="bottom-btn-chat">
        <MessageCircle size={20}/> 채팅하기
        </button>
      <button className="bottom-btn-buy">안전결제 구매</button>
    </div>
  )
}
