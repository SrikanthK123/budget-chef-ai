import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-gray-600 font-medium animate-pulse">Consulting the AI Chef...</p>
        </div>
    );
};

export default LoadingSpinner;
