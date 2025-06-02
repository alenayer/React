import './BurgerButton.css'

interface  BurgerButtonProps {
    onClick: () => void;
    state: 'active' | 'inactive';
}


const BurgerButton= ({onClick,state}:BurgerButtonProps)=>{
    return (
        <button className={`burger-button ${state}`}
        onClick={onClick}
        >
            {state === 'active'? 
            ('X')
            :(
             <div className="burger-lines">
                <div className="burger-line"></div>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
             </div>
            )
            }
        </button>
    )
}
export default BurgerButton;