import { useOutletContext } from "react-router";
import FloorItem from "./FloorPlanItem";

import './FloorPlanStep.css'
import { useEffect } from "react";

function FloorPlanStep() {
  const { setIsStepValid } = useOutletContext();

  useEffect(() => {
    setIsStepValid(true)
  }, [])

  const basics = ['Guests', 'Bedrooms', 'Beds', 'Bathrooms'];

  return (
    <div className="floor">
      <div className="floor__header">
        <h1 className="floor__title">Share some basics about your place</h1>
        <p className="floor__subtitle">You’ll add more details later, such as bed types.</p>
      </div>

      <div className="floor__list">
        {basics.map((basic, index) => <FloorItem key={index} basic={basic} />)}
      </div>
    </div>
  );
}

export default FloorPlanStep;