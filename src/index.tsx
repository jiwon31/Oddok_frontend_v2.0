import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./assets/styles";
import MainHome from "pages/MainHome/MainHome";
import Login from "pages/Login/Login";
import RedirectPage from "pages/Login/RedirectPage";
import LogoutRedirectPage from "pages/LogoutRedirectPage/LogoutRedirectPage";
import Search from "pages/Search/Search";
import SearchResultPage from "pages/SearchResultPage/SearchResultPage";
import MyPage from "pages/MyPage/MyPage";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage";
import CreateRoom from "pages/CreateRoom";
import JoinRoom from "pages/JoinRoom";
import StudyRoom from "pages/StudyRoom/StudyRoom";
import ShareStudyTime from "pages/ShareStudyTime/ShareStudyTime";
import PublicRoute from "pages/Routes/PublicRoute";
import PrivateRoute from "pages/Routes/PrivateRoute";
import Layout from "components/layout/Layout";
// import axios from "axios";
import App from "./App";

// axios.defaults.withCredentials = true;
// axios.defaults.timeout = 30000;
// axios.defaults.headers.common["Content-Type"] = "application/json";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, path: "/", element: <MainHome /> },
          {
            path: "/login",
            element: (
              <PublicRoute restricted>
                <Login />
              </PublicRoute>
            ),
          },
          { path: "/search", element: <Search /> },
          { path: "/search/studyroom", element: <SearchResultPage /> },
          {
            path: "/mypage",
            element: (
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/login/oauth2/code/kakao",
        element: (
          <PublicRoute restricted>
            <RedirectPage />
          </PublicRoute>
        ),
      },
      {
        path: "/logout/oauth2/code/kakao",
        element: (
          <PrivateRoute>
            <LogoutRedirectPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/studyroom/create",
        element: (
          <PrivateRoute>
            <CreateRoom />
          </PrivateRoute>
        ),
      },
      {
        path: "/studyroom/:roomId/setting",
        element: (
          <PrivateRoute>
            <JoinRoom />
          </PrivateRoute>
        ),
      },
      {
        path: "/studyroom/:roomId",
        element: (
          <PrivateRoute>
            <StudyRoom />
          </PrivateRoute>
        ),
      },
      {
        path: "/share/study-time",
        element: (
          <PrivateRoute>
            <ShareStudyTime />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
