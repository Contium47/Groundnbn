import "./AboutPricingPopup.css";

function AboutPricingPopup({ isOpen, setIsOpen }) {
  if (!isOpen) return null;

  function onClose() {
    setIsOpen(false);
  }

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>

      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal__title">More about pricing</h2>

        <p className="modal__text">
          You choose your price and you can change it anytime. Bookings aren’t
          guaranteed.
        </p>

        <div className="modal__section">
          <h3 className="modal__subtitle">Per night price</h3>
          <p className="modal__text">
            The suggested price is based on factors like your listing’s location
            and amenities, as well as guest demand and similar listings.
          </p>
        </div>

        <div className="modal__section">
          <h3 className="modal__subtitle">Guest price details</h3>
          <p className="modal__text">
            When you’re setting a price and a price breakdown is shown, the
            guest service fee and/or taxes, if applicable, may vary depending on
            the booked trip details (like the length of stay or number of
            guests).
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPricingPopup;
