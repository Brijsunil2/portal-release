import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen.jsx";

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
