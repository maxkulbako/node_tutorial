import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { SingleTaskPage } from "./pages/SingleTaskPage";

function App() {
  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <header className="py-8 mb-8">
        <div className="text-center space-y-4">
          <h1
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                         from-blue-400 to-emerald-400"
          >
            Task Manager
          </h1>
          <p className="text-gray-400 text-lg">
            Organize your tasks efficiently
          </p>
          <div
            className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-400 to-emerald-400 
                          rounded-full"
          ></div>
        </div>
      </header>
      <main
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl 
                      border border-gray-700/50 min-h-[calc(100vh-12rem)]"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task/:id" element={<SingleTaskPage />} />
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <h2 className="text-3xl font-bold text-gray-400 mb-4">404</h2>
                <p className="text-gray-500">Oops! This page doesn't exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
