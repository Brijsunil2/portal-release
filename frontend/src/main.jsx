import React, { lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";
import ReactDOM from "react-dom/client";
import store from "./store.js";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const HomeScreen = lazy(() => import("./screens/HomeScreen/HomeScreen.jsx"));
const UserHomeScreen = lazy(() =>
  import("./screens/UserHomeScreen/UserHomeScreen.jsx")
);
const SettingScreen = lazy(() =>
  import("./screens/SettingScreen/SettingScreen.jsx")
);
const ForumsScreen = lazy(() =>
  import("./screens/ForumsScreen/ForumsScreen.jsx")
);
const ForumScreen = lazy(() => import("./screens/ForumScreen/ForumScreen.jsx"));
const NotFoundScreen = lazy(() =>
  import("./screens/NotFoundScreen/NotFoundScreen.jsx")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/home" element={<UserHomeScreen />} />
          <Route path="/settings" element={<SettingScreen />} />
          <Route path="/forums" element={<ForumsScreen />} />
          <Route path="/forum/:id" element={<ForumScreen />} />
        </Route>
        <Route path="*" element={<NotFoundScreen />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
