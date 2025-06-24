import './SuccessModeReg.css'

interface SuccessModeRegProps{
    onReturn:()=>void;
    buttonText:string;
}

export const SuccessModeReg = ({onReturn,buttonText}:SuccessModeRegProps) =>{
return(
    <div className='success__mode'>
        <textarea
         className="success__textarea" 
         value="Your account has been successfully created!"
         readOnly
          />
        <button
        type='button'
        className='success__btn'
        onClick={onReturn}
        >
            {buttonText}</button>
    </div>
)
}