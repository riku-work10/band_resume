import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import "./index.css";

import Header from './components/layout/Header';
import Footer from "./components/layout/Footer";
import TaskPage from "./pages/TaskPage";
import HomePage from "./pages/HomePage";
import LivePage from "./pages/LivePage";
import ResumePage from "./pages/ResumePage";
import MyPage from "./pages/MyPage";
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import MyResumePage from './pages/MyResumePage';
import NotificationPage from './pages/NotificationPage';
import OpenChatPage from './pages/OpenChatPage';
import TopPage from './pages/TopPage';
import ContactPage from './pages/info/ContactPage';
import PrivacyPolicyPage from './pages/info/PrivacyPolicyPage';
import TermsOfServicePage from './pages/info/TermsOfServicePage';
import { AuthProvider } from './hooks/AuthContext';
import ResumesShow from './components/resumes/ResumesShow';
import ResumesCreate from './components/resumes/ResumesCreate';
import ResumesEdit from './components/resumes/ResumesEdit';

const App = () => {
  


  return (

    <AuthProvider>
      <BrowserRouter>
      <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/lives" element={<LivePage />} />
          <Route path="/resumes" element={<ResumePage />} />
          <Route path="/resumes/create" element={<ResumesCreate />} />
          <Route path="/resumes/edit" element={<ResumesEdit />} />
          <Route path="/resumes/:resumeId" element={<ResumesShow />} />
          <Route path="/myresumes" element={<MyResumePage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/chat" element={<OpenChatPage />} />
          <Route path="/top" element={<TopPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
          <Route path="/termspfservice" element={<TermsOfServicePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/mypage" element={<MyPage />} />
          
        </Routes>
      </main>
      <Footer />
      </div>
    </BrowserRouter>
    </AuthProvider>
  )
};

export default App;