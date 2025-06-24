import './SuccessMode.css'
interface SuccessModeProps {
    onAction: () => void;
    buttonText:string;
}


export const SuccessMode = ({ onAction,buttonText }: SuccessModeProps) => {
    return (
        <div className='success__mode'>
            <textarea
                className="success__textarea"
                value="You have successfully signed in!"
                readOnly/>
          
            <button
                className='success__btn'
                onClick={onAction}
                >
                    {buttonText}
            </button>
        </div>
    )
}