import { useState, useEffect } from 'react'
import './App.css'
import Loader from 'react-loader-spinner'
import {PopularMovieCard} from './PopularMovieCard'
import {SearchCard} from './SearchCard'

function Backup () {
  const [topMovies, setTopMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [movieSearchData, setMovieSearchData] = useState([]);
  const [seriesSearchData, setSeriesSearchData] = useState([]);

  const getSearchMovie = async (data) => {
    await fetch(`https://imdb-api.com/en/API/SearchMovie/k_h33euvtx/${data}`)
    .then((data) => data.json())
    .then((data) => {
      const sData = data["results"].map((sMovie) => ({
        id: sMovie.id,
        image: sMovie.image,
        title: sMovie.title,
        year: sMovie.description
      }));
      setMovieSearchData(sData);
    });
  }
  
  const getSearchSeries = async (data) => {
    await fetch(`https://imdb-api.com/en/API/SearchSeries/k_h33euvtx/${data}`)
    .then((data) => data.json())
    .then((data) => {
      const sData = data["results"].map((sSeries) => ({
        id: sSeries.id,
        image: sSeries.image,
        title: sSeries.title,
        year: sSeries.description
      }));
      setSeriesSearchData(sData);
    });
  }
  
  function searchString() {
    var search = document.getElementById('searchInputBox').value;
    if(search === '') {
      setSearchData(search);
      document.getElementById('searchWrapper').style.display = "none";
      document.getElementById('latestWrapper').style.display = "initial";
    } else {
      setSearchData(search);
      document.getElementById('searchWrapper').style.display = "initial";
      document.getElementById('latestWrapper').style.display = "none";
      getSearchMovie(searchData);
      getSearchSeries(searchData);
    }
  }

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

  return (
    <div className="App">
      {searchString}
      {/* <!--  Navbar --> */}
      <div className="flex items-center space-between bg-[#0f0f0f] py-2 px-4">
          <div className="title uppercase text-2xl font-bold flex-1 cursor-default text-white">What<span className="text-red-600">To</span>Watch</div>
          <button className="inline button py-1 px-3 pointer hover:bg-gray-200 hover:rounded-md hover:text-gray-900 text-white"><i className="fa fa-user-circle-o text-xl" aria-hidden="true"></i><i className="fa fa-angle-down text-xl ml-2" aria-hidden="true"></i> </button>
      </div>
      {/* <!-- Search div  --> */}
      <div className="my-4 mx-2 flex items-center justify-center space-x-2 search-div md:px-8 lg:px-20">
          {/* <!--  Search bar   --> */}
          <div className="flex flex-1 bg-[#9ca3af2c] items-center mx-1 shadow-md hove:shadow-lg focus:shadow-lg rounded-md py-2 px-2 group focus:ring focus:ring-gray-200">
            <input type="text" id="searchInputBox" className="bg-[#9ca3af00] text-white ml-3 outline-none text-sm font-sans w-full" placeholder="Search movies, TV shows" value={searchData} onChange={(e) => {setSearchData(e.target.value)}} />
            <i className="fa fa-search text-lg ml-2 text-white font-light hover:bg-[#1f2533] hover:text-white p-1 px-2 rounded-md" onClick={() => { searchString() }} aria-hidden="true"></i>
          </div>
          {/* <!--  filter --> */}
          <div className="text-white bg-[#9ca3af2c] flex items-center mx-1 p-2 hover:border hover:border-gray-400 border border-[#9ca3af00] rounded-md inline hover:cursor-pointer">
            <i className="fa fa-filter text-md" aria-hidden="true"></i><span className="ml-2 text-sm"> Filter</span>
          </div>
          {/* <!--   sort by --> */}
          <div className="text-white bg-[#9ca3af2c] flex items-center mx-1 p-2 hover:border hover:border-gray-400 border border-[#9ca3af00] rounded-md inline hover:cursor-pointer">
            <i className="fa fa-sort-amount-desc text-md" aria-hidden="true"></i><span className="ml-2 text-sm"> Sort By</span>
          </div>
      </div>
      <hr className="mx-8 border border-gray-900"/>
      <div className="my-4 mx-3 flex flex-col sm:mx-4 md:mx-8">
        <div className="latestWrapper" id="latestWrapper">
          <p className="text-white md:text-2xl text-xl font-semibold my-2">Most Popular Movies</p> 
          {Object.keys(topMovies).length ===0 && (
            <div className="flex justify-center items-center my-10"><Loader type="Oval" color="#1f2533" width="40" height="40" /></div>
          )}
          {Object.keys(topMovies).length>0 && (
            <div className="movie-wrapper gap-6 flex-start">
              {
                topMovies.map((movieData, index) => {
                  return <PopularMovieCard key={movieData.id} rank={index} rating={movieData.imDbRating} title={movieData.title} year={movieData.year} image={movieData.image} />
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
                  return <PopularMovieCard key={seriesData.id} rank={index} rating={seriesData.imDbRating} title={seriesData.title} year={seriesData.year} image={seriesData.image} />
                })
              }
            </div> 
            )
          }
        </div> 
        
        <div className="searchWrapper" id="searchWrapper" style={{display: "none"}}>
          <p className="text-white text-xl font-bold my-2">Movies similar to "{searchData}"</p>
            {Object.keys(movieSearchData).length===0 && (
                <div id="results" className="my-2 text-lg text-gray-600 font-semibold"> <Loader type="Oval" color="#1f2533" width="40" height="40" /> </div>
            ) 
            }
            {Object.keys(movieSearchData).length>0 && (
              <div className="movie-wrapper gap-6 flex-start">
                {
                  movieSearchData.map((seriesData) => {
                    return <SearchCard key={seriesData.id} title={seriesData.title} image={seriesData.image} />
                  })
                }
              </div>
            )}

          <p className="text-white text-xl font-bold my-2">TV Shows similar to "{searchData}"</p> 
            {Object.keys(seriesSearchData).length===0 && (
              <div className="my-2 text-lg text-gray-600 font-semibold"> <Loader type="Oval" color="#1f2533" width="40" height="40" /> </div>
            )}
            {Object.keys(seriesSearchData).length>0 && (
              <div className="movie-wrapper gap-6 flex-start">
                {
                  seriesSearchData.map((seriesData) => {
                    return <SearchCard key={seriesData.id} title={seriesData.title} image={seriesData.image} />
                  })
                }
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Backup