'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initUserDetail, setGuestUserSecreateKey } from '@/lib/slices/authSlice';
import { g_user_secreate_key, userSecreateKey, userinfo } from '@/constants/storage_keys';
export const useAuth = () => {
  const query = useSearchParams();
  const dispatch = useDispatch();
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
    console.log('logdata',logdata)
  }
  useEffect(() => {
    let user_info = localStorage.getItem(userinfo);
    if (user_info !== null) {
      // dispatch(
      //   setLoggedinUserInfo({
      //     is_loggedin: true,
      //     user_info: JSON.parse(user_info)
      //   })
      // );
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