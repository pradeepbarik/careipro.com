'use client'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BiHeart, BiSolidHeart, BiLogIn } from "react-icons/bi";
import { RootState } from "@/lib/store";
import { selectAuthSlice } from "@/lib/slices/authSlice";
import { addToFavourites, myFavourites } from "@/lib/services/apicalls";
import { SlideUpModal } from "@/app/components/mobile/ui";
import Login from "@/app/components/mobile/login";

/* Save this clinic. Stored in user_favourite with doctor_id 0, which is what marks the
   row as a clinic saved from its own page rather than a doctor.

   State is kept local rather than in pageSlice, because that slice's favourites are a
   list of doctor ids and its fetched flag is set by the doctor like button. Sharing it
   would mean one page's fetch could mark clinics as loaded when they were not. */
const FavouriteButton = ({ clinicId, className = "" }: { clinicId: number, className?: string }) => {
    const isLoggedIn = useSelector((state: RootState) => selectAuthSlice(state).is_loggedin);
    const [isFavourite, setIsFavourite] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            setIsFavourite(false);
            return;
        }
        myFavourites().then((response) => {
            if (response.code === 200) {
                setIsFavourite((response.data.clinic_ids || []).includes(clinicId));
            }
        }).catch(() => { /* not signed in or offline, leave it unset */ });
    }, [isLoggedIn, clinicId]);

    const saveFavourite = (next: 0 | 1) => {
        /* flip straight away, a heart that waits on the network feels broken */
        setIsFavourite(next === 1);
        setSaving(true);
        addToFavourites({ doctor_id: 0, clinic_id: clinicId, favourite: next })
            .then(() => {
                toast.success(next === 1 ? "Saved to your favourites" : "Removed from favourites", { autoClose: 1000 });
            })
            .catch(() => {
                setIsFavourite(next !== 1);
                toast.error("Could not update favourites");
            })
            .finally(() => { setSaving(false) });
    }
    const onToggle = () => {
        if (!isLoggedIn) {
            setShowLogin(true);
            return;
        }
        if (saving) {
            return;
        }
        saveFavourite(isFavourite ? 0 : 1);
    }
    /* they tapped the heart meaning to save, so finish that rather than making them
       tap again once they are back from logging in */
    const onLoginSuccess = () => {
        setShowLogin(false);
        saveFavourite(1);
    }
    return (
        <>
            <button onClick={onToggle} aria-label={isFavourite ? "Remove from favourites" : "Save to favourites"}
                aria-pressed={isFavourite} className={className}>
                {isFavourite ?
                    <BiSolidHeart className="fs-18" style={{ color: "#f43f5e" }} />
                    : <BiHeart className="fs-18 text-white" />}
            </button>
            <SlideUpModal open={showLogin}
                heading="Login to save this clinic"
                onClose={() => { setShowLogin(false) }}>
                <Login allowLoggedInUser={true} onLoginSuccess={onLoginSuccess} />
            </SlideUpModal>
        </>
    )
}
export default FavouriteButton;
