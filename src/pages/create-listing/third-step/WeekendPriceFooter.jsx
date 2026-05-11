import { useState } from 'react';
import { useOutletContext } from 'react-router';
import './WeekendPriceFooter.css'

function WeekendPriceFooter() {
    const {listing, setListing} = useOutletContext()
    const [value, setValue] = useState(12)

    return (
        <div className="weekend">
            <div className="weekend__top">
                <div className="weekend__text">
                    <p className="weekend__title">Weekend premium</p>
                    <p className="tip">Tip: Try 12%</p>
                </div>
                <div className="weekend__value">{value}%</div>
            </div>
            <div className="weekend__slider">
                <input 
                    type="range" 
                    className="weekend__range"
                    onChange={e => {
                        const percent = +e.target.value;
                        setValue(percent);

                        const weekendPrice = Math.round(listing.weekdayPrice * (1 + percent / 100));

                        setListing(prev => ({
                            ...prev,
                            weekendPrice 
                        }))
                    }}
                    value={value}
                />
                <div className='weekend-percentage'>
                    <p>0%</p>
                    <p>100%</p>
                </div>
            </div>
        </div>
    )
}

export default WeekendPriceFooter;