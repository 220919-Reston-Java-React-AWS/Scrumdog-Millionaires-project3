import React from 'react';
import { Route, Routes } from "react-router-dom";
import ChangePassword from '../components/change-password/ChangePassword';
import DirectMessaging from '../components/direct-messaging/DirectMessaging';
import Login from '../components/login/Login';
import { PostFeed } from '../components/post-feed/PostFeed';
import Register from '../components/register/Register';
import OtherUsers from '../components/user-profile/OtherUsers';
import AboutMe from '../components/user-profile/subpages/AboutMe';
import Places from '../components/user-profile/subpages/Places';
import UserProfile from '../components/user-profile/UserProfile';

export const AppRoutes: React.FC<unknown> = () => (
  <Routes>
    <Route path="/" element={<PostFeed />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/change-password" element={<ChangePassword />} />
    <Route path = "/current-profile" element={<UserProfile />} />
    <Route path = "/other-user" element={<OtherUsers />} />
    <Route path = "/messages" element={<DirectMessaging />} />
    <Route path = "/places" element = {<Places />} />
    <Route path = "/about-me" element = {<AboutMe/>} />
  </Routes>
)