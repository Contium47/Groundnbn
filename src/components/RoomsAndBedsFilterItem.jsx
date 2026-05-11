function RoomsAndBedsFilterItem({ basic, floorPlan, setFloorPlan }) {
  return (
    <div className="rooms-filter__row">
      <div className="rooms-filter__info">
        <span className="rooms-filter__title">{basic}</span>
      </div>

      <div className="rooms-filter__controls">
        <button
          className="rooms-filter__btn"
          onClick={() => {
            setFloorPlan((prev) => ({
              ...prev,
              [basic.toLowerCase()]: prev[basic.toLowerCase()] - 1,
            }));
          }}
          disabled={floorPlan[basic.toLowerCase()] === 0}
        >
          -
        </button>

        <span className="rooms-filter__value">
          {floorPlan[basic.toLowerCase()] === 0
            ? "Any"
            : floorPlan[basic.toLowerCase()] + "+"}
        </span>

        <button
          className="rooms-filter__btn"
          onClick={() => {
            setFloorPlan((prev) => ({
              ...prev,
              [basic.toLowerCase()]: prev[basic.toLowerCase()] + 1,
            }));
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default RoomsAndBedsFilterItem;
