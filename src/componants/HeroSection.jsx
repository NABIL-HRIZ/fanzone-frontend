import React, { useEffect } from 'react';

import '../styles/HeroSection.css';
import img from '../assets/hero_pic.webp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import SplitText from './SplitText';
const HeroSection = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <section className='hero-section'>
      <div className="section-content" >

        <video
        className="video-bg"
         autoPlay
        muted   
         loop     
      >
        <source src="./fan_video.mp4" type="video/mp4" />  
        
      </video>  
       
       

    
        <div className='content-section' style={{backgroundColor:'transparent'}}>
          
          <div 
            className='content-left' data-aos="fade-right" data-aos-delay="500" style={{backgroundColor:'transparent',marginBottom:'50px'}}>

          
 
          


<SplitText
  text="Découvrez, réservez et célébrez la CAN 2025  !"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  style={{ fontSize: "50px", color: "white" }}
/>

           
            <p style={{width:'90%', backgroundColor:'transparent',textAlign:"center"}}>Réservez vos places, explorez les fan zones et plongez dans l’univers unique de la CAN 2025 en un seul clic.</p>
           
          </div>

        
          <div 
            className="content-right"  
            data-aos="fade-left"
            data-aos-delay="1000"
            style={{marginBottom:'50px'}} 
          >
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
