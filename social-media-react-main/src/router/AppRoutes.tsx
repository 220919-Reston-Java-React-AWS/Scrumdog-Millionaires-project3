import React from 'react';
import { Route, Routes } from "react-router-dom";
import ChangePassword from '../components/change-password/ChangePassword';
import Login from '../components/login/Login';
import { PostFeed } from '../components/post-feed/PostFeed';
import Register from '../components/register/Register';
import UserProfile from '../components/user-profile/UserProfile';

export const AppRoutes: React.FC<unknown> = () => (
  <Routes>
    <Route path="/" element={<PostFeed />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/change-password" element={<ChangePassword />} />
    <Route path = "/profile" element={<UserProfile />} />
  </Routes>
)