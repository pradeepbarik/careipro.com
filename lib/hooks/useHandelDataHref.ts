'use client'
import { useRouter,usePathname } from 'next/navigation';
import { useEffect } from "react"
const useHandelDataHref = () => {
    const router = useRouter()
    const path=usePathname();
    useEffect(() => {
        let elems = document.getElementsByClassName('click')
        for (let i = 0; i < elems.length; i++) {
            elems[i].addEventListener('click', function (e) {
                const target = e.target as HTMLElement;
                if (target.tagName.toLowerCase() === 'a') {
                    return;
                }
                const href = elems[i].getAttribute('data-href');
                if (href) {
                    router.push(href);
                }
            })
        }
    }, [path])
    return {}
}
export default useHandelDataHref;