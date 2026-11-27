'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { BiCheckCircle, BiDownload, BiRefresh, BiTime, BiErrorCircle, BiTestTube } from 'react-icons/bi';

type TStage = 'registered' | 'collected' | 'processing' | 'ready' | 'recollect';

type TReportNote = { title: string, columns: string[], rows: string[][], text: string };
type TResultValue = { code: string, name: string, unit: string, value: string, flag: string, ref_display: string, display_order: number };
type TResult = {
    _id: string, test_name: string, department: string, report_type: 'tabular' | 'narrative' | 'culture',
    method: string, values: TResultValue[], interpretation: string, has_critical: number, version: number,
    narrative?: Record<string, string>,
    report_note?: TReportNote,
    culture?: { growth: string, organisms: Array<{ organism: string, colony_count: string, sensitivity: Array<{ antibiotic: string, interpretation: string }> }> },
    authorised_signatory?: { name: string, qualification: string, designation: string, registration_no: string, signature_image: string }
};
type TLetterhead = { lab_name: string, address: string, contact_no: string, email: string, logo: string, accreditation: string, report_footer: string };

export type TLabPublicStatus = {
    lab: TLetterhead | null,
    patient: { name: string, patient_no: string, age: number, age_unit: string, gender: string } | null,
    order: { order_no: string, created_at: string, expected_at: string, referring_doctor: string },
    tests: Array<{ test_id: string, name: string, department: string, stage: TStage }>,
    /* missing until the lab api is updated */
    bill?: {
        tests: Array<{ name: string, code: string, price: number, discount: number }>,
        total: number, test_discount: number, extra_discount: number, discount: number,
        payable: number, paid: number, balance: number, payment_status: string
    } | null,
    report: {
        accession_nos: string[], collected_at: string | null, received_at: string | null, reported_at: string | null,
        results: TResult[]
    } | null
};

const STAGES: Record<TStage, { label: string, className: string }> = {
    registered: { label: 'Awaiting sample', className: 'bg-slate-100 text-slate-700' },
    collected: { label: 'Sample collected', className: 'bg-sky-100 text-sky-800' },
    processing: { label: 'In process', className: 'bg-amber-100 text-amber-800' },
    ready: { label: 'Report ready', className: 'bg-emerald-100 text-emerald-800' },
    recollect: { label: 'New sample needed', className: 'bg-red-100 text-red-700' }
};

const fmt = (date: string | null | undefined) => date ? moment(date).format('DD MMM YYYY, hh:mm a') : '—';
const flagMark = (flag: string) => flag === 'critical_high' || flag === 'H' ? 'H' : flag === 'critical_low' || flag === 'L' ? 'L' : '';

/* only the report sheet goes to the printer (and so into "Save as PDF"), not the status page
   around it */
const PRINT_CSS = `
@media print {
  @page { size: A4; margin: 12mm; }
  body * { visibility: hidden !important; }
  #lab-report-sheet, #lab-report-sheet * { visibility: visible !important; }
  #lab-report-sheet { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; border: 0 !important; }
}`;

/* the test's standing guidance (reference tables, notes), printed smaller and lighter under the
   results — same as the report printed from the clinic */
const ReportNoteBlock = ({ note }: { note?: TReportNote }) => {
    if (!note) return null;
    const columns = note.columns || [];
    const rows = note.rows || [];
    const hasTable = columns.length > 0 && rows.length > 0;
    if (!note.title && !hasTable && !note.text) return null;
    return (
        <div className="mt-2 pt-1.5 border-t border-dashed border-slate-300 text-[10.5px] text-slate-700" style={{ breakInside: 'avoid' }}>
            <div className="font-bold text-[11px] text-slate-900 mb-1">{note.title || 'Note'}</div>
            {hasTable && (
                <div className="overflow-x-auto">
                    <table className={`border-collapse min-w-[55%] ${note.text ? 'mb-1' : ''}`}>
                        <thead>
                            <tr>{columns.map((c, i) => <th key={i} className="border border-slate-300 bg-slate-50 px-2 py-0.5 text-left font-bold">{c}</th>)}</tr>
                        </thead>
                        <tbody>
                            {rows.map((row, r) => (
                                <tr key={r}>{columns.map((_, i) => <td key={i} className="border border-slate-300 px-2 py-0.5 text-left">{row[i] || ''}</td>)}</tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {note.text && <div className="whitespace-pre-wrap leading-snug">{note.text}</div>}
        </div>
    );
};

const ReportSheet = ({ data }: { data: TLabPublicStatus }) => {
    const report = data.report!;
    const signatory = report.results.find((r) => r.authorised_signatory?.name)?.authorised_signatory;
    const lab = data.lab;
    return (
        <div id="lab-report-sheet" className="bg-white text-[12px] text-slate-900 p-5 sm:p-8 rounded-xl border border-slate-200" style={{ fontFamily: 'Arial, sans-serif' }}>
            <div className="text-center border-b-2 border-slate-900 pb-2">
                <div className="text-lg font-bold">{lab?.lab_name || 'Laboratory'}</div>
                {lab?.address && <div>{lab.address}</div>}
                <div>
                    {lab?.contact_no && <span>Ph: {lab.contact_no} </span>}
                    {lab?.accreditation && <span>· {lab.accreditation}</span>}
                </div>
            </div>

            <table className="w-full mt-3 border border-slate-300 border-collapse">
                <tbody>
                    {([
                        [['Patient', data.patient?.name], ['Order no', data.order.order_no]],
                        [['Age / Sex', `${data.patient?.age ?? ''} ${data.patient?.age_unit ?? ''} / ${data.patient?.gender ?? ''}`], ['Patient no', data.patient?.patient_no]],
                        [['Referred by', data.order.referring_doctor || 'Self'], ['Sample no', report.accession_nos.join(', ')]],
                        [['Collected', fmt(report.collected_at)], ['Reported', fmt(report.reported_at)]]
                    ] as const).map(([left, right], i) => (
                        <tr key={i}>
                            <td className="px-2 py-1 text-slate-500 whitespace-nowrap">{left[0]}</td>
                            <td className="px-2 py-1 font-bold">{left[1]}</td>
                            <td className="px-2 py-1 text-slate-500 whitespace-nowrap border-l border-slate-200">{right[0]}</td>
                            <td className="px-2 py-1 font-bold">{right[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {report.results.map((result) => (
                <div key={result._id} className="mt-4" style={{ breakInside: 'avoid' }}>
                    <div className="bg-slate-100 px-2 py-1 font-bold">
                        {result.department.replace(/_/g, ' ')} — {result.test_name}
                        {result.version > 1 && <span> · amended report (v{result.version})</span>}
                    </div>

                    {result.report_type === 'tabular' && (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse mt-1">
                                <thead>
                                    <tr className="border-b border-slate-400">
                                        <th className="text-left py-1">Test</th>
                                        <th className="text-right py-1 px-2">Result</th>
                                        <th className="text-left py-1 px-2">Unit</th>
                                        <th className="text-left py-1">Reference</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...result.values].sort((a, b) => a.display_order - b.display_order).map((v) => (
                                        <tr key={v.code}>
                                            <td className="py-0.5">{v.name}</td>
                                            <td className={`text-right py-0.5 px-2 ${v.flag ? 'font-bold' : ''}`}>
                                                {v.value || '—'}
                                                {flagMark(v.flag) && <span> {flagMark(v.flag)}</span>}
                                                {(v.flag === 'critical_high' || v.flag === 'critical_low') && <span> **</span>}
                                            </td>
                                            <td className="py-0.5 px-2">{v.unit}</td>
                                            <td className="py-0.5">{v.ref_display || '—'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {result.report_type === 'narrative' && (
                        <div className="mt-1">
                            {([
                                ['Specimen', result.narrative?.specimen_description],
                                ['Gross description', result.narrative?.gross_description],
                                ['Microscopic description', result.narrative?.microscopic_description],
                                ['Impression', result.narrative?.impression],
                                ['Note', result.narrative?.note]
                            ] as const).filter(([, body]) => body).map(([heading, body]) => (
                                <div key={heading} className="mb-2">
                                    <div className="font-bold">{heading}</div>
                                    <div className="whitespace-pre-wrap">{body}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {result.report_type === 'culture' && (
                        <div className="mt-1">
                            {result.culture?.growth && <div className="mb-1"><b>Growth:</b> {result.culture.growth}</div>}
                            {(result.culture?.organisms || []).map((organism, i) => (
                                <div key={i} className="mb-2">
                                    <div><b>Organism isolated:</b> {organism.organism} {organism.colony_count && `(${organism.colony_count})`}</div>
                                    {organism.sensitivity.length > 0 && (
                                        <table className="w-full border-collapse mt-1">
                                            <tbody>
                                                {organism.sensitivity.map((row, s) => (
                                                    <tr key={s}>
                                                        <td className="py-0.5">{row.antibiotic}</td>
                                                        <td className="py-0.5">
                                                            {row.interpretation === 'S' ? 'Sensitive' : row.interpretation === 'I' ? 'Intermediate' : row.interpretation === 'R' ? 'Resistant' : '—'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {result.method && <div className="mt-0.5 text-[11px]"><b>Method:</b> {result.method}</div>}
                    {result.interpretation && <div className="mt-1 whitespace-pre-wrap"><b>Comment:</b> {result.interpretation}</div>}
                    <ReportNoteBlock note={result.report_note} />
                </div>
            ))}

            {report.results.some((r) => r.has_critical === 1) && (
                <div className="mt-3 text-[11px]">** Critical value. Please consult your doctor immediately.</div>
            )}

            {signatory && (
                <div className="flex justify-end mt-7">
                    <div className="text-center">
                        {signatory.signature_image && <img src={signatory.signature_image} alt="" className="h-10 mx-auto" />}
                        <div className="border-t border-slate-900 pt-0.5 min-w-[180px]">
                            <b>{signatory.name}</b>
                            {signatory.qualification && <div>{signatory.qualification}</div>}
                            {signatory.designation && <div>{signatory.designation}</div>}
                            {signatory.registration_no && <div>Reg. No: {signatory.registration_no}</div>}
                        </div>
                    </div>
                </div>
            )}

            {lab?.report_footer && (
                <div className="text-center mt-5 text-[11px] border-t border-slate-400 pt-1">{lab.report_footer}</div>
            )}
        </div>
    );
};

const money = (value: number) => `₹${(Number(value) || 0).toFixed(2)}`;

/* the patient's bill: what each test cost, what was taken off, and what is still owed */
const BillCard = ({ bill }: { bill: NonNullable<TLabPublicStatus['bill']> }) => {
    const anyTestDiscount = bill.test_discount > 0;
    const totals: Array<[string, string, boolean]> = [
        ['Total', money(bill.total), false],
        ...(anyTestDiscount ? [['Test discounts', `- ${money(bill.test_discount)}`, false] as [string, string, boolean]] : []),
        ...(bill.extra_discount > 0 ? [[anyTestDiscount ? 'Extra discount' : 'Discount', `- ${money(bill.extra_discount)}`, false] as [string, string, boolean]] : []),
        ['Net payable', money(bill.payable), true],
        ['Paid', money(bill.paid), false],
        ['Balance due', money(bill.balance), true]
    ];
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between gap-3 mb-3">
                <div className="font-semibold">Bill</div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${bill.balance > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {bill.balance > 0 ? `Due ${money(bill.balance)}` : 'Paid in full'}
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="text-xs text-slate-500 border-b border-slate-200">
                            <th className="text-left font-medium py-1.5">Test</th>
                            <th className="text-right font-medium py-1.5 pl-3">Price</th>
                            {anyTestDiscount && <th className="text-right font-medium py-1.5 pl-3">Discount</th>}
                            {anyTestDiscount && <th className="text-right font-medium py-1.5 pl-3">Net</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {bill.tests.map((t, i) => (
                            <tr key={i} className="border-b border-slate-100">
                                <td className="py-1.5">{t.name}</td>
                                <td className="py-1.5 pl-3 text-right whitespace-nowrap">{money(t.price)}</td>
                                {anyTestDiscount && <td className="py-1.5 pl-3 text-right whitespace-nowrap text-emerald-700">{t.discount ? `- ${money(t.discount)}` : '—'}</td>}
                                {anyTestDiscount && <td className="py-1.5 pl-3 text-right whitespace-nowrap">{money(t.price - t.discount)}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-3 ml-auto w-full sm:w-64 text-sm">
                {totals.map(([label, value, strong]) => (
                    <div key={label} className={`flex justify-between py-1 ${strong ? 'font-semibold border-t border-slate-200' : 'text-slate-700'}`}>
                        <span>{label}</span><span>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

/**
 * What the patient lands on after scanning the receipt: where each test stands, and the released
 * report with a download button once there is one.
 */
const LabReportView = ({ data, error }: { data: TLabPublicStatus | null, error: string }) => {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);

    if (!data) {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md w-full text-center">
                    <BiErrorCircle className="text-5xl text-red-500 mx-auto" />
                    <h1 className="text-lg font-semibold mt-3">Report not available</h1>
                    <p className="text-sm text-slate-600 mt-2">{error}</p>
                </div>
            </main>
        );
    }

    const total = data.tests.length;
    const ready = data.tests.filter((t) => t.stage === 'ready').length;
    const allReady = total > 0 && ready === total;

    const refresh = () => {
        setRefreshing(true);
        router.refresh();
        setTimeout(() => setRefreshing(false), 1200);
    };

    return (
        <main className="min-h-screen bg-slate-50 py-6 px-4">
            <style>{PRINT_CSS}</style>
            <div className="max-w-3xl mx-auto space-y-4">
                {/* letterhead */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
                    {data.lab?.logo
                        ? <img src={data.lab.logo} alt="" className="w-14 h-14 rounded-xl object-contain border border-slate-100" />
                        : <span className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl"><BiTestTube /></span>}
                    <div className="min-w-0">
                        <div className="font-semibold text-lg truncate">{data.lab?.lab_name || 'Laboratory'}</div>
                        {data.lab?.address && <div className="text-sm text-slate-600 truncate">{data.lab.address}</div>}
                        {data.lab?.contact_no && <a href={`tel:${data.lab.contact_no}`} className="text-sm text-primary">{data.lab.contact_no}</a>}
                    </div>
                </div>

                {/* who and which order */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="text-xs uppercase tracking-wide text-slate-500">Patient</div>
                            <div className="font-semibold text-base">{data.patient?.name}</div>
                            <div className="text-sm text-slate-600">
                                {data.patient?.age} {data.patient?.age_unit} · {data.patient?.gender} · {data.patient?.patient_no}
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <div className="text-xs uppercase tracking-wide text-slate-500">Order</div>
                            <div className="font-mono font-semibold">{data.order.order_no}</div>
                            <div className="text-xs text-slate-500">{fmt(data.order.created_at)}</div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1.5">
                            <span className="font-medium">{allReady ? 'All reports are ready' : `${ready} of ${total} reports ready`}</span>
                            {!allReady && data.order.expected_at && (
                                <span className="text-slate-500 flex items-center gap-1"><BiTime /> Expected {fmt(data.order.expected_at)}</span>
                            )}
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${total ? (ready / total) * 100 : 0}%` }} />
                        </div>
                    </div>
                </div>

                {/* per test */}
                <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
                    {data.tests.map((test) => (
                        <div key={test.test_id} className="flex items-center gap-3 px-5 py-3">
                            {test.stage === 'ready'
                                ? <BiCheckCircle className="text-xl text-emerald-600 shrink-0" />
                                : <BiTime className="text-xl text-slate-400 shrink-0" />}
                            <span className="flex-1 min-w-0 text-sm font-medium">{test.name}</span>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${STAGES[test.stage].className}`}>
                                {STAGES[test.stage].label}
                            </span>
                        </div>
                    ))}
                </div>

                {data.bill && data.bill.tests.length > 0 && <BillCard bill={data.bill} />}

                <div className="flex flex-wrap gap-3">
                    {data.report && (
                        <button onClick={() => window.print()}
                            className="flex-1 min-w-[10rem] flex items-center justify-center gap-2 bg-primary text-white font-medium rounded-xl py-3 px-4">
                            <BiDownload className="text-lg" /> Download report{allReady ? '' : ' (ready tests)'}
                        </button>
                    )}
                    <button onClick={refresh} disabled={refreshing}
                        className="flex-1 min-w-[10rem] flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl py-3 px-4 disabled:opacity-60">
                        <BiRefresh className={`text-lg ${refreshing ? 'animate-spin' : ''}`} /> Refresh status
                    </button>
                </div>
                {data.report && (
                    <p className="text-xs text-slate-500 -mt-2">Choose “Save as PDF” in the print window to keep a copy on your phone.</p>
                )}

                {data.report ? <ReportSheet data={data} /> : (
                    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600">
                        Your report will appear here as soon as the lab releases it. Keep your receipt — you can scan it again any time.
                    </div>
                )}

                <p className="text-center text-xs text-slate-400 pt-2">Powered by Careipro</p>
            </div>
        </main>
    );
};

export default LabReportView;
