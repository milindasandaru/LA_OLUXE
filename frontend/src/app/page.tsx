"use client";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Searchbar from './components/Searchbar';

const Page = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />

      <Navbar />
      <Searchbar />

      <main className="mt-8">
        <Home />
      </main>

      <Footer />
    </div>
  );
};

export default Page;
