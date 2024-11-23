import { Routes, HashRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bank from "./pages/Bank";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/bank" element={<Bank />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
