import './App.css';
// import { useState, useEffect } from "react"
import { Link, Routes, Route } from "react-router-dom"; 
import HomePage from './pages/HomePage';
// import SignupForm from "./pages/SignupForm"
import { UserProvider } from "./contexts/UserContext";


function App() {

  // const {logout } = useContext(UserContext);

    return (
        <div className="App">
            <UserProvider>

                <HomePage/>

                <Routes>
                    {/* <Route path="/auth/login" element={<SignupForm />} /> */}
                    {/* <Route path="/auth/signup" element={<SignupOrLogin />} /> */}
                </Routes>

            </UserProvider>

        </div>
    );
}

export default App;
