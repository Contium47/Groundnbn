// import { useState } from 'react';
import "./RoomsAndBedsFilter.css";

import RoomsAndBedsFilterItem from "./RoomsAndBedsFilterItem";

function RoomsAndBedsFilter({ floorPlan, setFloorPlan, basics }) {
  return (
    <div className="rooms-filter">
      {basics.map((basic, index) => (
        <RoomsAndBedsFilterItem
          key={index}
          basic={basic}
          floorPlan={floorPlan}
          setFloorPlan={setFloorPlan}
        />
      ))}
    </div>
  );
}

export default RoomsAndBedsFilter;
