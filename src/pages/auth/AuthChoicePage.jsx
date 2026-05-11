import { NavLink } from "react-router";
import './AuthChoicePage.css'

function AuthChoicePage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Log in or Sign up</h1>

        <div className="auth-actions">
            <div className="login-action">
                <h2 className="auth-subtitle">Already have an account?</h2>
                <NavLink to="login" className="auth-btn primary">
                    Log in
                </NavLink>
            </div>

            <div className="signup-action">
                <h2 className="auth-subtitle">Don't have an account?</h2>
            <NavLink to="signup" className="auth-btn secondary">
                Sign up
            </NavLink>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AuthChoicePage;
