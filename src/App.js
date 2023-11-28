import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignIn";
import PageNoteFound from "./pages/PageNoteFound";
import SignIn from "./pages/SignUp";
import Dashboard from "./pages/dashbord";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
function App(props) {

  return (
    <div className="bg-home w-[400px] h-full">
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNoteFound />} />
      </Routes>
    </div>
  );
}

export default App;
