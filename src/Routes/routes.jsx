//Define public Pages
import React from "react";
import Blogger from "../Pages/Blogger";
import InnerBlog from "../Pages/InnerBlog";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import UserDashboard from "../Pages/UserDashboard";
import MainLayout from "../Layout/MainLayout";
import Blogs from "../Pages/Blogs";
import Profile from "../Pages/Profile";
import SearchBoard from '../Component/SearchBoard/SearchBoard';
//Define public Routes
const publicRoutes = [
  {
    path: "/blogger",
    role: "Blogger",
    element: (
      <MainLayout>
        <Blogger></Blogger>
      </MainLayout>
    ),
  },
  {
    path: "/blog", //Paths này sau này phải có thêm id để load ra bài Blog tương ứng, tạm suy nghĩ sau
    role: "InnerBlog",
    element: <MainLayout>
      <InnerBlog></InnerBlog>
    </MainLayout>,
  },
  {
    path: "/login",
    role: "Login",
    element: <Login />,
  },
  {
    path: "/register",
    role: "Register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    role: "Dashboard",
    element:
      <MainLayout>
        <UserDashboard></UserDashboard>
      </MainLayout>
  },
  {
    path: '/',
    role: 'Blogs Page',
    element:
      <MainLayout>
        <Blogs></Blogs>
      </MainLayout>
  },
  {
    path: '/search',
    role: 'Search Page',
    element:
      <MainLayout>
        <SearchBoard></SearchBoard>
      </MainLayout>
  },
  {
    path: '/profile',
    role: 'Profile Page',
    element: <MainLayout>
      <Profile></Profile>
    </MainLayout>
  }
];
//Define private routes
const privateRoutes = [
  {
    path: "/admin",
    role: "Admin",
    element: undefined,
  },
];
export { publicRoutes, privateRoutes };
