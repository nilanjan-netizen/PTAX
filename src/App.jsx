import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import './index.css';
import Home from './components/Home';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step2b from './components/Step2b';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Step6 from './components/Step6';
import Step6b from './components/Step6b';
import Step7 from './components/Step7';
import Step8 from './components/Step8';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './components/Help';


// Main layout wrapper
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <SignedIn>
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/step1" element={<MainLayout><Step1 /></MainLayout>} />
          <Route path="/step2" element={<MainLayout><Step2 /></MainLayout>} />
          <Route path="/step2b" element={<MainLayout><Step2b /></MainLayout>} />
          <Route path="/step3" element={<MainLayout><Step3 /></MainLayout>} />
          <Route path="/step4" element={<MainLayout><Step4 /></MainLayout>} />
          <Route path="/step5" element={<MainLayout><Step5 /></MainLayout>} />
          <Route path="/step6" element={<MainLayout><Step6 /></MainLayout>} />
          <Route path="/step6b" element={<MainLayout><Step6b /></MainLayout>} />
          <Route path="/step7" element={<MainLayout><Step7 /></MainLayout>} />
          <Route path="/step8" element={<MainLayout><Step8 /></MainLayout>} />

          <Route path="/help" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="*" element={<MainLayout><Home /></MainLayout>} />
        </Routes>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="*" element={<SignIn />} />
            </Routes>
          </div>
        </div>
      </SignedOut>
    </>
  );
};

export default App;
