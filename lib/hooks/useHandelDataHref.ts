'use client'
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from "react"
const useHandelDataHref = () => {
    const router = useRouter()
    const path = usePathname();
    useEffect(() => {
        const handleClick = (e: Event) => {
            const target = e.currentTarget as HTMLElement
            if (['a', 'button', 'input', 'textarea', 'select'].includes(target.tagName.toLowerCase())) {
                return
            }
            const href = target.getAttribute('data-href')
            if (href) {
                router.push(href)
            }
        }
        const elems = Array.from(document.getElementsByClassName('click'))
        elems.forEach((el) => {
            el.addEventListener('click', handleClick)
        })
        return () => {
            elems.forEach((el) => {
                el.removeEventListener('click', handleClick)
            })
        }
    }, [path])
    return {}
}
export default useHandelDataHref;