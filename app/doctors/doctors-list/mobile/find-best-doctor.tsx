'use client'
import React, { useState } from 'react';

const symptoms = [
    'Irregular periods',
    'Pregnancy checkup',
    'PCOS / PCOD',
    'White discharge',
    'Abdominal pain',
    'Infertility issues',
];

const FindBestDoctor = () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="mx-3 my-3 rounded-xl border border-gray-200 bg-white shadow-sm px-4 py-3">
            <p className="text-sm font-semibold text-gray-700 mb-2">What symptoms are you facing?</p>
            <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom) => (
                    <button
                        key={symptom}
                        onClick={() => setSelected(symptom)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                            selected === symptom
                                ? 'bg-cyan-500 text-white border-cyan-500'
                                : 'bg-gray-50 text-gray-600 border-gray-200 active:bg-cyan-50'
                        }`}
                    >
                        {symptom}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FindBestDoctor;
