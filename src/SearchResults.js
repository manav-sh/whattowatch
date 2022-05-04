import {React, useEffect, useState} from 'react';
import {SearchCard} from './SearchCard'
import Loader from 'react-loader-spinner'
// import { useLocation } from 'react-router-dom';
import './App.css';

const SearchResults = ({dt}) => {
    const [movieSearchData, setMovieSearchData] = useState([]);
    const [seriesSearchData, setSeriesSearchData] = useState([]);
    
    useEffect(() => {
      const getSearchSeries = async (data) => {
        await fetch(`https://imdb-api.com/en/API/SearchSeries/k_h33euvtx/${data}`)
        .then((data) => data.json())
        .then((data) => {
            const seriesdata = data["results"].map((sSeries) => ({
                id: sSeries.id,
                image: sSeries.image,
                title: sSeries.title,
                year: sSeries.description
            }));
            setSeriesSearchData(seriesdata);
        });
      }
        getSearchSeries(dt);
    }, [dt]);

    useEffect(() => {
      const getSearchMovie = async (data) => {
        await fetch(`https://imdb-api.com/en/API/SearchMovie/k_h33euvtx/${data}`)
        .then((data) => data.json())
        .then((data) => {
          const moviedata = data["results"].map((sMovie) => ({
            id: sMovie.id,
            image: sMovie.image,
            title: sMovie.title,
            year: sMovie.description
          }));
          setMovieSearchData(moviedata);
        });
      }
      getSearchMovie(dt);
    },[dt]);

  return <div className="my-4 mx-3 flex flex-col sm:mx-4 md:mx-8">
      <div className="searchWrapper" id="searchWrapper">
          <p className="text-white text-xl font-bold my-2">Movies similar to "{dt}"</p>
           {Object.keys(movieSearchData).length===0 && (
                <div id="results" className="my-2 text-lg text-gray-600 font-semibold py-6 px-5 flex justify-center items-center"> <Loader type="Oval" color="#1f2533" width="40" height="40" /> </div>
            ) 
            }
            {Object.keys(movieSearchData).length>0 && (
              <div className="movie-wrapper gap-6 flex-start">
                {
                  movieSearchData.map((seriesData) => {
                    return <SearchCard key={seriesData.id} cid={seriesData.id} title={seriesData.title} image={seriesData.image} />
                  })
                }
              </div>
            )}

          <p className="text-white text-xl font-bold my-2">TV Shows similar to "{dt}"</p> 
            {Object.keys(seriesSearchData).length===0 && (
              <div className="my-2 text-lg text-gray-600 font-semibold py-6 px-5 flex items-center justify-center"> <Loader type="Oval" color="#1f2533" width="40" height="40" /> </div>
            )}
            {Object.keys(seriesSearchData).length>0 && (
              <div className="movie-wrapper gap-6 flex-start">
                {
                  seriesSearchData.map((seriesData) => {
                    return <SearchCard key={seriesData.id} cid={seriesData.id} title={seriesData.title} image={seriesData.image} />
                  })
                }
              </div>
            )}
        </div>
  </div>;
    // return <>
    // <div className="text-white p-5 text-2xl">
    //   movie data: <hr />
    //   {JSON.stringify(movieSearchData)}
    //   series data: <hr/>
    //   {JSON.stringify(seriesSearchData)}
    // </div>
    // </>
};

export default SearchResults;