import React, { useEffect } from 'react';

import '../styles/HeroSection.css';
import img from '../assets/hero_pic.webp';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SplitText from './SplitText';
const HeroSection = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
   <section className='hero-section'>
  <video
    className="video-bg"
    autoPlay
    muted
    loop
  >
    <source src="./my_video.mp4" type="video/mp4" />
  </video>

  <div className="video-overlay"></div>

  <div className="section-content">
    <div className='content-section'>
      <div className='content-left' data-aos="fade-right" data-aos-delay="500">
        <SplitText
          text="Découvrez, réservez et célébrez la CAN 2025  !"
          className='split'
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          
        />
      </div>

      <div className="content-right" data-aos="fade-left" data-aos-delay="1000">
        <img src={img} alt=""/>
        <h3>+ 50 Fan Zones à découvrir</h3>
        <h4>Vivez la passion du football !</h4>
      </div>
    </div>
  </div>
</section>

  );
}

export default HeroSection;
