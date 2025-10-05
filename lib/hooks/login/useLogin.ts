'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import moment from '@/lib/helper/date-time';
import { httpPost } from '../../services/http-client';
import { userinfo, userSecreateKey } from '../../../constants/storage_keys';
import useCookies from '../useCookies';
import { initUserDetail } from '@/lib/slices/authSlice';
const useLogin = ({ redirectUrl = "", allowLoggedInUser = false, onLoginSuccess }: { allowLoggedInUser?: boolean, redirectUrl?: string, onLoginSuccess?: () => void }) => {
    const router = useRouter()
    const { setCookie, deleteCookie } = useCookies();
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [userInfo, setUserInfo] = useState<{ first_name: string, last_name: string, gender: string, age: number | "", state: string, city: string }>({ first_name: "", last_name: "", gender: "", age: "", state: "", city: "" });
    const [mobileExit, setMobileExist] = useState(false);
    const [loader, setLoader] = useState(false);
    const editMobileClick = () => {
        setStep(1);
    }
    const sendOtp = () => {
        if (!mobile) {
            toast.info("Please enter your mobile no.")
            return;
        }
        if (mobile.length !== 10) {
            toast.error("Mobile number must be 10 Digit");
            return;
        }
        setLoader(true);
        httpPost<{ mobile_exist: boolean }>("/auth/login", { case: "send_otp", mobile: mobile }).then(({ data }) => {
            setLoader(false);
            setMobileExist(data.mobile_exist);
            setStep(2);
        })
    }
    const refreshRoute = () => {
        router.refresh();
    }
    const login = () => {
        if (otp.length === 0) {
            toast.info("Please enter OTP");
            return;
        }
        setLoader(true);
        httpPost("/auth/login", { case: "login", mobile: mobile, otp: otp }).then(async ({ data }) => {
            setLoader(false);
            let expire = moment().add(2, 'years').format('YYYY-MM-DD');
            await setCookie(userSecreateKey, (<any>data).secreate_key, { expire: expire });
            window.localStorage.setItem(userinfo, JSON.stringify(data));
            if (onLoginSuccess) {
                dispatch(initUserDetail({ is_loggedin: true, user_info: data }));
                onLoginSuccess();
                return;
            }
            if (!onLoginSuccess && !redirectUrl) {
                dispatch(initUserDetail({ is_loggedin: true, user_info: data }));
                router.back()
                return;
            }
            if (redirectUrl) {
                router.push(redirectUrl);
            } else {
                router.refresh();
            }
        }).catch((err: any) => {
            setLoader(false);
            toast.error(err.message);
        })
    }
    const signUp = () => {
        if (otp.length === 0) {
            toast.error("Please enter OTP");
            return;
        }
        if (!userInfo.first_name) {
            toast.error("Please enter your First name");
            return;
        }
        if (!userInfo.age) {
            toast.error("Please enter your Age");
            return;
        }
        if (!userInfo.gender) {
            toast.error("Please enter your Gender");
            return;
        }
        if (!userInfo.city) {
            toast.error("Please enter your City");
            return;
        }
        httpPost("/auth/login", { case: "signup", mobile: mobile, otp: otp, first_name: userInfo.first_name, last_name: userInfo.last_name, age: userInfo.age, gender: userInfo.gender, state: userInfo.state, city: userInfo.city }).then(async ({ data }) => {
            setLoader(false);
            window.localStorage.setItem(userinfo, JSON.stringify(data));
            let expire = moment().add(2, 'years').format('YYYY-MM-DD');
            await setCookie(userSecreateKey, (<any>data).secreate_key, { expire: expire });
            if (onLoginSuccess) {
                dispatch(initUserDetail({ is_loggedin: true, user_info: data }));
                onLoginSuccess();
                return;
            }
            if (redirectUrl) {
                router.push(redirectUrl);
            } else {
                router.refresh();
            }
        }).catch((err: any) => {
            setLoader(false);
            toast.error(err.message);
        })
    }
    const logOut = async () => {
        dispatch(initUserDetail({ is_loggedin: false, user_info: null }));
        await deleteCookie(userinfo);
        await deleteCookie(userSecreateKey);
        window.localStorage.clear();
        router.refresh();
    }
    useEffect(() => {
        if (allowLoggedInUser === true) {
            return;
        }
        let isloggedin = window.localStorage.getItem(userinfo) ? true : false;
        if (isloggedin) {
            router.push('/');
        }
    }, [])
    return {
        step,
        loader,
        mobile, setMobile, mobileExit, otp, setOtp, userInfo, setUserInfo, editMobileClick, sendOtp, login, signUp,
        logOut,
        refreshRoute
    }
}
export default useLogin;