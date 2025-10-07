import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const Contact = () => {
  return (
    <div>

      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb:28">
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="contact_img" />
        <div className="flex flex-col justify-center items-start gap-6 ">
          <p className='font-semibold text-xl text-gry-600'>Our Store</p>
          <p className='text-gray-500'>21 A<br/>Chatham Street,<br/>London,UK</p>
          <p className='text-gray-500'>Tel: 4573-7479-6494 <br/>Email: admin@forever@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Carrers at Forever</p>
          <p className='text-gray-500'>Learn moreabout our teams and job opening.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

      <Newsletter />
      
    </div>
  )
}

export default Contact
