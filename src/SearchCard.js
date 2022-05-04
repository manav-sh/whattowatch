import React from 'react'
import './App.css';
import {useNavigate} from 'react-router-dom'
export const SearchCard = ({cid, title, image}) => {
    const navigate = useNavigate();
    const detailedInfo = (e) => {
        e.preventDefault();
        console.log(cid);
        navigate(`../../info/${cid}`,{state:{id: cid}});
    }

    return (
        <div className="bg-[#0f0f0f] rounded-lg my-2 hover:cursor-pointer hover:shadow-lg pb-1 movie-card" onClick={(e) => detailedInfo(e)}>
            <img src={image} alt="poster" className="rounded-t-lg object-cover duration-200 poster hover:contrast-75 w-full"/>
            <p className="bg-[#0f0f0f] text-sm font-semibold text-white px-2 pt-2 text-left movie-title mb-3">{title}</p>
        </div>
    )
}
