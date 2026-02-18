import React, { useEffect, useState } from 'react';

const TrashAnimation = ({ itemName, emoji, onComplete }) => {
    const [stage, setStage] = useState('enter');

    useEffect(() => {
        // Sequence matches CSS animation times
        const totalDuration = 2500; // 2.5s total

        const timer = setTimeout(() => {
            onComplete();
        }, totalDuration);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
            <div className="relative w-64 h-64 flex flex-col items-center justify-end">

                {/* Item to be thrown */}
                <div className="absolute top-0 z-20 animate-item-drop w-full text-center">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200 inline-block text-sm font-bold text-gray-700 max-w-[200px] truncate mx-auto transform rotate-[-5deg] flex items-center justify-center gap-2">
                        <span className="text-xl">{emoji || '🥘'}</span>
                        <span>{itemName}</span>
                    </div>
                </div>

                {/* Trash Can SVG */}
                <div className="w-64 h-64 relative animate-trash-bounce origin-bottom">
                    <svg viewBox="0 -80 200 350" className="w-full h-full drop-shadow-2xl overflow-visible">
                        {/* Can Body */}
                        <path
                            d="M40 70 L 50 220 Q 100 240 150 220 L 160 70 Z"
                            fill="#e5e7eb"
                            stroke="#9ca3af"
                            strokeWidth="3"
                        />
                        {/* Vertical Lines on Body */}
                        <path d="M70 80 L 75 210" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round" />
                        <path d="M100 80 L 100 215" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round" />
                        <path d="M130 80 L 125 210" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round" />

                        {/* Lid Group - Origin set for rotation */}
                        <g className="animate-lid" style={{ transformOrigin: '30px 65px' }}>
                            <path
                                d="M30 60 Q 100 40 170 60 L 170 70 Q 100 90 30 70 Z"
                                fill="#9ca3af"
                                stroke="#6b7280"
                                strokeWidth="3"
                            />
                            {/* Lid Handle */}
                            <path
                                d="M90 50 Q 100 40 110 50"
                                fill="none"
                                stroke="#6b7280"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default TrashAnimation;
