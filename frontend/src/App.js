import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import "./index.css";

import Header from './components/layout/Header';
import Footer from "./components/layout/Footer";
import TaskPage from "./pages/TaskPage";
import HomePage from "./pages/HomePage";
import LivePage from "./pages/LivePage";
import ResumePage from "./pages/ResumePage";
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Mypage from './pages/MyPage';

const App = () => {
  


  return (

    <div>
      <BrowserRouter>
      <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lives" element={<LivePage />} />
          <Route path="/resumes" element={<ResumePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/tasks" element={<TaskPage />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </BrowserRouter>
    </div> 
  )
};

export default App;