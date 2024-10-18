import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home"
import CreateRule from './components/CreateRule';
import CombineRule from './components/CombineRule';
import ValidateData from './components/ValidateData';

function App() {
  return (
    <Router>
      <div className="m-0 p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-rule" element={<CreateRule />} />
          <Route path="/combine-rule" element={<CombineRule />} /> 
          <Route path="/evaluate-rule" element={<ValidateData />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;