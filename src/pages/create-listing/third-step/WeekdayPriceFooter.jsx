import { useOutletContext } from 'react-router';
import './WeekdayPriceFooter.css'

function WeekdayPriceFooter() {
    const {setIsOpen} = useOutletContext()
    return (
        <a className="price-link" onClick={() => setIsOpen(true)} >Learn more about pricing</a>
    )
}

export default WeekdayPriceFooter;