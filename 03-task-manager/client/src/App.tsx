import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { SingleTaskPage } from "./pages/SingleTaskPage";

function App() {
  return (
    <div className="w-[60rem] mx-auto">
      <div className="flex justify-center">
        <p className="text-3xl font-bold underline text-red-500">
          Task Manager App
        </p>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task/:id" element={<SingleTaskPage />} />
          <Route path="*" element={<div>404 Not Found This Page</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
