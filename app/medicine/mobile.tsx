import Link from "next/link";
import { FaUserMd, FaMapMarkerAlt } from "react-icons/fa";
import { BiPhone, BiLogoWhatsapp, BiSolidStar } from "react-icons/bi";
import Header from "../components/mobile/header";
import { SectionHeading } from "../components/mobile/ui";
const MedicineMobile = () => {
    return (
        <>
            <Header template="SUBPAGE" heading="Medicine Stores" />
            <div className="flex overflow-auto hide-scroll-bar gap-2 px-2 mt-2">
                <div className="border border-gray-300 p-2 rounded-lg shrink-0 max-w-56">
                    <p className="font-semibold">Panda Medicine store</p>
                    <p>Biggest Alopathy Medicine store in bhadrak</p>
                    <p>OT Market, Bhadrak</p>
                </div>
                <div className="border border-gray-300 p-2 rounded-lg shrink-0">
                    <p className="font-semibold">Devi Drugs</p>
                    <p>Kuans, Bhadrak</p>
                </div>
                <div className="border border-gray-300 p-2 rounded-lg shrink-0">
                    <p className="font-semibold">Panda Medicine store</p>
                    <p>OT Market, Bhadrak</p>
                </div>
            </div>
           {[1,2,3,4,5].map((i)=> <div className="bg-white border-b shadow-md mb-2" key={i}>
                                <div className="flex py-2 px-2 gap-3">
                                    <div className='flex flex-col'>
                                        <Link href={'/'} className='font-bold fs-18 one-line w-full'>Day night hoem care service</Link>
                                        <span className='flex items-center gap-1'>
                                            <FaMapMarkerAlt className='color-primary text-sm' />
                                            charampa, bhadrak Town, Bhadrak
                                        </span>
                                        <span className='flex items-center font-semibold gap-2 mt-1'>
                                            <FaUserMd className='text-lg color-primary' />
                                            20 Staffs
                                        </span>
                                    </div>
                                    <img src={"https://content.jdmagicbox.com/comp/bhubaneshwar/k8/0674px674.x674.240426194500.m1k8/catalogue/9dofbddzwkepy9b-j6axyrw077-250.jpg"} className='h-20 w-20 rounded-md flex-shrink-0 ml-auto' />
                                </div>
                                <div className='flex px-2'>
                                    <span className='font-semibold'>Medicine&nbsp;Type&nbsp;:</span>
                                    <span className='flex gap-2 overflow-auto px-2 hide-scroll-bar'>
                                        <span className='border px-1 rounded-md shrink-0'>Homeopathy</span>
                                        <span className='border px-1 rounded-md shrink-0'>Allopathy</span>
                                        <span className='border px-1 rounded-md shrink-0'>Pediatric</span>
                                        <span className='border px-1 rounded-md shrink-0'>Generic Medicines</span>
                                        <span className='border px-1 rounded-md shrink-0'>senior citizen care</span>
                                    </span>
                                </div>
                                <div className='px-2 font-semibold py-1'>Precribed By Doctors</div>
                                <div className='flex gap-2 overflow-auto px-2 hide-scroll-bar pb-1'>
                                    {[1, 2, 3, 4].map((staff,i) =>
                                        <div key={`staff-${i}`} className='flex shrink-0 border border-color-primary rounded-md gap-1' style={{ width: "30%", padding: "3px 2px" }}>
                                            <img src='https://content.jdmagicbox.com/comp/bhubaneshwar/q3/0674px674.x674.211117163052.w1q3/catalogue/shanti-health-care-laxmi-sagar-bhubaneshwar-home-nursing-services-7gr4wu2dcm-250.jpg?w=640&q=75' className="rounded-full" style={{ height: '2.5rem', width: '2.5rem' }} />
                                            <div className='flex flex-col grow' style={{ width: "calc(100% - 2.5rem)" }} >
                                                <span className='one-line font-semibold'>Kamini swain</span>
                                                <span>
                                                    Skin, Hair
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='flex gap-2 px-2 mt-1 py-2'>
                                    <a className='button grow flex items-center gap-2' data-variant="outlined">
                                        <BiLogoWhatsapp />Message
                                    </a>
                                    <a className='button grow flex items-center gap-2' data-variant="outlined">
                                        <BiPhone />Call Now
                                    </a>
                                    <button className='button grow'>Order Now</button>
                                </div>
                            </div>)}
            <SectionHeading heading="Popular Pharmacy in Bhadrak" />
            <SectionHeading heading="Ayurvedic Medicine Stores" />
            <SectionHeading heading="Homepath Medicine Stores" />
        </>
    );
};
export default MedicineMobile;