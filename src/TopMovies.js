import {React, useState, useEffect} from 'react';
import PopularMovieCard from './PopularMovieCard';
import Loader from 'react-loader-spinner';
// const PopularMovieCard = lazy( () => import('./PopularMovieCard') );
const TopMovies = ({setId}) => {
    const [topMovies, setTopMovies] = useState([]);
    const [topSeries, setTopSeries] = useState([]);
    
    useEffect(
        () => {
          const getMovieData = async () => {
            await fetch('https://imdb-api.com/en/API/MostPopularMovies/k_h33euvtx')
            .then((data) => data.json())
            .then((data) => {
              const movies = data["items"].map((movieData) => ({
                id : movieData.id,
                title : movieData.title,
                year : movieData.year,
                image : movieData.image,
                imDbRating : movieData.imDbRating
              }));
              setTopMovies(movies.slice(0,24));
            });
          }
          getMovieData();
        } ,
        []
    );

    useEffect(
        () => {
          const getSeriesData = async () => {
            await fetch('https://imdb-api.com/en/API/MostPopularTVs/k_h33euvtx')
            .then((data) => data.json())
            .then((data) => {
              const series = data["items"].map((seriesData) => ({
                id : seriesData.id,
                title : seriesData.title,
                year : seriesData.year,
                image : seriesData.image,
                imDbRating : seriesData.imDbRating
              }));
              setTopSeries(series.slice(0,24));
            });
          }
          getSeriesData();
        } ,
        []
    );

  return <div className="my-4 mx-3 flex flex-col sm:mx-4 md:mx-8">
      {/* <div>
        <a className="bg-white p-2 m-2" href="whatsapp://send?text=Check out this amazing website called Whattowatch here https://whattowatchnext.web.app" data-action="share/whatsapp/share">Share to Whatsapp</a>
      </div> */}
      <div className="latestWrapper" id="latestWrapper">
          <p className="text-white md:text-2xl text-xl font-semibold my-2">Most Popular Movies</p> 
          {Object.keys(topMovies).length ===0 && (
            <div className="flex justify-center items-center my-10"><Loader type="Oval" color="#1f2533" width="40" height="40" /></div>
          )}
          {Object.keys(topMovies).length>0 && (
            <div className="movie-wrapper gap-6 flex-start">
              {
                topMovies.map((movieData, index) => {
                  return <PopularMovieCard setId={setId} cid={movieData.id} key={movieData.id} rank={index} rating={movieData.imDbRating} title={movieData.title} year={movieData.year} image={movieData.image} />
                })
              }
            </div>
            )
          }

          <p className="text-white md:text-2xl text-xl font-bold mt-4 mb-2">Most Popular TV Shows</p> 
          {Object.keys(topMovies).length===0 && (
            <div className="flex justify-center items-center my-10"><Loader type="Oval" color="#1f2533" width="40" height="40" /></div>
          )}
          {Object.keys(topMovies).length>0 &&  (
            <div className="movie-wrapper gap-6 flex-start">
              {
                topSeries.map((seriesData, index) => {
                  return <PopularMovieCard setId={setId} key={seriesData.id} cid={seriesData.id} rank={index} rating={seriesData.imDbRating} title={seriesData.title} year={seriesData.year} image={seriesData.image} />
                })
              }
            </div> 
            )
          }
        </div> 
  </div>;
};

export default TopMovies;