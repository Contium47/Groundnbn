import './StructureTypeCard.css'

function StructureTypeCard({ structureType, listing, setListing }) {
  
  function setStructure() {
    setListing((prev) => ({
        ...prev,
        structure: structureType.name
      }))
  }

  return (
    <article className={`structure-card ${listing.structure === structureType.name ? 'active' : ''}`} onClick={setStructure}>
      <div className="structure-card__icon" dangerouslySetInnerHTML={{ __html: structureType.icon_svg }}></div>
      <p className="structure-card__title" >{structureType.name}</p>
    </article>
  );
}

export default StructureTypeCard;