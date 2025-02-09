import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
// import SignInPage from "./components/siginIn";
// import SignUpPage from "./components/signUp";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}


export default App;