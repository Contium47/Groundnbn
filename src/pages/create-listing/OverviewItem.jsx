function OverviewItem({title, desc, img}) {
  return (
    <div className="overview__step">
      <div className="overview__text">
        <h2 className="overview__step-title">{title}</h2>
        <p className="overview__step-desc">
          {desc}
        </p>
      </div>
      <div className="overview__image-wrapper">
        <img src={img} alt="" className="overview__image" />
      </div>
    </div>
  );
}

export default OverviewItem;