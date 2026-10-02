import { capitalizeFirstLetter } from "@/lib/helper/format-text";
import BannerWithStories from "../banner-stories";
import { TClinicStory } from "./clinic-stories";

/**
 * The first thing a visitor sees on a city page. The banner runs down the left, the stories rail
 * sits beside it so the page has something that moves day to day rather than the same content on
 * every visit. Stories arrive through the prop, nothing posts them yet.
 */
const HeroSection = ({ city, stories = [] }: { city: string, stories?: TClinicStory[] }) => {
    const cityLabel = capitalizeFirstLetter(city || '');
    return (
        <div className="mb-8">
            {/* the only h1 of the page, the banner beside it carries no text a crawler can read */}
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Healthcare in {cityLabel}</h1>
            <p className="fs-14 text-gray-500 mt-0.5 mb-4">
                Find trusted doctors, clinics, hospitals and home care services near you.
            </p>
            <BannerWithStories city={cityLabel} stories={stories} />
        </div>
    );
};

export default HeroSection;
