import { Link } from "react-router";
import './BecomeAHostHeader.css'

function BecomeAHostHeader() {
    return (
        <header className="bah-header">
            <nav className="bah-nav">
                <Link className="bah-logo" to='/'>🏠</Link>
                <Link className="bah-link faq-btn" to='FAQ'>Questions?</Link>
            </nav>
        </header>
    )
}

export default BecomeAHostHeader;