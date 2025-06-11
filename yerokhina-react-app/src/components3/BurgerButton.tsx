import './BurgerButton.css'

interface  BurgerButtonProps {
    onClick: () => void;
    state: 'active' | 'inactive';
}


const BurgerButton= ({onClick,state}:BurgerButtonProps)=>{
    return (
        <button className={`burger__button ${state}`}
        onClick={onClick}
        >
            {state === 'active'? 
            ('X')
            :(
             <div className="burger__lines">
                <div className="burger__line"></div>
                <div className="burger__line"></div>
                <div className="burger__line"></div>
             </div>
            )
            }
        </button>
    )
}
export default BurgerButton;