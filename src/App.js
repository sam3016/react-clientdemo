import './App.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Client from "./Client";
import AuthProvider from "./AuthProvider";
import Home from "./Home";

function App() {
  return (
      <div className="App">
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/client" element={<Client />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
    </div>
  );
}

export default App;

