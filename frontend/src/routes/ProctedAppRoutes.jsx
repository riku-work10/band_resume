import { Routes, Route } from "react-router-dom";
import ResumePage from "../pages/ResumePage";
import MyResumePage from '../pages/MyResumePage';
import MyPage from '../pages/MyPage';
import ResumesShow from '../components/resumes/ResumesShow';
import NotificationPage from '../pages/NotificationPage';
import OpenChatPage from '../pages/OpenChatPage';
import TopPage from '../pages/TopPage';
import ContactPage from '../pages/info/ContactPage';
import PrivacyPolicyPage from '../pages/info/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/info/TermsOfServicePage';
import EventPage from '../pages/EventPage';
import EventShow from '../components/events/EventShow';
import SetlistEditForm from '../components/setlists/SetlistEditForm';
import SetlistForm from '../components/setlists/SetlistForm';
import TaggedEventsPage from '../components/events/TaggedEventsPage';
import ResumesShowSectionItemCreateEdit from '../components/resumes/ResumesShowSectionItemCreateEdit';

const ProctedAppRoutes = () => (
  <Routes>
    <Route path="/" element={<TopPage />} />
    <Route path="/top" element={<TopPage />} />
    <Route path="/events" element={<EventPage />} />
    <Route path="/events/:eventId" element={<EventShow />} /><Route/>
    <Route path="/resumes" element={<ResumePage />} />
    <Route path="/resumes/:resumeId" element={<ResumesShow />} />
    <Route path="/myresumes" element={<MyResumePage />} />
    <Route path="/notification" element={<NotificationPage />} />
    <Route path="/chat" element={<OpenChatPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
    <Route path="/termsofservice" element={<TermsOfServicePage />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/setlistCreate" element={<SetlistForm />} />
    <Route path="/setlistEdit" element={<SetlistEditForm />} />
    <Route path="/events/tag/:tagName" element={<TaggedEventsPage />} />
    <Route path="/resumesectionitemcreateedit" element={<ResumesShowSectionItemCreateEdit />} />
  </Routes>
);

export default ProctedAppRoutes;
