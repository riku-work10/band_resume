import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PrivacyPolicyPage from '../pages/info/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/info/TermsOfServicePage';
import SignUp from '../components/auth/SignUp';
import SignIn from '../components/auth/SignIn';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import ContactPage from '../pages/info/ContactPage';
import ResumesShow from '../components/resumes/ResumesShow';
import EventShow from '../components/events/EventShow';

function PublicAppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
      <Route path="/termsofservice" element={<TermsOfServicePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/password/forgot" element={<ForgotPasswordForm />} />
      <Route path="/password/reset" element={<ResetPasswordForm />} />
      <Route path="/resumes/:resumeId" element={<ResumesShow />} />
      <Route path="/events/:eventId" element={<EventShow />} />
    </Routes>
  );
}

export default PublicAppRoutes;
