'use client'
import { useRef,ReactNode } from 'react'
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
    return <Provider store={storeRef.current}>{children}</Provider>
  }