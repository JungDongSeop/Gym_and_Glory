import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import store from './redux/store'
import { Provider } from 'react-redux'
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import bgMovie from "./assets/video_bg.mp4";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /*
  <React.StrictMode>
    <App />
  </React.StrictMode>
  */
 <div className="bg_container">
  <AuthContextProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </AuthContextProvider>

  <div className="movie_bg">
    <video autoPlay loop muted id="bgVideo">
      <source src={bgMovie} type="video/mp4"/>
    </video>
  </div>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
