import React from 'react';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './SingleInfo.css';
import Loader from 'react-loader-spinner';
import Error from './Error.js'

const SingleInfo = () => {
  const { id } = useParams();
  const [callInfo, setCallInfo] = useState(false);
  const [data, setData] = useState({});
  const [actorData, setActorData] = useState([]);
  const [trailerData, setTrailerData] = useState('');
  useEffect (() => {
    setCallInfo(false);
    const getInfo = async (id) => {
      await fetch(`https://imdb-api.com/en/API/Title/k_h33euvtx/${id}/Posters,`)
      .then((response) => response.json())
      .then((data) => {
        const details = {
          id: data.id,
          type: data.type,
          title: data.title,
          poster: data.image,
          imdbRating: data.imDbRating,
          releaseDate: data.releaseDate,
          runtimeStr: data.runtimeStr,
          plot: data.plot,
          directors: data.directors,
          writers: data.writers,
          studios: data.studios,
          genres: data.genres,
          companies: data.companies,
          countries: data.countries,
          bg: data.posters.backdrops[0].link,
          similars: data.similars
        }
        setData(details);
        const actors = data["actorList"].map((actor) => ({
          image: actor.image,
          actorName: actor.name,
          asCharacter: actor.asCharacter
        }));
        setActorData(actors);
      })
    }
    const getTrailer = async (id) => {
      await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/k_h33euvtx/${id}`)
      .then(response => response.json())
      .then(data => {
        setTrailerData(data.videoUrl);
      });
    }
    getTrailer(id);
    getInfo(id);
    setCallInfo(true);
  },[id])
  return <div className="app min-h-screen bg-[#0f0f0f] singleinfo">
    {callInfo === false && <>
      <div className="flex justify-center items-center my-10"><Loader type="Oval" color="#1f2533" width="40" height="40" /></div>
    </>}
    {callInfo && data.title !== null && <>
      
      <div className="basic-info px-4 py-7 mb-2 text-white flex items-center justify-center space-x-[12px]" style={{backgroundImage: `url("${data.bg}")`}}>
        <div className="blur"></div>
        <div className="poster w-[35%] max-w-[160px]">
          <img src={data.poster} alt="poster" className="poster-img rounded-md"/>
        </div>
        <div className="content flex-1 max-w-[52%]">
          <p className="title text-[1.6em] font-semibold">{data.title}</p>
          <p className="rate text-sm px-1 bg-yellow-400 text-black font-bold rounded-[4px] inline-block"> IMDB {data.imdbRating} <i className="fa fa-star"></i> </p>
          <p className="text-sm mt-[0.5rem]">
              Genre: <span className="small-field text-md">{data.genres}</span>
          </p>
          {
            data.runtimeStr !== null && <>
              <p className="text-sm mt-[0.5rem]">
                  Runtime: <span className="small-field text-md">{data.runtimeStr}</span>
              </p>
            </>
          }
          {
            data.releaseDate !== null && <>
              <p className="text-sm my-[0.5rem]">Release: <span className="small-field"> {data.releaseDate} </span></p>
            </>
          }
        </div>
      </div>
      <div className="buttons px-3 my-4 text-gray-200 flex space-x-[12px]">
        <a href={trailerData} target="_blank" className="px-3 py-[8px] bg-red-600 rounded-md mt-[8px] hover:bg-red-700 opacity-90 watch-trailer w-[50%] flex items-center hover:text-[14px]"><i className="fa fa-play-circle mr-2"></i><span className="flex-1 text-center">Watch Trailer</span></a>
        <a href={`whatsapp://send?text=Check out this amazing movie called ${data.title} here https://whattowatchnext.web.app/info/${id}`} data-action="share/whatsapp/share" className=" px-3 py-[8px] bg-red-600 rounded-md mt-[8px] hover:bg-red-700 opacity-90 watch-trailer w-[50%] flex items-center"><i className="fa fa-share-alt mr-2"></i> <span className="flex-1 text-center"> Share </span></a>
      </div>
      <div className="more-info pt-4 px-3 pb-3">
        <p className="summary text-white text-[17px]">Summary</p>
        <hr className="border-[2px] w-[110px] border-red-600 mt-[2px]"/>
        <p className="text-[12.5px] opacity-70 text-white mt-2">
          {data.plot}
        </p>
        {
          data.directors !== null && <>    
            <div className="directors mt-[10px] flex items-baseline text-white text-[13px]">
              <div className="font-bold text-md">Directors:</div>
              <div className="text-md ml-2 opacity-80">{data.directors}</div>
            </div>
          </>
        }
        {
          data.writers !== null && <>  
            <div className="writer mt-[7px] flex items-baseline text-white text-[13px]">
              <div className="font-bold text-md">Writers:</div>
              <div className="text-md ml-2 opacity-80">{data.writers}</div>
            </div>
          </>
        }
        {
          data.companies !== null && <>
            <div className="studios mt-[7px] flex items-baseline text-white text-[13px]">
              <div className="font-bold text-md">Studios:</div>
              <div className="text-md ml-2 opacity-80">{data.companies}</div>
            </div>
          </>
        }
        <div className="cast mt-[1rem]">
          <p className="summary text-white text-[17px]">Cast</p>
          <hr className="border-[2px] w-[110px] border-red-600 mt-[2px]"/>
          <div className="cast-list mt-2 flex space-x-2">
            {actorData.map((actor) => {
              return <div className="single-cast text-white my-3 flex flex-col inline w-[150px] px-[10px] py-[6px]">
                <div className="bg-image" style={{backgroundImage: `url("${actor.image}")`}}></div>
                <div className="text-[14px] font-semibold text-left mt-[7px]">{actor.actorName}</div>
                <div className="text-[11px] text-gray-400 text-left block mt-[4px]">{actor.asCharacter.split("as ").pop()}</div>
              </div>
            })}
          </div>
        </div>
      </div>

    </>}
    {callInfo && (data === null || data === undefined) && <Error /> }
    </div>;
};

export default SingleInfo;