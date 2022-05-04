import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import Backup from './Backup.js';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
    {/* <Routes>
      <Route exact path="/" element={<TopMovies />} />
      <Route path="/search/:sData" element={<SearchResults />} />
      <Route path="/info/:id" element={<SingleInfo/>} />
      <Route path="*" element={<Error/>} />
    </Routes> */}
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
