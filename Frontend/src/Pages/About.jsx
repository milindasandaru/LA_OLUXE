import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div>

      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className="m y-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="about_img" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet est iusto, omnis velit officia quibusdam, aliquam quis repudiandae facere tempora, quidem neque ducimus vitae corporis quaerat sint. Sunt, suscipit laborum?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta atque, vero culpa quo officiis nesciunt dolores voluptatibus pariatur eius adipisci quidem amet minima error temporibus itaque obcaecati voluptate, magni corrupti.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga obcaecati illum adipisci neque! Illo cupiditate maiores rem non voluptatem. Harum quae quis aspernatur in expedita necessitatibus odit consequuntur, corrupti quisquam.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'Why'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quantity Assurance: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius voluptatem dignissimos repellendus voluptatibus voluptas nesciunt odio quaerat provident. Molestiae sunt fugit eius unde quasi officiis aut saepe quaerat hic blanditiis.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius voluptatem dignissimos repellendus voluptatibus voluptas nesciunt odio quaerat provident. Molestiae sunt fugit eius unde quasi officiis aut saepe quaerat hic blanditiis.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius voluptatem dignissimos repellendus voluptatibus voluptas nesciunt odio quaerat provident. Molestiae sunt fugit eius unde quasi officiis aut saepe quaerat hic blanditiis.</p>
        </div>
      </div>

      <Newsletter/>
      
    </div>
  )
}

export default About
