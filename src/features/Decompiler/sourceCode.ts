export const initialCode = `
function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black text-white font-sans p-8">
      {/* 
        EDIT THIS CODE! 
        Try changing 'text-blue-500' to 'text-emerald-400' 
      */}
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-30 rounded-full" />
        <h1 className="relative text-6xl md:text-8xl font-black tracking-tighter text-center">
          NISHCHEY <br />
          <span className="text-blue-500">KHAJURIA</span>
        </h1>
      </div>
      
      <p className="mt-8 text-xl text-white/50 text-center max-w-lg font-light leading-relaxed">
        I don't just build websites. I build interactive experiences, live compilers, and AI systems.
      </p>
      
      <div className="mt-12 flex gap-4">
        {/* Try changing the hover color below */}
        <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300">
          View Projects
        </button>
        <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 backdrop-blur-md transition-colors duration-300 border border-white/10">
          Contact Me
        </button>
      </div>
    </div>
  );
}
`;
