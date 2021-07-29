
import LoadingGIF from "../../assets/Ghost.gif"
import './style.scss'
export default function Loading(){
    return(
        <div className="overlay-loading">
            <img src={LoadingGIF}/>
            <span>Loading...</span>
        </div>
    )
}