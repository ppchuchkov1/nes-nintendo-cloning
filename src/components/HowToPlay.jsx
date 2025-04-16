import React from "react";

const HowToPlay = () => {
  return (
    <div className="p-6">
      <div>
        <div
          className="rounded-lg max-w-2xl w-full mx-4 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 py-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-20 flex-shrink-0">
                  <kbd className="px-4 py-2 w-full text-center font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    Z
                  </kbd>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Usually mapped to the A button on a Nintendo controller.
                  Function: It's often used for jumping, confirming actions, or
                  attacking, depending on the game. Example: In Mario games, Z
                  usually makes Mario jump.
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-20 flex-shrink-0">
                  <kbd className="px-4 py-2 w-full text-center font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    X
                  </kbd>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Usually mapped to the B button on a Nintendo controller.
                  Function: It's typically used for running, canceling, or
                  secondary attacks. Example: In Mario games, holding X lets
                  Mario run faster, or throw fireballs if he has a fire flower.
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-20 flex-shrink-0">
                  <kbd className="px-4 py-2 w-full text-center font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    SPACE
                  </kbd>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Function: Usually mapped to the Select button. Used to: Switch
                  items or options Open secondary menus In some games, it might
                  trigger special functions
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-20 flex-shrink-0">
                  <kbd className="px-4 py-2 w-full text-center font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    ENTER
                  </kbd>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Function: Acts as the Start button on a Nintendo controller.
                  Used to: Start the game Pause/Resume gameplay Confirm
                  selections in the main menu
                </p>
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-4">
                  <div className="col-start-2">
                    <kbd className="px-4 py-2 w-full flex justify-center font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                      ↑
                    </kbd>
                  </div>
                  <div></div>
                  <div>
                    <kbd className="px-4 py-2 w-full flex justify-center font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                      ←
                    </kbd>
                  </div>
                  <div>
                    <kbd className="px-4 py-2 w-full flex justify-center font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                      ↓
                    </kbd>
                  </div>
                  <div>
                    <kbd className="px-4 py-2 w-full flex justify-center font-semibold text-gray-800 bg-white border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                      →
                    </kbd>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Function: Used to move your character or navigate menus.
                  Example: In most games like Mario or Pokémon, the arrow keys
                  control walking or menu selection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
