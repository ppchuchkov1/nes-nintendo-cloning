import { useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  GamepadIcon,
  Zap,
  Star,
  Info,
} from "lucide-react";

const HowToPlay = () => {
  const [activeKey, setActiveKey] = useState(null);

  const controls = [
    {
      key: "Z",
      mapping: "A Button",
      function: "Jumping, confirming actions, or attacking",
      example: "In Mario games, Z makes Mario jump.",
      color: "bg-red-400",
      gradient: "from-red-300 to-red-500",
      iconBg: "bg-red-100",
    },
    {
      key: "X",
      mapping: "B Button",
      function: "Running, canceling, or secondary attacks",
      example:
        "Holding X lets Mario run faster, or throw fireballs with a fire flower.",
      color: "bg-yellow-400",
      gradient: "from-yellow-300 to-yellow-500",
      iconBg: "bg-yellow-100",
    },
    {
      key: "SPACE",
      mapping: "Select Button",
      function: "Switch items or options, open secondary menus",
      example: "Access your inventory or pause menu.",
      color: "bg-purple-400",
      gradient: "from-purple-300 to-purple-500",
      iconBg: "bg-purple-100",
    },
    {
      key: "ENTER",
      mapping: "Start Button",
      function: "Start the game, pause/resume gameplay, confirm selections",
      example: "Press Enter to begin your adventure.",
      color: "bg-green-400",
      gradient: "from-green-300 to-green-500",
      iconBg: "bg-green-100",
    },
    {
      key: "ARROWS",
      mapping: "D-Pad",
      function: "Move your character or navigate menus",
      example: "Control character movement in any direction.",
      color: "bg-blue-400",
      gradient: "from-blue-300 to-blue-500",
      iconBg: "bg-blue-100",
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <GamepadIcon size={28} className="text-indigo-500 mr-3" />
        <h1 className="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Nintendo Controls Guide
        </h1>
      </div>

      <div className="grid gap-4 mb-8">
        {controls.map((control) => (
          <div
            key={control.key}
            className={`bg-white rounded-xl p-5 shadow-md transition-all duration-300 border-2 ${
              activeKey === control.key
                ? "border-indigo-400 shadow-lg shadow-indigo-200"
                : "border-transparent"
            }`}
            onMouseEnter={() => setActiveKey(control.key)}
            onMouseLeave={() => setActiveKey(null)}
          >
            <div className="flex items-center">
              {control.key === "ARROWS" ? (
                <div className="relative grid grid-cols-3 gap-1 w-24 h-24 mr-6">
                  <div className="col-start-2">
                    <button className="w-8 h-8 bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-lg flex items-center justify-center transition-colors shadow-md text-white">
                      <ArrowUp size={20} />
                    </button>
                  </div>
                  <div className="col-start-1 col-end-2 row-start-2">
                    <button className="w-8 h-8 bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-lg flex items-center justify-center transition-colors shadow-md text-white">
                      <ArrowLeft size={20} />
                    </button>
                  </div>
                  <div className="col-start-3 col-end-4 row-start-2">
                    <button className="w-8 h-8 bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-lg flex items-center justify-center transition-colors shadow-md text-white">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                  <div className="col-start-2 row-start-3">
                    <button className="w-8 h-8 bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-lg flex items-center justify-center transition-colors shadow-md text-white">
                      <ArrowDown size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${control.gradient} rounded-full flex items-center justify-center font-bold text-2xl mr-6 shadow-lg text-white transform transition-transform hover:scale-105`}
                >
                  {control.key}
                </div>
              )}

              <div className="flex-1">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-xl text-gray-800">
                    {control.key}
                  </h3>
                  <span className="text-sm bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-medium">
                    {control.mapping}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{control.function}</p>
                <div className="flex items-center text-sm text-gray-600 italic">
                  <Info size={14} className="mr-1 text-indigo-400" />
                  {control.example}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl shadow-md">
        <h3 className="font-bold mb-4 text-center text-lg flex items-center justify-center text-indigo-700">
          <Star size={20} className="mr-2 text-yellow-500" />
          Pro Gaming Tips
        </h3>
        <ul className="space-y-3">
          <li className="flex items-center bg-white p-3 rounded-lg shadow-sm">
            <div
              className={`w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3`}
            >
              <Zap size={16} className="text-green-600" />
            </div>
            <span className="text-gray-700">
              Combine buttons for special moves or combos
            </span>
          </li>
          <li className="flex items-center bg-white p-3 rounded-lg shadow-sm">
            <div
              className={`w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3`}
            >
              <Zap size={16} className="text-blue-600" />
            </div>
            <span className="text-gray-700">
              Most games allow you to customize controls in settings
            </span>
          </li>
          <li className="flex items-center bg-white p-3 rounded-lg shadow-sm">
            <div
              className={`w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3`}
            >
              <Zap size={16} className="text-purple-600" />
            </div>
            <span className="text-gray-700">
              Take breaks every hour to prevent hand fatigue
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HowToPlay;
