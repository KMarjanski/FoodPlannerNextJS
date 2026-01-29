"use client";

const LandingPage = () => {
  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden"
    >
      {/* Main Title with animations */}
      <div className="relative z-10 text-center">
        <h1 className="text-9xl font-black text-white animate-color-shift animate-pulse-3d tracking-wider drop-shadow-2xl">
          Planer Jedzonka
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
