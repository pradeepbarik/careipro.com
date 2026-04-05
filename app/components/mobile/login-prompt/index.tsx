'use client';
import { useState } from "react";
import { useSelector } from "react-redux";
import { BiLogIn, BiX } from "react-icons/bi";
import { RootState } from "@/lib/store";
import { SlideUpModal } from "../ui";
import Login from "../login";

type LoginPromptProps = {
    /** Message shown on the prompt banner */
    message?: string;
    /** Call-to-action button text */
    buttonText?: string;
    /** Position style overrides */
    style?: React.CSSProperties;
    /** Optional callback after successful login */
    onLoginSuccess?: () => void;
};

const LoginPrompt = ({
    message = "Login to access all features",
    buttonText = "Login / Signup",
    style = {},
    onLoginSuccess,
}: LoginPromptProps) => {
    const { is_loggedin } = useSelector((state: RootState) => ({
        is_loggedin: state.authSlice.is_loggedin,
    }));
    const [showModal, setShowModal] = useState(false);
    const [dismissed, setDismissed] = useState(
        typeof sessionStorage !== "undefined" && sessionStorage.getItem("loginPromptDismissed") === "1"
    );

    const handleDismiss = () => {
        setDismissed(true);
        sessionStorage.setItem("loginPromptDismissed", "1");
    };

    const handleLoginSuccess = () => {
        setShowModal(false);
        if (onLoginSuccess) {
            onLoginSuccess();
        }
    };

    if (is_loggedin || dismissed) return null;

    return (
        <>
            {/* Floating Banner */}
            <div
                className="fixed left-0 w-full px-2 z-10"
                style={{ bottom: "3.5rem", ...style }}
            >
                <div className="bg-white border border-blue-200 rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 relative">
                    <BiX
                        className="absolute -right-1 -top-2 bg-gray-400 rounded-full text-white text-lg cursor-pointer"
                        onClick={handleDismiss}
                    />
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <BiLogIn className="text-blue-600" style={{ fontSize: "1.4rem" }} />
                    </div>
                    <div className="flex flex-col grow">
                        <span className="font-semibold text-sm text-gray-800">{message}</span>
                        <span className="text-xs text-gray-500 mt-0.5">Book appointments, track visits & more</span>
                    </div>
                    <button
                        className="bg-primary color-white font-semibold text-sm px-3 py-2 rounded-lg shrink-0 shadow-sm"
                        onClick={() => setShowModal(true)}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>

            {/* Login Modal */}
            <SlideUpModal
                open={showModal}
                heading="Login / Signup"
                headingIcon={<BiLogIn className="text-xl color-primary mr-2" />}
                onClose={() => setShowModal(false)}
            >
                <Login allowLoggedInUser={true} onLoginSuccess={handleLoginSuccess} />
            </SlideUpModal>
        </>
    );
};

export default LoginPrompt;
