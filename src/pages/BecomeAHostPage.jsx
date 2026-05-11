import { useNavigate} from "react-router";
import Header from "../components/Header";

import './BecomeAHostPage.css'


function BecomeAHostPage({ isAuth, isUserMenuOpen, setIsUserMenuOpen }) {
    const navigate = useNavigate();
  return (
    <>
      <Header isAuth={isAuth} isUserMenuOpen={isUserMenuOpen} setIsUserMenuOpen={setIsUserMenuOpen} />

      <main className="host">
        <div className="host-container">
          <h1 className="host-title">
            It's easy to start hosting and earn extra money
          </h1>

          <p className="host-subtitle">
            List your space, connect with guests, and start earning today.
          </p>

          <button className="host-button" onClick={() => navigate('overview')}>
            Create listing
          </button>
        </div>
      </main>

    </>
  );
}
export default BecomeAHostPage;