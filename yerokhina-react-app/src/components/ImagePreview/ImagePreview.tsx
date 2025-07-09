import { closeImagePreview } from "../../store/postSlice";
import { useAppDispatch, useAppSelector } from "../../store/store"

const ImagePreview = ()=>{
    const{selectedImage} = useAppSelector(state=>state.post);
    const dispatch = useAppDispatch();
    

    if(!selectedImage) return null;

    return(
        <div className="img-preview-overlay" onClick={()=>dispatch(closeImagePreview())}>
            <div className="img-preview-content">
                <button
                className="img-preview-close"
                onClick={()=>dispatch(closeImagePreview())}
                >X</button>
                <img src={selectedImage} alt="Preview Image" className="img-preview" />
            </div>
        </div>
    )
}

export default ImagePreview;