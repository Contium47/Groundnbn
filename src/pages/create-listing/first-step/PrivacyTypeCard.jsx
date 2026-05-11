import { useOutletContext } from 'react-router';
import './PrivacyTypeCard.css'

function PrivacyTypeCard({ privacyType }) {
  const {listing, setListing} = useOutletContext();

  function setPrivacyType() {
    setListing((prev) => ({
      ...prev,
      privacyType: privacyType.title
    }))
  }

  return (
    <article className={`privacy-card ${listing.privacyType === privacyType.title ? 'active' : ''}`} onClick={setPrivacyType} >
      <div className="privacy-card__content">
        <h2 className="privacy-card__title">{privacyType.title}</h2>
        <p className="privacy-card__desc">{privacyType.description}</p>
      </div>
      <div className="privacy-card__icon">
        <img src={privacyType.icon} alt="privacy-icon" />
      </div>
    </article>
  );
}

export default PrivacyTypeCard;
