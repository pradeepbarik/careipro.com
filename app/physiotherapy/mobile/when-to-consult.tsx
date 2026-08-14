import { IconType } from "react-icons";
import { BiCheckCircle } from "react-icons/bi";
import { FaBone, FaWheelchair, FaRunning, FaBaby, FaWalking, FaNotesMedical, FaHandHoldingHeart } from "react-icons/fa";
import { GiBackPain, GiKneeCap, GiBodyBalance, GiShoulderArmor } from "react-icons/gi";
import { SectionHeading } from "@/app/components/mobile/ui";
type TSymptom = {
    name: string,
    description: string,
    icon: IconType
}
const symptoms: TSymptom[] = [
    { name: "Back & Neck Pain", description: "Long standing pain, stiffness or slip disc", icon: GiBackPain },
    { name: "Knee & Joint Pain", description: "Pain while walking, climbing stairs or arthritis", icon: GiKneeCap },
    { name: "Frozen Shoulder", description: "Shoulder stiffness with restricted movement", icon: GiShoulderArmor },
    { name: "Sports Injury", description: "Muscle sprain, ligament tear or sport strain", icon: FaRunning },
    { name: "Post Surgery Recovery", description: "Rehab after knee, hip or spine surgery", icon: FaNotesMedical },
    { name: "Paralysis & Stroke", description: "Weakness in limbs, difficulty in movement", icon: FaWheelchair },
    { name: "Vertigo & Balance", description: "Giddiness, frequent fall or unsteady walking", icon: GiBodyBalance },
    { name: "Fracture & Bone Care", description: "Stiffness and weakness after plaster removal", icon: FaBone },
    { name: "Child Development Delay", description: "Delay in sitting, standing or walking", icon: FaBaby },
    { name: "Posture Problems", description: "Desk job pain, neck hump or curved spine", icon: FaWalking }
]
const benefits = [
    "Relieves pain without medicines or injections",
    "Restores movement and daily activity independence",
    "Helps avoid surgery in many joint and spine problems",
    "Speeds up recovery after surgery, fracture or stroke",
    "Personalised exercise plan for your condition",
    "Guides correct posture and home exercises for long term relief"
]
const WhenToConsult = ({ city }: { city: string }) => {
    return (
        <>
            <div className="mt-2">
                <SectionHeading className="px-2" heading={`When should you consult a physiotherapist?`} />
                <div className="grid grid-cols-2 gap-2 px-2 mt-1">
                    {symptoms.map((symptom) =>
                        <div className="bg-white border rounded-md p-2 flex flex-col gap-1" key={symptom.name}>
                            <span className="h-9 w-9 rounded-full bg-cyan-50 flex items-center justify-center">
                                <symptom.icon className="color-primary fs-17" />
                            </span>
                            <span className="font-semibold leading-5">{symptom.name}</span>
                            <span className="text-sm text-gray-600 leading-4">{symptom.description}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-2">
                <SectionHeading className="px-2" heading="How a physiotherapist helps you" />
                <div className="bg-white border rounded-md mx-2 mt-1 p-2 flex flex-col gap-2">
                    {benefits.map((benefit) =>
                        <span className="flex items-start gap-2" key={benefit}>
                            <BiCheckCircle className="color-primary shrink-0 fs-17 mt-[2px]" />
                            <span className="leading-5">{benefit}</span>
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-600 px-2 mt-2 leading-5">
                    <FaHandHoldingHeart className="color-primary inline mr-1" />
                    Physiotherapy is a medicine free treatment that uses exercise, manual therapy and modalities to reduce
                    pain and restore movement. If a problem troubles you for more than a week or keeps coming back,
                    consult a physiotherapist near you in {city}.
                </p>
            </div>
        </>
    )
}
export default WhenToConsult;
