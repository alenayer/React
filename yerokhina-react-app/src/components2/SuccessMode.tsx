import './SuccessMode.css'

interface SuccessModeProps{
    onReturn:()=>void;
}

export const SuccessMode = ({onReturn}:SuccessModeProps) =>{
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