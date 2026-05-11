import { useOutletContext } from 'react-router';
import './ListingStepIntro.css'
import { useEffect } from 'react';

function ListingStepIntro({ step, title, description, vidLink}) {
  const { setIsStepValid } = useOutletContext();

  useEffect(() => {
    setIsStepValid(true)
  }, [])
  
  return (
    <div className="lsi">
      <div className="lsi-content">
        <span className="lsi-text">{step}</span>
        <div className="lsi-text">
          <h1 className="lsi-title">{title}</h1>
          <p className="lsi-description">{description}</p>
        </div>
      </div>
      <div className="lsi-media">
        <video
          className="lsi-video"
          src={vidLink}
          autoPlay
          muted
          playsInline
          preload="auto"
        ></video>
      </div>
    </div>
  );
}

export default ListingStepIntro;
