import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const About = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from(imageRef.current, {
            x: -100,
            opacity: 0,
            duration: 1.2
        })
            .from(textRef.current, {
                x: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2
            }, "-=0.8");

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="min-h-screen pt-24 px-6 bg-background text-textPrimary overflow-hidden flex items-center justify-center relative">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center z-10">

                {/* Image Section */}
                <div ref={imageRef} className="relative group">
                    <div className="absolute -inset-4 bg-accent/20 rounded-xl blur-lg transition-all group-hover:bg-accent/30"></div>
                    <div className="relative overflow-hidden rounded-xl shadow-2xl border border-white/10">
                        <img
                            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                            alt="Our Restaurant Interior"
                            className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-6 left-6">
                            <p className="text-accent font-secondary text-xl">Est. 2024</p>
                        </div>
                    </div>
                </div>

                {/* Text Section */}
                <div ref={textRef} className="space-y-6">
                    <h1 className="text-5xl md:text-6xl font-secondary font-bold leading-tight">
                        Crafting <span className="text-accent">Memories</span>, <br /> One Bite at a Time.
                    </h1>
                    <p className="text-textSecondary text-lg leading-relaxed">
                        At <span className="text-white font-bold">YumRush</span>, we believe that food is more than just sustenance—it's an experience.
                        Born from a passion for culinary excellence, we bring together the freshest ingredients and innovative recipes to create dishes that delight the senses.
                    </p>
                    <p className="text-textSecondary text-lg leading-relaxed">
                        Whether you're here for a quick coffee, a family dinner, or a special celebration, our warm ambiance and dedicated staff ensure that every moment is special.
                    </p>

                    <div className="pt-4 flex gap-6">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-accent">50+</h3>
                            <p className="text-sm text-textSecondary uppercase tracking-widest">Dishes</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-accent">15k+</h3>
                            <p className="text-sm text-textSecondary uppercase tracking-widest">Happy Customers</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-accent">4.9</h3>
                            <p className="text-sm text-textSecondary uppercase tracking-widest">Rating</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
