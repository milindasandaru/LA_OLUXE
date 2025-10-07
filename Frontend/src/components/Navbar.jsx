import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {setShowSearch, getCartCount} = useContext(ShopContext)

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      {/* Logo */}
      <Link to='/' ><img src={assets.logo} className='w-36' alt='logo' /></Link>

      {/* Navigation Links */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        {['/', '/collection', '/about', '/contact'].map((path, index) => (
          <NavLink
            to={path}
            key={index}
            className="group flex flex-col items-center gap-1"
          >
            <p>{path.replace('/', '').toUpperCase() || 'HOME'}</p>
            <hr
              className='w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity'
            />
          </NavLink>
        ))}
      </ul>

      {/* Icons and Menu */}
      <div className='flex items-center gap-6'>
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className='w-5 cursor-pointer'
          alt='search'
        />

        <div className='group relative'>
          <Link to='/login'><img
            className='w-5 cursor-pointer'
            src={assets.profile_icon}
            alt='profile'
          /></Link>
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>MY Profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>

        <Link to='/cart' className='relative'>
          <img
            className='w-5 min-w-5'
            src={assets.cart_icon}
            alt='cart'
          />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt='menu'
        />
      </div>

      {/* Sidebar Menu for Small Screens */}
      <div
        className={`absolute top-0 bottom-0 right-0 bg-white transition-transform transform ${
          visible ? 'translate-x-0' : 'translate-x-full'
        } w-full sm:hidden`}
      >
        <div className='flex flex-col text-gray-600'>
          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-4 p-3'
          >
            <img
              className='h-4 rotate-180'
              src={assets.dropdown_icon}
              alt='dropdown'
            />
            <p>Back</p>
          </div>
          {['/', '/collection', '/about', '/contact'].map((path, index) => (
            <NavLink
              key={index}
              onClick={() => setVisible(false)}
              className='py-2 pl-6 border'
              to={path}
            >
              {path.replace('/', '').toUpperCase() || 'HOME'}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Navbar


/*const Navbar = () => {

    const [visible, setVisible] = useState(false)

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <img src = {assets.logo} className='w-36' alt = "logo" />

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to='/' className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className="flex flex-col items-center gap-1">
            <p>ABOUT US</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className="flex flex-col items-center gap-1">
            <p>CONTACT US</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

      </ul>

      <div className="flex items-center gap-6">
        <img src={assets.search_icon} className='w-5 cursor-pointer' alt='search' />

            <div className="group relative">
                <img className='w-5 cursor-pointer' src={assets.profile_icon} alt='profile' />
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                        <p className='cursor-pointer hover:text-black'>MY Profile</p>
                        <p className='cursor-pointer hover:text-black'>Orders</p>
                        <p className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>
            </div>

            <Link to='/cart' className='relative'>
                <img className='w-5 min-w-5' src={assets.cart_icon} alt='cart' />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
            </Link>

            <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden'  alt='menu' />

      </div>*/

     // {/* Sidebar menu for small screen */}
     /* <div className={`absolute top-0 bottom-0 right-0 overflaw-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
            <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
                <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='dropdown' />
                <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT US</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT US</NavLink>
        </div>
      </div>

    </div>
  )
}*/