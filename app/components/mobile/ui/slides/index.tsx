import { ReactNode } from "react"

const Slides = ({ children,currentSlide }: { children: ReactNode[],currentSlide:number }) => {
    return (
        <>
            <div className="overflow-hidden w-full">
                <div className="flex" style={{transform:`translateX(${(0-(currentSlide-1)*100)}%)`, transition:"transform 0.6s ease 0s"}}>
                    {children.map((el,i) =>
                        <div key={`slide-${i}`} className="w-full shrink-0">
                            {el}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Slides