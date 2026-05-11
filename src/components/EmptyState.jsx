import { useNavigate } from "react-router";
import './EmptyState.css'

function EmptyState({ message }) {
  const navigate = useNavigate();
  return (
    <div className="empty">
      <div className="empty__content">
        <h3 className="empty__title">{message}</h3>

        <button className="empty__btn" onClick={() => navigate("/")}>
          Start exploring
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
