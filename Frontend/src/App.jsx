import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminHome from "./pages/AdminHome.jsx"; // Import your Admin Home component
import UserHome from "./pages/UserHome.jsx"; // Import your User Home component
import Maintenance from "./components/Maintenance.jsx";
import Reports from "./components/Reports.jsx";
import Transactions from "./components/Transactions.jsx";
import AddUpdateMembership from "./components/AddUpdateMembership.jsx";
import AddUpdateBook from "./components/AddUpdateBook.jsx";
import AddUpdateUser from "./components/AddUpdateUser.jsx";
import IssueBook from "./components/IssueBook.jsx";
import AvailableBook from "./components/AvailableBook.jsx";
import ReturnBook from "./components/ReturnBook.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/add-update-membership" element={<AddUpdateMembership/>} />
        <Route path="/add-update-book" element={<AddUpdateBook/>} />
        <Route path="/add-update-user" element={<AddUpdateUser/>} />
        <Route path="/issue-book" element={<IssueBook/>} />
        <Route path="/available" element={<AvailableBook/>} />
        <Route path="/return-book" element={<ReturnBook/>} />
      </Routes>
    </Router>
  );
};

export default App;
