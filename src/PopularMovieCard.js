import React from 'react'
import { useVisibilityHook } from 'react-observer-api'
import './App.css'
import {useNavigate} from 'react-router-dom'
const PopularMovieCard = ({setId, cid, rank, rating, title, year, image}) => {
    const navigate = useNavigate();
    const {setElement, isVisible} = useVisibilityHook();
    const detailedInfo = (e) => {
        e.preventDefault();
        setId(cid);
        console.log(cid);
        navigate(`info/${cid}`,{state:{id: cid}});
    }
    return (
        <div ref={setElement} className="rounded-lg my-2 bg-[#0f0f0f] hover:cursor-pointer hover:shadow-lg pb-1 movie-card" onClick={(e) => detailedInfo(e)}>
            {isVisible && <>    
                <img src={image} alt="poster" className="rounded-t-lg duration-200 poster hover:contrast-75 peer-hover:contrast-75 w-full max-h-[300px]"/>
                {/* <div className="movie-img-cover rounded-t-lg object-cover duration-200 poster hover:contrast-75 peer-hover:contrast-75 w-full" style={{backgroundImage: `url('${image}')`, backgroundSize: 'cover'}}></div> */}
                <p className="px-2 py-0 text-sm font-italic font-semibold bg-yellow-400 inline rating">IMDB {rating} <i className="fa fa-star" aria-hidden="true"></i></p>
                <p className="text-sm font-semibold text-white px-2 pt-2 text-left bg-[#0f0f0f] movie-title mb-0">{title}</p>
                <div>
                    <span className="mx-2 text-xs rounded-sm mt-0 bg-[#9ca3af2c] text-white inline genre mr-1">#{(rank + 1)}</span>
                    <span className="mx-2 text-xs rounded-sm mt-0 bg-[#9ca3af2c] text-white inline genre">{year}</span>
                </div>
            </>}
        </div>
    )
}
export default PopularMovieCard;