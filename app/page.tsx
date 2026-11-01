import type { Metadata } from "next";
import Link from "next/link";
import SwiperBanner from "./components/mobile/ui/swiper-banner";
import { getAllCities } from "@/lib/hooks/index";
import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import ChooseCityHome from "./components/client-components/choose-city-home";

/* The front door, for somebody who has not told us where they are.
 *
 * Anyone who has chosen a city never reaches this: the middleware sends / straight to that city's
 * home page off the cookie. This is the first visit. Rather than guess a city and fill the screen
 * with clinics they may be nowhere near, it shows what careipro is and opens the city picker.
 *
 * It is also the one page naming every city careipro covers, so a search engine can crawl down
 * into each city from here.
 */
export const metadata: Metadata = {
  title: "Find Doctors, Clinics, Hospitals, Medicine & Caretakers Near You | Careipro",
  description: "Careipro helps you find doctors, book appointments, hire caretakers and locate medicine stores in your city. Choose your city to get started.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const Home = async () => {
  const { device } = useDeviceInfo();
  const { states, data } = await getAllCities();
  /* only the cities actually served. the file carries every city in the country, most with nothing
     to show yet, and offering one of those would be a dead end */
  const servingStates = states.filter((state) => state.is_serviceable === 1);
  const cities = servingStates
    .flatMap((state) => data[state.name.toLowerCase()] || [])
    .filter((city) => city.is_serviceable === 1)
    .map((city) => ({ id: city.id, name: city.name, state: city.state }));

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* the header, the banner and the services all live under ChooseCityHome: its header carries
          the city pill, which has to be able to open the picker */}
      <ChooseCityHome cities={cities} isMobile={device.type === "mobile"}>
      {/* the same slider the city home carries at the top, minus its first slide: that one is a
          search box, and searching needs a city we do not have yet. the other two stand on their
          own, they are about listing a business rather than finding one. */}
      <div className="max-w-5xl mx-auto px-4 pt-3 pb-4">
        <SwiperBanner banners={[
          <div key="promo-register-clinic" className="relative rounded-md overflow-hidden">
            <Link href="/business-listing/hospital-clinic?utm_source=careipro&utm_medium=home-top-banner&utm_campaign=register-clinic-banner">
              <img src="/banners/register-clinic-banner.png" alt="List your clinic on Careipro" className="w-full h-auto block rounded-md" />
            </Link>
          </div>,
          <div key="promo-personalised-website" className="relative rounded-md overflow-hidden">
            <Link href="/business-listing/hospital-clinic?utm_source=careipro&utm_medium=home-top-banner&utm_campaign=personalised-website-banner">
              <img src="/banners/personalised-website.png" alt="Get a personalised website for your clinic" className="w-full h-auto block rounded-md" />
            </Link>
          </div>,
        ]} />
      </div>
      </ChooseCityHome>
    </div>
  );
};
export default Home;
