//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// import LoginPagec from './pages/login';
// import HomePagec from './pages/homec';
//import {BrowserRouter,Routes,Route} from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from './pages/home';
import Reg from './pages/reg';
// import HomePageCopy from './pages/home copy';
// import Hom from './pages/hom';
import Dashboard from './pages/dashboard';
import Signin from './pages/signin';
import Paynow from './pages/paynow';

import Payment from './pages/payment';
import ShowPayment from './pages/showPayment';
import ViewTransactions from './pages/view-trans';
import EmpLogin from './pages/empLogin';
import Verify from './pages/verify';



function App() {
  // const id=useParams()
  return (
   
    
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

<BrowserRouter>
<Routes>

<Route path="/" element={<Signin />} />
{/* <Route path="/home" element={<HomePagec />} /> */}
{/* <Route path="/home2" element={<HomePage />} /> */}
<Route path="/reg" element={<Reg />} />
{/* <Route path="/regi" element={<HomePageCopy />} /> */}
{/* <Route path="/regis" element={<Hom />} /> */}
<Route path="/show-payment/:acc" element={<ShowPayment />} />
<Route path="/payment" element={<Payment />} />
<Route path="/view-trans/:id" element={<ViewTransactions />} />
<Route path="/verify/:id" element={<Verify />} />
<Route path="/empLogin" element={<EmpLogin />} />
<Route path="/dashboard/:id" element={<Dashboard />} />
<Route path="/paynow/:id" element={<Paynow />} />
<Route path="/signin" element={<Signin />} />
{/* <Route Path="/login" element={<LoginPagec />}/> */}

</Routes>
</BrowserRouter>


  );
}

export default App;
