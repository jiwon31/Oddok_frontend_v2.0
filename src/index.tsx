import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./assets/styles";
import MainHome from "@pages/MainHome/MainHome";
import Login from "@pages/Login/Login";
import RedirectPage from "@pages/Login/RedirectPage";
import LogoutRedirectPage from "@pages/LogoutRedirectPage/LogoutRedirectPage";
import Search from "@pages/Search/Search";
import MyPage from "@pages/MyPage/MyPage";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import { PrivateRoute, PublicRoute } from "@pages/Route";
import CreateRoom from "@pages/CreateRoom";
import JoinRoom from "@pages/JoinRoom";
import StudyRoom from "@pages/StudyRoom/StudyRoom";
import ShareStudyTime from "@pages/ShareStudyTime/ShareStudyTime";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
      { path: "/search", element: <Search /> },
      {
        path: "/mypage",
        element: (
          <PrivateRoute>
            <MyPage />
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
