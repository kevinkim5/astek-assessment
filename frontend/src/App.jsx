import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cafe from "./screens/Cafe";
import Employee from "./screens/Employee";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Cafe />} />
          <Route path="/employees" element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
