import React from 'react';

const ProgressModal = ({ progress }) => {
    return (
        <section className="fixed inset-0 bg-black opacity-70 flex items-center justify-center z-40">
          <div className="bg-white p-5 rounded-xl w-[90%] md:w-[50%] lg:w-[30%]">
             <h2 className="text-center text-lg font-semibold mb-3">Processing Transfer...</h2>
              {/* Progress bar container */}
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                {/* Progress fill with glow */}
                <div
                  className="bg-green-500 h-4 transition-all duration-500 shadow-lg"
                  style={{ width: `${progress}%`, boxShadow: "0 0 10px #22c55e, 0 0 20px #22c55e", }}
                ></div>
              </div>
          </div>
        </section>
    );
};

export default ProgressModal;