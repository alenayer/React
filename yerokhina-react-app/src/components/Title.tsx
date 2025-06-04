import './Title.css'

interface TitleProps{
    content:string
}

const Title=({content}:TitleProps)=>{
    return(
        <h1 className="title">{content}</h1>
    )
}

export default Title