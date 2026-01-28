import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FaQuoteLeft, FaArrowRight, FaUtensils, FaBolt, FaLeaf } from 'react-icons/fa6';
import heroVideo from '../../assets/videos/Kitchen.mp4';
import WhyChooseUs from './WhyChooseUs';
import chefImage from'./image1.png';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const container = useRef();

  useGSAP(() => {
    // Hero Text Animation
    const tl = gsap.timeline();
    tl.from(".hero-text", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    })
      .from(".hero-btn", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.5");

    // "Our Story" Parallax/Fade
    gsap.from(".story-content", {
      scrollTrigger: {
        trigger: ".story-section",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // SVG River Drawing Animation handled in WhyChooseUs.jsx
    // Roadmap Cards Stagger handled in WhyChooseUs.jsx

    // Reviews Horizontal Scroll
    const reviewsContainer = document.querySelector(".reviews-container");
    if (reviewsContainer) {
      // Initial state
      gsap.set(reviewsContainer, { x: 0 });

      gsap.to(reviewsContainer, {
        x: () => -(reviewsContainer.scrollWidth - window.innerWidth + 48), // Adjust padding
        ease: "none",
        scrollTrigger: {
          trigger: ".reviews-section",
          start: "top top",
          end: () => "+=" + (reviewsContainer.scrollWidth - window.innerWidth),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });
    }

  }, { scope: container });

  const reviews = [
    { name: "Sophia M.", role: "Food Critic", review: "The flavors were explosive. The best risotto I've had outside of Italy." },
    { name: "James D.", role: "Regular Guest", review: "Incredible atmosphere. The service makes you feel like royalty." },
    { name: "Elena R.", role: "Event Planner", review: "Hosted my anniversary here. It was flawless from start to finish." },
    { name: "Vikram S.", role: "Chef", review: "A masterclass in culinary arts. The texture combinations are genius." },
    { name: "Sarah J.", role: "Tourist", review: "Highlight of my trip to India. The butter chicken is life-changing!" },
    { name: "Arjun K.", role: "Food Blogger", review: "Instagrammable spots everywhere and the food tastes even better than it looks." },
  ];

  return (
    <div ref={container} className="w-full bg-background overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 select-none">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/30 z-10"></div>
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105">
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <p className="hero-text text-accent font-medium tracking-[0.2em] mb-4 uppercase">Welcome to YumRush</p>
          <h1 className="hero-text text-6xl md:text-8xl font-secondary font-bold text-white mb-8 leading-tight">
            Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Extraordinary</span>
          </h1>
          <p className="hero-text text-lg md:text-xl text-textSecondary mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Immerse yourself in a culinary journey where tradition meets modern artistry.
            Every dish tells a story, every bite is a memory.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/book" className="hero-btn w-full md:w-auto">
              <button className="w-full px-10 py-4 bg-accent text-black rounded-full font-bold text-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(200,155,60,0.3)]">
                Book a Table
              </button>
            </Link>
            <Link to="/menu" className="hero-btn w-full md:w-auto">
              <button className="w-full px-10 py-4 border border-white/20 text-white rounded-full font-medium text-lg hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-2 group">
                View Menu <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="story-section py-32 px-6 relative" id="about">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-xl group-hover:bg-accent/30 transition-all duration-500"></div>
            <img
             
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm5Hk_m9LjSBllH5lkSr8Ur4FyZQfLT65ptw&s" 

              alt="Our Chef"
              className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/5] md:aspect-square transform group-hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
          <div className="story-content space-y-8">
            <div>
              <span className="text-accent uppercase tracking-widest text-sm font-bold">About Us</span>
              <h2 className="text-4xl md:text-5xl font-secondary text-white mt-4 leading-tight">Crafting Moments, <br />Not Just Meals</h2>
            </div>
            <p className="text-textSecondary leading-loose text-lg">
              Founded in 2024, YumRush began with a simple idea: that food should be an experience.
              Our chefs travel the world to bring you authentic flavors, using only the freshest,
              locally-sourced ingredients. We believe in the magic of the dining table - where
              conversations flow and bonds are strengthened.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">15+</h4>
                <p className="text-sm text-textSecondary uppercase tracking-wider">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">50k+</h4>
                <p className="text-sm text-textSecondary uppercase tracking-wider">Happy Guests</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - SEPARATE COMPONENT */}
      <WhyChooseUs />

      {/* REVIEWS SECTION - HORIZONTAL SCROLL */}
      <section className="reviews-section py-20 bg-background overflow-hidden flex flex-col justify-center min-h-screen" id="reviews">
        <div className="container mx-auto px-6 mb-12">
          <span className="text-accent uppercase tracking-widest text-sm font-bold">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-secondary text-white mt-4">Voices of Satisfaction</h2>
        </div>

        <div className="reviews-container flex gap-8 px-6 w-max">
          {reviews.map((review, i) => (
            <div key={i} className="review-card w-[400px] p-10 rounded-3xl bg-surfaceGlass border border-white/10 relative hover:bg-white/5 transition-colors shrink-0 flex flex-col justify-between h-[300px]">
              <div>
                <FaQuoteLeft className="text-5xl text-accent/20 mb-6" />
                <p className="text-textPrimary text-lg leading-relaxed italic mb-6">"{review.review}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-yellow-600 flex items-center justify-center font-bold text-black text-lg shadow-lg">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{review.name}</h4>
                  <p className="text-sm text-accent">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section py-24 px-6 bg-surfaceGlass/50 border-t border-white/5" id="contact">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="contact-content">
            <h2 className="text-3xl md:text-4xl font-secondary text-white mb-6">Get in Touch</h2>
            <div className="space-y-6 text-textSecondary">
              <div className="flex items-start gap-4">
                <span className="bg-accent/20 p-3 rounded-full text-accent"><FaUtensils /></span>
                <div>
                  <h4 className="text-white font-bold mb-1">Visit Us</h4>
                  <p>, Foodie District<br />Global City, 560001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-accent/20 p-3 rounded-full text-accent"><FaBolt /></span>
                <div>
                  <h4 className="text-white font-bold mb-1">Opening Hours</h4>
                  <p>Mon - Sun: 11:00 AM - 11:00 PM<br />Happy Hour: 4:00 PM - 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="bg-accent/20 p-3 rounded-full text-accent"><FaLeaf /></span>
                <div>
                  <h4 className="text-white font-bold mb-1">Contact</h4>
                  <p>+91 987 654 3210<br />reservations@yumrush.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-content relative bg-white/5 rounded-2xl overflow-hidden h-[300px] border border-white/10 group">
            {/* Google Maps Embed */}
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.901241558532!2d77.22728957643534!3d28.602711175681023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/90">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-secondary font-bold text-black mb-8">Ready to Delight Your Senses?</h2>
          <p className="text-black/80 text-xl mb-10 max-w-2xl mx-auto">Book your table now and secure a spot for an evening of unforgettable gastronomy.</p>
          <Link to="/book">
            <button className="px-12 py-5 bg-black text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
              Reserve Your Table
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
