import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import DiscoverPage from "./pages/DiscoverPage"
import CategoryPage from "./pages/CategoryPage"
import CommunityPage from "./pages/CommunityPage"
import ExpertPage from "./pages/ExpertPage"
import AllExpertsPage from "./pages/AllExpertsPage"
import NotFound from "./pages/NotFound"
import CommunityPageFeed from "./pages/community/pages/CommunityPageFeed"
import Layout from "./pages/community/layout/layout"
import ClassroomPage from "./pages/community/pages/ClassroomPage"
import MembersPage from "./pages/community/pages/MembersPage"
import LeaderboardsPage from "./pages/community/pages/LeaderboardsPage"
import AboutPage from "./pages/community/pages/AboutPage"
import CourseDetailPage from "./pages/community/pages/CourseDetailPage"
import MessagesPage from "./pages/community/pages/MessagesPage"
import ProfilePage from "./pages/community/pages/ProfilePage"
import SettingsPage from "./pages/community/pages/SettingsPage"
import AdminPage from "./pages/communityAdmin/pages/AdminPage"
import AdminLayout from "./pages/communityAdmin/Layout/AdminLayout"
import AdminMembersPage from "./pages/communityAdmin/pages/AdminMembersPage"
import AdminContentPage from "./pages/communityAdmin/pages/AdminContentPage"
import AdminCoursesPage from "./pages/communityAdmin/pages/AdminCoursesPage"
import AdminMessagesPage from "./pages/communityAdmin/pages/AdminMessagesPage"
import AdminReportsPage from "./pages/communityAdmin/pages/AdminReportsPage"
import AdminNotificationsPage from "./pages/communityAdmin/pages/AdminNotificationsPage"
import AdminModerationPage from "./pages/communityAdmin/pages/AdminModerationPage"
import AdminSettingsPage from "./pages/communityAdmin/pages/AdminSettingsPage"
import CompanyAboutPage from "./pages/CompanyAboutPage"
import FeaturesPage from "./pages/FeaturesPage"
import CommunityGuidelinesPage from "./pages/CommunityGuidelinesPage"
import HelpCenterPage from "./pages/HelpCenterPage"
import CareersPage from "./pages/CareersPage"
import CommunitySuccessPage from "./pages/CommunitySuccessPage"
import { Toaster } from "./components/ui/sonner"
import CreateCommunityPage from "./pages/CreateCommunityPage"
import CommunityWelcomePage from "./pages/community/pages/CommunityWelcomePage"
import EventsPage from "./pages/community/pages/EventsPage"
import DigitalProductsPage from "./pages/DigitalProductsPage"
import DigitalProductDetailPage from "./pages/DigitalProductDetailPage"
import ProtectedRoute from "./hooks/ProtectedRoute"

const App = () => {
  return (
    <div>
  <Toaster />
      <Routes>
        {/* Normal routes */}


        
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/about" element={<CompanyAboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/digital-products" element={<DigitalProductsPage />} />
        <Route path="/digital-products/:id" element={<DigitalProductDetailPage />} />
        <Route path="/community-guidelines" element={<CommunityGuidelinesPage />} />
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/community-guidlines" element={<FeaturesPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/expert/:id" element={<ExpertPage />} />
        <Route path="/experts" element={<AllExpertsPage />} />
        <Route path="/community-details/:id" element={<CommunityPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/create-community-page" element={<CreateCommunityPage />} />
        <Route path="/community-creation/successfull/:community_id" element={<CommunitySuccessPage />} />


        {/* Community routes */} 
        <Route
  path="/:community_id/community/*"
  element={
    <ProtectedRoute>
      <Layout>
        <Routes>
          <Route path="welcome" element={<CommunityWelcomePage communityId={"30"} />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="feed" element={<CommunityPageFeed />} />
          <Route path="classroom" element={<ClassroomPage />} />
          <Route path="classroom/:courseId" element={<CourseDetailPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="leaderboards" element={<LeaderboardsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="analytics" element={<AdminPage />} />
        </Routes>
      </Layout>
    </ProtectedRoute>
  }
/>

      
      <Route path=":community_id/community/admin/*" element={
          <AdminLayout>
          <Routes>
          <Route path="dashboard" element={<AdminPage />} />
          <Route path="members" element={<AdminMembersPage />} />
          <Route path="content" element={<AdminContentPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
          <Route path="moderation" element={<AdminModerationPage />} />
          <Route path="moderation" element={<AdminSettingsPage />} />
       
          </Routes>
        </AdminLayout>
      } /> 
      
    


       
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
