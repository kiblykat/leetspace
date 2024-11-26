import { Routes, HashRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bank from "./pages/Bank";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bank" element={<Bank />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
