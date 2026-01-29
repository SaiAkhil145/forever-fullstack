/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import MyProfile from './pages/MyProfile'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -30,
  },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeInOut",
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  const location = useLocation();

  return (
    <>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />
        <Navbar />
        <SearchBar />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            } />

            <Route path='/about' element={
              <AnimatedPage>
                <About />
              </AnimatedPage>
            } />

            <Route path='/collection' element={
              <AnimatedPage>
                <Collection />
              </AnimatedPage>
            } />

            <Route path='/contact' element={
              <AnimatedPage>
                <Contact />
              </AnimatedPage>
            } />

            <Route path='/product/:productId' element={
              <AnimatedPage>
                <Product />
              </AnimatedPage>
            } />

            <Route path='/cart' element={
              <AnimatedPage>
                <Cart />
              </AnimatedPage>
            } />

            <Route path='/login' element={
              <AnimatedPage>
                <Login />
              </AnimatedPage>
            } />

            <Route path='/place-order' element={
              <AnimatedPage>
                <PlaceOrder />
              </AnimatedPage>
            } />

            <Route path='/order' element={
              <AnimatedPage>
                <Orders />
              </AnimatedPage>
            } />
            <Route path='/profile' element={
              <AnimatedPage>
                <MyProfile />
              </AnimatedPage>
            } />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </>
  )
}

export default App;
