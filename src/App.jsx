import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home"

function App() {
  return (
    <Router>
      <div className="m-0 p-0">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;