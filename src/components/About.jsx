import React from 'react';
import '../App.css';
import ButtonLink from './ButtonLink';
import Footer from './Footer';

const ServiceCard = () => (
  <div className='sm:w-[250px] w-full'>
    <div className='w-full green-pink-gradient p-[1px] rounded-[20px]'>
      <div className='rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col' style={{ background: '#151030' }}>
        <h3 className='text-white text-[20px] font-bold text-center'></h3>
      </div>
    </div>
  </div>
);

const About = () => {
  return (
    <div>
      <div className='bg-black h-[calc(93vh)] w-full text-white sm:flex sm:justify-around about  pt-40 overflow-x-hidden' id='about'> {/* Increased py-8 to py-12 and adjusted pt-190px to pt-20 */}
        <div className='flex flex-col justify-around'>
          <div className='sm:px-16 px-2 text-center'> {/* Center align the content */}
            <h2 className='text-4xl sm:text-5xl font-extrabold mt-2'>Introduction</h2>
            <p className='mt-3 mb-6 text-[17px] max-w-3xl leading-[30px]'>👨‍💻 Hello there! I'm Nishchey Khajuria, a passionate full-stack developer with a knack for creating dynamic and responsive web applications. My journey in the tech world began with a fascination for how things work behind the scenes. This curiosity led me to delve into coding, and since then, I've been on an exciting adventure, learning and building amazing projects.
              <br />
              <br/>
              When I'm not coding, you can find me exploring new technologies, reading tech blogs, or experimenting with different frameworks and libraries. I'm always eager to take on new challenges and collaborate with like-minded individuals. Let's connect and create something awesome together! 🌟</p>
            <ButtonLink
              url='https://drive.google.com/file/d/1R1rCBA1MCcTbQj1_RnwiWor-vnerhBf3/view?usp=sharing'
              text='View Resume →'
              padding={`p-3`}
            />
          </div>
          <div className='mt-20 flex justify-center flex-wrap gap-7'>
            {/* Place your ServiceCard components or other content here */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About;
