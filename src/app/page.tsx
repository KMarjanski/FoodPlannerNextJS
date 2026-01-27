"use client";

const LandingPage = () => {
  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden"
    >
      {/* Aurora Lights Background */}
      {/* <div className="absolute inset-0 bg-black/60"></div> */}
      
      {/* Aurora effect layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Green Aurora Wave 1 */}
        <div
          className="aurora-light aurora-light-1"
          style={{
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse at center, rgba(34, 197, 94, 0.8) 0%, rgba(34, 197, 94, 0.4) 40%, transparent 70%)",
            left: "0%",
            top: "20%",
          }}
        />

        {/* Blue Aurora Wave 2 */}
        <div
          className="aurora-light aurora-light-2"
          style={{
            width: "900px",
            height: "350px",
            background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.7) 0%, rgba(59, 130, 246, 0.3) 40%, transparent 70%)",
            right: "0%",
            top: "40%",
          }}
        />

        {/* Green Aurora Wave 3 */}
        <div
          className="aurora-light aurora-light-3"
          style={{
            width: "700px",
            height: "400px",
            background: "radial-gradient(ellipse at center, rgba(74, 222, 128, 0.6) 0%, rgba(74, 222, 128, 0.2) 40%, transparent 70%)",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "0%",
          }}
        />

        {/* Blue Aurora Accent */}
        <div
          className="aurora-light aurora-light-1"
          style={{
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse at center, rgba(96, 165, 250, 0.5) 0%, rgba(96, 165, 250, 0.2) 40%, transparent 70%)",
            left: "20%",
            top: "50%",
            animationDelay: "3s",
          }}
        />
      </div>

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
