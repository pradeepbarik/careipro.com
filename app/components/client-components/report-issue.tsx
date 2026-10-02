'use client'
import { useState } from "react";
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { shareFeedbackPostCurl } from "@/lib/services/apicalls";

/**
 * The way out when the support team has not sorted a patient's query. Posts through the same
 * /share-feedback endpoint the support page uses, tagged with its own campaign so these arrive
 * separate from ordinary site feedback and can be chased.
 */
const ReportIssue = ({ campaign, defaultName = "" }: { campaign: string, defaultName?: string }) => {
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [done, setDone] = useState(false);
    const [mobile, setMobile] = useState("");
    const [name, setName] = useState(defaultName);
    const [comment, setComment] = useState("");

    const onSubmit = () => {
        if (saving) return;
        if (mobile.length !== 10) {
            toast.error("Please enter your 10 digit mobile number");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please tell us what went wrong");
            return;
        }
        setSaving(true);
        shareFeedbackPostCurl({ mobile, name, rating: 0, comment: comment.trim(), campaign })
            .then(({ code, message }) => {
                if (code === 200) {
                    setDone(true);
                } else {
                    toast.error(message);
                }
            })
            .catch(() => {
                //the network layer has already shown the reason
            })
            .finally(() => setSaving(false));
    };

    if (done) {
        return (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-start gap-2">
                <BiCheckCircle className="text-green-600 text-lg shrink-0 mt-0.5" />
                <p className="fs-12 text-gray-600">
                    Thank you, your issue has reached our team. Someone will call you on <b>{mobile}</b>.
                </p>
            </div>
        );
    }

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="mt-3 pt-3 border-t border-gray-100 w-full flex items-center justify-center gap-1.5 fs-12 font-semibold text-gray-500 hover:text-red-600 transition-colors"
            >
                <BiErrorCircle className="text-base" />
                Issue still not resolved? Report it
            </button>
        );
    }

    return (
        <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="fs-13 font-semibold text-gray-800">Tell us what went wrong</p>
            <p className="fs-12 text-gray-500 mt-0.5">We will look into it and call you back.</p>
            <input
                type="tel"
                inputMode="numeric"
                value={mobile}
                placeholder="Your mobile number"
                aria-label="Your mobile number"
                className="w-full mt-2 fs-13 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary"
                onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
            />
            <input
                value={name}
                placeholder="Your name (optional)"
                aria-label="Your name"
                className="w-full mt-2 fs-13 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary"
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                value={comment}
                placeholder="What is the issue you are facing?"
                aria-label="What is the issue you are facing?"
                maxLength={1000}
                className="w-full mt-2 fs-13 border border-gray-200 rounded-lg px-3 py-2 h-20 outline-none focus:border-primary"
                onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => setOpen(false)}
                    className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 fs-13 font-semibold hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onSubmit}
                    disabled={saving}
                    className="flex-1 py-2 rounded-lg bg-red-600 text-white fs-13 font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                    {saving ? 'Sending...' : 'Report issue'}
                </button>
            </div>
        </div>
    );
};

export default ReportIssue;
