'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { initUserDetail, setGuestUserSecreateKey } from '@/lib/slices/authSlice';
import { g_user_secreate_key, userSecreateKey, userinfo } from '@/constants/storage_keys';
import {registerGuestUser} from '@/lib/services/apicalls';
import { RootState } from '@/lib/store';
import useCookies from '@/lib/hooks/useCookies';
export const useAuth = () => {
  const query = useSearchParams();
  const dispatch = useDispatch();
  const {setCookie}=useCookies()
  const {cookies}=useSelector((state:RootState)=>state.authSlice)
  const registerGuestVisiter = () => {
    let guest_user_secreate_key = localStorage.getItem(g_user_secreate_key);
    if (guest_user_secreate_key) {
      return;
    }
    const referer = document.referrer ? document.referrer : "";
    const logdata = {
      first_visit_url: window.location.href,
      referer: referer,
      utm_campaign: query.get('utm_campaign')||"",
      utm_medium: query.get('utm_medium')||"",
      utm_source: query.get('utm_source')||"",
    }
    registerGuestUser(logdata).then(({data,code})=>{
      if(code===200){
        localStorage.setItem(g_user_secreate_key,data.secreate_key)
      }
    });
  }
  useEffect(() => {
    let user_info = localStorage.getItem(userinfo)? JSON.parse(localStorage.getItem(userinfo)||""):null;
    if (user_info !== null) {
      dispatch(
        initUserDetail({
          is_loggedin: true,
          user_info: user_info
        })
      );
      if(!cookies[userSecreateKey]){
        setCookie(userSecreateKey,user_info.secreate_key);
      }
    } else {
      dispatch(initUserDetail({ is_loggedin: false, user_info: {} }))
      let guest_user_secreate_key = localStorage.getItem(g_user_secreate_key);
      if (!guest_user_secreate_key) {
        registerGuestVisiter();
      } else {
        dispatch(setGuestUserSecreateKey({ secreate_key: guest_user_secreate_key }));
      }
    }
    ///let userSeachLocation= localStorage.getItem(user_search_location);
    // if(userSeachLocation){
    //   dispatch(setUserSearchLocation(JSON.parse(userSeachLocation)));
    // }
  }, [])
  return {}
}
export default useAuth;