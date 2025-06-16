import './SuccessMode.css'
interface SuccessModeProps {
    onAction: () => void;
}


export const SuccessMode = ({ onAction }: SuccessModeProps) => {
    return (
        <div className='success__mode'>
            <textarea
                className="success__textarea"
                value="You have successfully signed in!">
            </textarea>
            <button
                className='success__btn'
                onClick={onAction}
                >
                    Sign In
            </button>
        </div>
    )
}