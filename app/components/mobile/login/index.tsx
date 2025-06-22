'use client'
import { BiEdit } from "react-icons/bi";
import classes from './style.module.scss';
import { Slides, Input, Button, RadioButton, SlideUpModal } from "../ui";
import useLogin from "@/lib/hooks/login/useLogin";
import CitySelection from '../city-selection';
const Login = ({ redirectUrl = "",onLoginSuccess,allowLoggedInUser }: { redirectUrl?: string,onLoginSuccess?:()=>void,allowLoggedInUser?:boolean }) => {
    const { step, loader, mobile, setMobile, mobileExit, otp, setOtp, userInfo, setUserInfo, editMobileClick, sendOtp, login, signUp } = useLogin({ redirectUrl,onLoginSuccess,allowLoggedInUser });
    return (
        <>
            <div className="mx-10 mt-4 relative">
                <div className={`${classes.stepIndicator}`}>
                    <span data-active={step === 1} className="h-10 w-10 rounded-full flex items-center justify-center"></span>
                    <span data-active={step === 2} className="h-10 w-10 rounded-full flex items-center justify-center"></span>
                    <span data-active={step === 3} className="h-10 w-10 rounded-full flex items-center justify-center"></span>
                </div>
                <span className={classes.connector}></span>
            </div>
            <div className="mt-4 py-2 px-2 bg-white">
                <Slides currentSlide={step}>
                    <div className="px-1">
                        <form autoComplete={"off"}>
                            <div>
                                <Input type="mobile" value={mobile} lable="Enter Your Mobile No" onChange={(e) => { setMobile(e.target.value) }} />
                            </div>
                            <div className="mt-4 py-2 flex">
                                <Button className="ml-auto" onClick={sendOtp} >
                                    Send OTP
                                    {step === 1 && loader && <span className="h-8 w-8 loader"></span>}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="px-1">
                        {mobileExit ?
                            <>
                                <form autoComplete={"off"}>
                                    <div className='flex gap-2'>
                                        <div className='relative'>
                                            <Input lable='Mobile No' value={mobile} disabled={true} />
                                            <span className="absolute right-2 bottom-2 flex gap-1 button px-1 py-1" onClick={editMobileClick}>
                                                <BiEdit className="color-white" style={{ fontSize: '1.1rem' }} />
                                                <span>Edit</span>
                                            </span>
                                        </div>
                                        <div className='w-24 shrink-0'>
                                            <Input lable='Enter OTP' type="number" value={otp} className='text-center' onChange={(e) => { setOtp(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className='mt-6'>
                                        <Button className='w-full' onClick={login} disabled={(step === 2 && loader) ? true : false}>
                                            Login
                                            {step === 2 && loader && <span className="h-6 w-6 ml-4 loader"></span>}
                                        </Button>
                                    </div>
                                </form>
                            </> :
                            <>
                                <form autoComplete={"off"}>
                                    <div className='flex gap-2'>
                                        <div className='relative'>
                                            <Input lable='Mobile No' value={mobile} disabled={true} />
                                            <span className="absolute right-2 bottom-2 flex gap-1 button px-1 py-1" onClick={editMobileClick}>
                                                <BiEdit className="color-white" style={{ fontSize: '1.1rem' }} />
                                                <span>Edit</span>
                                            </span>
                                        </div>
                                        <div className='w-28 shrink-0 ml-auto'>
                                            <Input lable='Enter OTP' type="number" value={otp} className='text-center' onChange={(e) => { setOtp(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <Input type="text" lable="First Name"  value={userInfo.first_name} onChange={(e) => { setUserInfo({ ...userInfo, first_name: e.target.value }) }} />
                                        <Input type="text" lable="Last Name" value={userInfo.last_name} onChange={(e) => { setUserInfo({ ...userInfo, last_name: e.target.value }) }} />
                                    </div>
                                    <div className="flex gap-2 items-center mt-2">
                                        <Input type="text" lable="Age" value={userInfo.age} onChange={(e) => { setUserInfo({ ...userInfo, age: parseInt(e.target.value) }) }} />
                                        <RadioButton value={userInfo.gender} label="" name="gnder" data={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]} onChange={(v) => { setUserInfo({ ...userInfo, gender: v.toString() }) }} className="mt-4" />
                                    </div>
                                    <CitySelection onSelect={(selectedCity) => { setUserInfo({ ...userInfo, state: selectedCity.state, city: selectedCity.name }) }}>
                                        <div className='mt-3'>
                                            <Input type="text" lable="City" value={userInfo.city} autoComplete='do-not-autofill' />
                                        </div>
                                    </CitySelection>
                                    <Button className="mt-4 w-full" onClick={signUp} >Sign up</Button>
                                </form>
                            </>
                        }

                    </div>
                </Slides>
            </div>
        </>
    )
}
export default Login;