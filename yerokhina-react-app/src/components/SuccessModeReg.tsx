import './SuccessModeReg.css'

interface SuccessModeRegProps{
    onReturn:()=>void;
}

export const SuccessModeReg = ({onReturn}:SuccessModeRegProps) =>{
return(
    <div className='success__mode'>
        <textarea className="success__textarea" value="Your account has been successfully created!"></textarea>
        <button
        type='button'
        className='success__btn'
        onClick={onReturn}
        >
            Back to home</button>
    </div>
)
}