import React from 'react';

const ChefLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-6">
            <div className="relative w-32 h-32">
                {/* Steam Animation */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
                    <div className="w-2 h-6 bg-orange-100 rounded-full animate-steam-1 opacity-0"></div>
                    <div className="w-2 h-8 bg-orange-100 rounded-full animate-steam-2 opacity-0"></div>
                    <div className="w-2 h-5 bg-orange-100 rounded-full animate-steam-3 opacity-0"></div>
                </div>

                {/* Bowl Shadow */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/10 blur-xl rounded-full"></div>

                {/* Bowl & Contents - SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl transform transition-transform hover:scale-105 duration-500 overflow-visible">
                    <defs>
                        <linearGradient id="bowlGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#f3f4f6" />
                        </linearGradient>

                        <radialGradient id="sauceGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#fed7aa" /> {/* orange-200 */}
                            <stop offset="70%" stopColor="#fdba74" /> {/* orange-300 */}
                            <stop offset="100%" stopColor="#fb923c" /> {/* orange-400 */}
                        </radialGradient>
                    </defs>

                    {/* Ceramic Bowl Body */}
                    <circle cx="50" cy="50" r="45" fill="url(#bowlGradient)" stroke="#e5e7eb" strokeWidth="2" className="shadow-inner" />

                    {/* Inner Shadow to give depth */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="4" />

                    {/* Creamy Sauce Group */}
                    <g className="origin-center animate-[spin_8s_linear_infinite]">
                        <circle cx="50" cy="50" r="38" fill="url(#sauceGradient)" />

                        {/* Swirl Details */}
                        <path d="M50 50 Q65 35 75 50 T80 70" fill="none" stroke="#fff7ed" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                        <path d="M50 50 Q35 65 25 50 T20 30" fill="none" stroke="#fff7ed" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                        <circle cx="40" cy="40" r="2" fill="#fff" opacity="0.6" />
                        <circle cx="60" cy="60" r="3" fill="#fff" opacity="0.4" />
                    </g>

                    {/* Wooden Spoon */}
                    <g className="origin-center animate-[stir_3s_linear_infinite]">
                        {/* Spoon Handle */}
                        <path d="M50 50 L70 10" stroke="#92400e" strokeWidth="6" strokeLinecap="round" />

                        {/* Spoon Head (Oval) */}
                        <ellipse cx="50" cy="50" rx="12" ry="15" fill="#78350f" transform="rotate(-30 50 50)" />
                        <ellipse cx="50" cy="50" rx="9" ry="12" fill="#92400e" transform="rotate(-30 50 50)" />
                    </g>
                </svg>
            </div>

            <div className="text-center space-y-2 relative z-10">
                <h3 className="text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                    BudgetChef is Cooking...
                </h3>
                <p className="text-sm text-gray-500 font-medium tracking-wide">Mixing the best ingredients for you</p>
            </div>


        </div>
    );
};

export default ChefLoader;
