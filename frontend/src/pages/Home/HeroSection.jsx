import kitchenVideo from "../../assets/videos/kitchen.mp4";
import "./home.css";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      <video
        className="absolute inset-0 w-screen h-screen object-cover z-0"
        src={kitchenVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="relative z-20 flex h-full items-center px-24">
        <div className="max-w-xl text-white">
          <h1 className="text-6xl font-bold mb-4">YumRush</h1>

          <p className="uppercase tracking-widest text-orange-400 font-semibold mb-4">
            Clean • Crafted • Trusted
          </p>

          <p className="text-gray-200 leading-relaxed mb-8">
            Experience authentic flavors prepared in spotless kitchens
            by skilled chefs using responsibly sourced ingredients.
          </p>

          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 font-medium">
              Order Now
            </button>
            <button className="px-8 py-3 rounded-lg border border-white/70">
              Book a Table
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
