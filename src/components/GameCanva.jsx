import React, { useRef, useEffect, useState } from "react";
import { NES } from "jsnes";
import { useParams } from "react-router-dom";

import superMarioThreeRom from "../games/superMario3.nes";
import contraRom from "../games/contra.nes";
import superCRom from "../games/superC.nes";
import zeldaRom from "../games/zelda.nes";
import sonicRom from "../games/sonic.nes";
import superMarioRom from "../games/superMario.nes";
import superMarioTwoRom from "../games/superMario2.nes";
import battleCityRom from "../games/battlecity.nes";
import bombermanRom from "../games/bomberman.nes";
import metroidRom from "../games/metroid.nes";
import drMarioRom from "../games/drMario.nes";
import donkeyKongRom from "../games/donkeykong.nes";

const romFiles = {
  superMario: superMarioRom,
  superMario2: superMarioTwoRom,
  superMario3: superMarioThreeRom,
  contra: contraRom,
  superC: superCRom,
  battleCity: battleCityRom,
  zelda: zeldaRom,
  sonic: sonicRom,
  bomberman: bombermanRom,
  metroid: metroidRom,
  drMario: drMarioRom,
  donkeyKong: donkeyKongRom,
};

const GameCanva = () => {
  const { name } = useParams();
  const canvasRef = useRef(null);
  const frameId = useRef(null);
  const nesRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // NES native resolution
  const NES_WIDTH = 256;
  const NES_HEIGHT = 240;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    nesRef.current = new NES({
      onFrame: (frameBuffer) => {
        renderFrame(frameBuffer);
      },
      sampleRate: 44100,
    });

    setupKeyboardControls();
    handleResize();
    loadAndStartROM();

    window.addEventListener("resize", handleResize);

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      removeKeyboardControls();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = NES_WIDTH;
    canvas.height = NES_HEIGHT;

    const windowRatio = window.innerWidth / window.innerHeight;
    const nesRatio = NES_WIDTH / NES_HEIGHT;

    let scaledWidth, scaledHeight;

    if (window.innerWidth <= 768) {
      scaledWidth = window.innerWidth;
      scaledHeight = scaledWidth / nesRatio;

      const controlsHeight = window.innerHeight * 0.3; // 30% of screen height for controls
      const availableHeightForGame = window.innerHeight - controlsHeight;

      if (scaledHeight > availableHeightForGame) {
        scaledHeight = availableHeightForGame;
        scaledWidth = scaledHeight * nesRatio;
      }
    } else {
      if (windowRatio > nesRatio) {
        scaledHeight = window.innerHeight;
        scaledWidth = scaledHeight * nesRatio;
      } else {
        scaledWidth = window.innerWidth;
        scaledHeight = scaledWidth / nesRatio;
      }
    }

    canvas.style.width = `${scaledWidth}px`;
    canvas.style.height = `${scaledHeight}px`;
  };

  const loadAndStartROM = async () => {
    try {
      const response = await fetch(romFiles[name]);
      const arrayBuffer = await response.arrayBuffer();

      const binaryString = Array.from(new Uint8Array(arrayBuffer))
        .map((byte) => String.fromCharCode(byte))
        .join("");

      if (nesRef.current) {
        nesRef.current.loadROM(binaryString);
        startGameLoop();
      }
    } catch (error) {
      console.error("Error fetching ROM:", error);
    }
  };

  const startGameLoop = () => {
    const FPS = 60;
    const FRAME_MIN_TIME = (1000 / FPS) * 1;

    let lastFrameTime = 0;

    const frameLoop = (timestamp) => {
      if (nesRef.current) {
        if (timestamp - lastFrameTime > FRAME_MIN_TIME) {
          nesRef.current.frame();
          lastFrameTime = timestamp;
        }
        frameId.current = requestAnimationFrame(frameLoop);
      }
    };

    frameId.current = requestAnimationFrame(frameLoop);
  };

  const renderFrame = (frameBuffer) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(NES_WIDTH, NES_HEIGHT);

    for (let i = 0; i < NES_WIDTH * NES_HEIGHT; i++) {
      const offset = i * 4;
      imageData.data[offset] = frameBuffer[i] & 0xff;
      imageData.data[offset + 1] = (frameBuffer[i] >> 8) & 0xff;
      imageData.data[offset + 2] = (frameBuffer[i] >> 16) & 0xff;
      imageData.data[offset + 3] = 0xff;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const setupKeyboardControls = () => {
    const KEYS = {
      38: { controller: 1, button: 4 }, // Up Arrow
      40: { controller: 1, button: 5 }, // Down Arrow
      37: { controller: 1, button: 6 }, // Left Arrow
      39: { controller: 1, button: 7 }, // Right Arrow
      90: { controller: 1, button: 0 }, // B (Z key)
      88: { controller: 1, button: 1 }, // A (X key)
      32: { controller: 1, button: 3 }, // Start (Space key)
      13: { controller: 1, button: 2 }, // Select (Enter key)
    };

    window.keyDownHandler = (e) => {
      const key = KEYS[e.keyCode];
      if (key && nesRef.current) {
        nesRef.current.buttonDown(key.controller, key.button);
        e.preventDefault();
      }
    };

    window.keyUpHandler = (e) => {
      const key = KEYS[e.keyCode];
      if (key && nesRef.current) {
        nesRef.current.buttonUp(key.controller, key.button);
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", window.keyDownHandler);
    document.addEventListener("keyup", window.keyUpHandler);
  };

  const removeKeyboardControls = () => {
    document.removeEventListener("keydown", window.keyDownHandler);
    document.removeEventListener("keyup", window.keyUpHandler);
  };

  const handleButtonPress = (button, isPressed) => {
    if (nesRef.current) {
      if (isPressed) {
        nesRef.current.buttonDown(1, button);
      } else {
        nesRef.current.buttonUp(1, button);
      }
    }
  };

  const directionIcons = {
    up: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z"
          clipRule="evenodd"
          transform="rotate(180, 12, 12)"
        />
      </svg>
    ),
    down: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    ),
    left: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z"
          clipRule="evenodd"
          transform="rotate(90, 12, 12)"
        />
      </svg>
    ),
    right: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z"
          clipRule="evenodd"
          transform="rotate(270, 12, 12)"
        />
      </svg>
    ),
  };

  const DirectionButton = ({ direction, button }) => {
    const baseClasses =
      "select-none flex justify-center items-center w-12 h-12 bg-white bg-opacity-20 rounded-full text-black touch-manipulation border-2 border-white border-opacity-50 absolute";

    let positionClasses = "";
    if (direction === "up") {
      positionClasses = "top-0 left-1/2 transform -translate-x-1/2";
    } else if (direction === "down") {
      positionClasses = "bottom-0 left-1/2 transform -translate-x-1/2";
    } else if (direction === "left") {
      positionClasses = "left-0 top-1/2 transform -translate-y-1/2";
    } else if (direction === "right") {
      positionClasses = "right-0 top-1/2 transform -translate-y-1/2";
    }

    return (
      <button
        className={`direction-btn ${direction} ${baseClasses} ${positionClasses}`}
        onTouchStart={(e) => {
          e.preventDefault();
          handleButtonPress(button, true);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleButtonPress(button, false);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          handleButtonPress(button, true);
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          handleButtonPress(button, false);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          handleButtonPress(button, false);
        }}
      >
        {directionIcons[direction]}
      </button>
    );
  };

  const ActionButton = ({ label, button }) => {
    const bgColorClass = label === "A" ? "bg-red-500" : "bg-blue-500";

    return (
      <button
        className={`action-btn ${label} select-none w-16 h-16 rounded-full ${bgColorClass} bg-opacity-70 text-white text-xl font-bold mx-2 border-none touch-manipulation flex items-center justify-center`}
        onTouchStart={(e) => {
          e.preventDefault();
          handleButtonPress(button, true);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleButtonPress(button, false);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          handleButtonPress(button, true);
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          handleButtonPress(button, false);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          handleButtonPress(button, false);
        }}
      >
        {label}
      </button>
    );
  };

  const SystemButton = ({ label, button }) => {
    const icons = {
      START: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
            clipRule="evenodd"
          />
        </svg>
      ),
      SELECT: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            fillRule="evenodd"
            d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      ),
    };

    return (
      <button
        className="system-btn select-none px-4 py-1 rounded-lg bg-gray-800 bg-opacity-70 text-white text-sm mx-2 border-none touch-manipulation flex items-center justify-center"
        onTouchStart={(e) => {
          e.preventDefault();
          handleButtonPress(button, true);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleButtonPress(button, false);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          handleButtonPress(button, true);
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          handleButtonPress(button, false);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          handleButtonPress(button, false);
        }}
      >
        {icons[label]}
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-center items-center h-screen w-screen fixed top-0 left-0 bg-black m-0 p-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{
          imageRendering: "pixelated",
        }}
      />

      {isMobile && (
        <div className="fixed bottom-0 left-0 w-full flex flex-col items-center p-2 bg-black bg-opacity-70">
          <div className="w-full flex justify-center mb-4">
            <SystemButton label="SELECT" button={2} />
            <SystemButton label="START" button={3} />
          </div>

          <div className="w-full flex justify-between px-2">
            <div className="relative w-36 h-36">
              <DirectionButton direction="up" button={4} />
              <DirectionButton direction="right" button={7} />
              <DirectionButton direction="down" button={5} />
              <DirectionButton direction="left" button={6} />
            </div>

            <div className="flex items-center">
              <ActionButton label="B" button={0} />
              <ActionButton label="A" button={1} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCanva;
