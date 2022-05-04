import { useState } from 'react'
import './App.css'
import {useNavigate, Link, Routes, Route, Outlet} from 'react-router-dom';
import TopMovies from './TopMovies.js';
import SearchResults from './SearchResults.js';
import SingleInfo from './SingleInfo.js';
import Error from './Error.js';
import Register from './Register.js';

function NavBar({setSearchData}) {
  // const [searchData, setSearchData] = useState('');
  const navigate = useNavigate();
  const routeResult = (e) => {
    var val = document.getElementById('searchInputBox').value;
    if(!(val === '')) {
      e.preventDefault();
      setSearchData(val);
      navigate(`/search/${val}` , {state: {sData: val}} );
    }
  }

  return (
    <div className="App">
        {/* <!--  Navbar --> */}
        <Link to="/" className="flex items-center space-between bg-[#0f0f0f] py-2 px-4">
            <div className="title uppercase text-2xl font-bold flex-1 cursor-default text-white">What<span className="text-red-600">To</span>Watch</div>
            <button className="inline button py-1 px-3 pointer hover:bg-gray-200 hover:rounded-md hover:text-gray-900 text-white"><i className="fa fa-user-circle-o text-xl" aria-hidden="true"></i><i className="fa fa-angle-down text-xl ml-2" aria-hidden="true"></i> </button>
        </Link>
        {/* <!-- Search div  --> */}
        <div className="my-4 mx-2 flex items-center justify-center space-x-2 search-div px-2 md:px-8 lg:px-24">
          {/* <!--  Search bar   --> */}
          <div className="flex flex-1 bg-[#9ca3af2c] items-center mx-1 shadow-md hove:shadow-lg focus:shadow-lg rounded-md py-2 px-2 group focus:ring focus:ring-gray-200">
            <form className="flex flex-1" onSubmit={(e)=> {routeResult(e)}}>
              <input type="text" id="searchInputBox" className="grow search-input bg-[#9ca3af00] text-white ml-3 outline-none text-sm font-sans w-full" placeholder="Search movies, TV shows" required />
              <button type="submit" className="grow-0">
                <i className="fa fa-search text-lg ml-2 text-[#757575] font-light hover:text-white p-1 px-2 rounded-md" aria-hidden="true"></i>
              </button>
            </form>
            {/* onClick={() => { searchString() }} */}
          </div>
          {/* <!--  filter --> */}
          {/* <div className="text-white bg-[#9ca3af2c] flex items-center mx-1 p-2 hover:border hover:border-gray-400 border border-[#9ca3af00] rounded-md inline hover:cursor-pointer">
            <i className="fa fa-filter text-md" aria-hidden="true"></i><span className="ml-2 text-sm"> Filter</span>
          </div> */}
          {/* <!--   sort by --> */}
          {/* <div className="text-white bg-[#9ca3af2c] flex items-center mx-1 p-2 hover:border hover:border-gray-400 border border-[#9ca3af00] rounded-md inline hover:cursor-pointer">
            <i className="fa fa-sort-amount-desc text-md" aria-hidden="true"></i><span className="ml-2 text-sm"> Sort By</span>
          </div> */}
        </div>
        <hr className="mx-8 border border-gray-900"/>

        <Outlet />
      </div>
  )
}

function App() {
  const [searchData, setSearchData] = useState('');
  const [id, setId] = useState('');
  return (
    <Routes>
        
        <Route path="/" element={<NavBar setSearchData= {setSearchData} />}>
          <Route index element={<TopMovies setId={setId} />} />
          <Route path="/search/:sData" element={<SearchResults dt={searchData} />} />
          <Route path="/info/:id" element={<SingleInfo />} />
          <Route path="*" element={<Error/>} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
  );
}

export default App;
