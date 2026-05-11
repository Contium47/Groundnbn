import burgerMenuIcon from '../imgs/ui/burger-menu.svg'
import './BurgerMenuBtn.css'

function BurgerMenuBtn({isUserMenuOpen, setIsUserMenuOpen}) {
    return (
        <button className='burger-btn' onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
            <img src={burgerMenuIcon} alt="" />
        </button>
    )
}

export default BurgerMenuBtn;