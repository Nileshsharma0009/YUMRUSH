import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    FaLeaf,
    FaAward,
    FaUtensils,
    FaBolt,
    FaWineGlass,
    FaUserShield,
    FaCalendarDay,
    FaMapPin
} from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
    const container = useRef(null);

    useGSAP(
        () => {
            /* ================= SVG RIVER DRAW ================= */
            const river = document.querySelector(".river-path");

            if (river) {
                const length = river.getTotalLength();

                gsap.set(river, {
                    strokeDasharray: length,
                    strokeDashoffset: length
                });

                gsap.to(river, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 85%",
                        end: "bottom 75%",
                        scrub: 1
                    }
                });
            }

            /* ================= FEATURE CARDS ================= */
            gsap.utils.toArray(".roadmap-card").forEach((card, i) => {
                gsap.fromTo(
                    card,
                    {
                        autoAlpha: 0,
                        scale: 0.94,
                        y: 30,
                        x: i % 2 === 0 ? -20 : 20
                    },
                    {
                        autoAlpha: 1,
                        scale: 1,
                        y: 0,
                        x: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 88%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        },
        { scope: container }
    );

    /* ================= FEATURES (COMPRESSED) ================= */
    const features = [
        { icon: FaUtensils, title: "Global Fusion", desc: "Italian, Asian, Modern Indian cuisines.", top: "5%", side: "left" },
        { icon: FaAward, title: "Premium Ambience", desc: "Private dining pods & rooftop views.", top: "20%", side: "right" },
        { icon: FaLeaf, title: "Artisan Plating", desc: "Visual masterpieces crafted for the 'Gram.", top: "35%", side: "left" },
        { icon: FaBolt, title: "Live Kitchen", desc: "Watch master chefs in action.", top: "50%", side: "right" },
        { icon: FaWineGlass, title: "Signature Mixology", desc: "Bespoke craft cocktails.", top: "65%", side: "left" },
        { icon: FaUserShield, title: "Zero-Contact Hygiene", desc: "Hospital-grade sanitization protocols.", top: "80%", side: "right" },
        // { icon: FaCalendarDay, title: "Curated Events", desc: "We script your story.", top: "85%", side: "left" },
        // { icon: FaMapPin, title: "Zero-Mile Sourcing", desc: "Farm-to-table freshness.", top: "95%", side: "center" }
    ];

    return (
        <section
            ref={container}
            className="features-section py-20 bg-surfaceGlass border-y border-white/5 relative overflow-hidden"
        >
            {/* Soft Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-secondary text-white mb-6">
                        Why Choose YumRush?
                    </h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
                    <p className="mt-4 text-textSecondary">
                        Follow the winding path of excellence
                    </p>
                </div>

                {/* River + Cards */}
                <div className="relative w-full max-w-6xl mx-auto h-[1000px] md:h-[900px]">
                    {/* SVG RIVER */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#C89B3C" stopOpacity="0.2" />
                                <stop offset="50%" stopColor="#C89B3C" stopOpacity="1" />
                                <stop offset="100%" stopColor="#C89B3C" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>

                        <path
                            d="M10 0 C 40 5, 90 15, 90 25 S 10 35, 10 50 S 90 65, 90 75 S 10 85, 90 100"
                            fill="none"
                            stroke="white"
                            strokeOpacity="0.05"
                            strokeWidth="0.5"
                        />

                        <path
                            className="river-path"
                            d="M10 0 C 40 5, 90 15, 90 25 S 10 35, 10 50 S 90 65, 90 75 S 10 85, 90 100"
                            fill="none"
                            stroke="url(#riverGradient)"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* FEATURE CARDS */}
                    {features.map((item, i) => (
                        <div
                            key={i}
                            className="absolute w-full flex pointer-events-none"
                            style={{ top: item.top }}
                        >
                            <div
                                className={`w-full flex ${item.side === "left"
                                    ? "justify-start md:pl-[0%]"
                                    : item.side === "right"
                                        ? "justify-end md:pr-[0%]"
                                        : "justify-center"
                                    } px-4 md:px-12`}
                            >
                                <div className="roadmap-card pointer-events-auto w-full md:w-[35%] bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors group">
                                    <div className="w-12 h-12 shrink-0 bg-black rounded-full flex items-center justify-center text-accent text-xl border border-white/10 shadow-[0_0_15px_rgba(200,155,60,0.3)] group-hover:scale-110 transition-transform">
                                        <item.icon />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-textSecondary">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
