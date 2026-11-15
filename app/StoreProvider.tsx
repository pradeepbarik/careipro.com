'use client'
import { useRef, useEffect, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import {initCookies} from '@/lib/slices/authSlice';
export default function StoreProvider({
    cookies,
    children,
  }: {
    cookies?:Record<string,string>
    children: ReactNode
  }) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore();
      if(cookies){
        storeRef.current.dispatch(initCookies(cookies));
      }
    }
    /* router.refresh() re-renders the layout with the current cookies, but the store above is only
       built once, so without this a login or logout followed by a refresh left it stale */
    const cookieKey = JSON.stringify(cookies || {});
    const firstRun = useRef(true);
    useEffect(() => {
      if (firstRun.current) { firstRun.current = false; return; }
      storeRef.current?.dispatch(initCookies(cookies || {}));
    }, [cookieKey]);
    return <Provider store={storeRef.current}>{children}</Provider>
  }