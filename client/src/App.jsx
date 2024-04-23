import { Route, Routes } from "react-router-dom";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React, { useState, useEffect } from "react";
import Login from "./Components/Login.jsx";
import ScanQR from "./Components/Scanner.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import Navbar from "./Components/Navbar.jsx";
import test from "./Components/test.jsx";
import Mailer from "./Components/Mailer.jsx";

function App() {
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);
  useEffect(() => {
    const initParticles = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setIsParticlesLoaded(true);
      });
    };

    initParticles();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <>      
      <div>
        <Navbar />
      </div>
      <div className="overflow-hidden">
        {isParticlesLoaded && (
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={{
              background: {
                color: {
                  value: "",
                },
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#e8e7e9",
                },
                links: {
                  color: "#000000",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 6,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 120,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "edge",
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
              detectRetina: true,
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          />
        )}
      </div>
      <div 
        className="flex flex-col h-screen justify-center items-center z-10"
       >
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/" Component={Dashboard} />
          <Route path="/mailer" Component={Mailer} />
          <Route path="/scanner" Component={ScanQR} />
          <Route path="/test" Component={test} />
          <Route path="*" element={<div className="text-white pt-10" >Error 404: URL is incorrect</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
