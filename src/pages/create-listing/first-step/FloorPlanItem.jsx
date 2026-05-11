import './FloorItem.css'
import { useOutletContext } from "react-router";

function FloorItem({basic}) {
    const {listing, setListing} = useOutletContext();

    const key = basic.toLowerCase();
    const value = listing.floorPlan[key];

    const onIncrease = () => {
        setListing(prev => ({
            ...prev,
            floorPlan: {
                ...prev.floorPlan,
                [key]: value + 1
            }
        }))
        console.log(basic)
    }

    const onDecrease = () => {
        setListing(prev => ({
            ...prev,
            floorPlan: {
                ...prev.floorPlan,
                [key]: value - 1
            }
        }))
        console.log(basic)
    }

    return (
        <div className="floor-item">
            <div className="floor-item__label">{basic}</div>
            <div className="floor-item__controls">
                <button className="floor-item__btn" disabled={value === 1} onClick={onDecrease}>-</button>
                <p className="floor-item__value">{listing.floorPlan[basic.toLowerCase()]}</p>
                <button className="floor-item__btn" onClick={onIncrease}>+</button>
            </div>
        </div>
    )
}

export default FloorItem;