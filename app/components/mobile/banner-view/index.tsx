'use client'

import { useEffect, useState } from "react";
import classes from './style.module.scss';
const BannerView = ({ banners }: { banners: Array<{ src: string, media_type: "image" | "video", duration: number }> }) => {
    const [current, setCurrent] = useState(0);
    const play = (i: number) => {
        if(i===banners.length){
            setTimeout(() => {
                play(0)
            }, banners[0].duration)
            return;
        }
        setCurrent(i);
        if (i < banners.length) {
            setTimeout(() => {
                play(i + 1)
            }, banners[i].duration * 1000)
        }
    }
    useEffect(() => {
       let playtimer = setTimeout(() => {
            play(1)
        }, banners[0].duration);
        return ()=>{
            clearTimeout(playtimer)
        }
    }, [])
    const banner = banners[current];
    return (
        <div className="relative mt-1 rounded-md overflow-hidden">
            <div className="h-48">
                {banner.media_type === "image" ?
                    <img src={banner.src} className={`w-full h-full ${classes.shake}`} />
                    :
                    <video src={banner.src}></video>}
            </div>
            <div className="absolute bottom-3 w-full left-0 px-4 flex gap-2">
                {banners.map((banner, i) => {
                    let fillClassname = "w-0";
                    if (i < current) {
                        fillClassname = "w-full";
                    } else if (i === current) {
                        fillClassname = classes.progressFill;
                    }
                    return (
                        <span key={i} className="flex-1 bg-gray-400 rounded-lg relative overflow-hidden" style={{height:"5px"}}>
                            <span className={`bg-gray-100 h-full absolute left-0 top-0 ${fillClassname}`} style={{ animationDuration: `${banner.duration}s` }}></span>
                        </span>
                    )
                })}
            </div>
        </div>
    )
}
export default BannerView;