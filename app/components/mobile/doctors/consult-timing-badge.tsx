'use client'
import { useState } from 'react';
import { TDoctor } from '@/lib/types/doctor';

type TConsultDate = NonNullable<TDoctor['consult_dates']>[number];

function parseLocalDate(dateStr: string): Date {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
}

function formatDateLabel(dateStr: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = parseLocalDate(dateStr);
    const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
}

function getSessions(cd: TConsultDate): string[] {
    const sessions: string[] = [];
    if (cd.first_session_start_time && cd.first_session_end_time)
        sessions.push(`${cd.first_session_start_time} – ${cd.first_session_end_time}`);
    if (cd.second_session_start_time && cd.second_session_end_time)
        sessions.push(`${cd.second_session_start_time} – ${cd.second_session_end_time}`);
    if (cd.third_session_start_time && cd.third_session_end_time)
        sessions.push(`${cd.third_session_start_time} – ${cd.third_session_end_time}`);
    return sessions;
}

const ConsultTimingBadge = ({ consult_dates, doctorName }: { consult_dates: TDoctor['consult_dates'], doctorName: string }) => {
    const [open, setOpen] = useState(false);
    if (!consult_dates || consult_dates.length === 0) return null;

    const next = consult_dates[0];
    const sessions = getSessions(next);
    if (sessions.length === 0) return null;

    return (
        <>
            <button
                onClick={e => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}
                className="flex items-center gap-2 text-xs w-full text-left mt-1"
            >
                <svg className="w-3.5 h-3.5 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold text-green-600">{formatDateLabel(next.date)}</span>
                <span className="text-gray-400">|</span>
                <div className="flex flex-col flex-1 min-w-0">
                    {sessions.map((s, i) => (
                        <span key={i} className="text-gray-500">{s}</span>
                    ))}
                </div>
                <svg className="w-3.5 h-3.5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end" onClick={e => { e.preventDefault(); e.stopPropagation(); }}>
                    <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
                    <div className="relative bg-white rounded-t-2xl z-10 max-h-[70vh] flex flex-col">
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 rounded-full bg-gray-300" />
                        </div>
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <div>
                                <h3 className="text-sm font-bold text-gray-800">Consulting Schedule</h3>
                                <p className="text-xs text-gray-400">{doctorName}</p>
                            </div>
                            <button onClick={() => setOpen(false)} className="text-gray-400 p-1">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-y-auto flex-1 px-4 py-3 space-y-2">
                            {consult_dates.map((cd, i) => {
                                const s = getSessions(cd);
                                if (s.length === 0) return null;
                                const label = formatDateLabel(cd.date);
                                const isToday = label === 'Today';
                                return (
                                    <div key={i} className={`rounded-xl border px-3 py-2.5 ${isToday ? 'border-cyan-200 bg-cyan-50' : 'border-gray-100 bg-white'}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-xs font-bold ${isToday ? 'text-cyan-600' : 'text-gray-700'}`}>{label}</span>
                                            {isToday && <span className="text-[10px] bg-cyan-500 text-white px-1.5 py-0.5 rounded-full font-semibold">Today</span>}
                                            <span className="text-xs text-gray-400 ml-auto">{parseLocalDate(cd.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {s.map((session, si) => (
                                                <span key={si} className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-lg font-medium">
                                                    {session}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConsultTimingBadge;
