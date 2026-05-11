import filterIcon from '../imgs/ui/filters-icon.svg'

import './FilterButton.css'

function FilterButton({setIsFiltersOpen}) {
    return (
        <button className="filter-btn" onClick={() => setIsFiltersOpen(true)}>
            <img className="filter-btn__icon" src={filterIcon} alt="" />
            <p className="filter-btn__text">Filters</p>
        </button>
    )
}

export default FilterButton;