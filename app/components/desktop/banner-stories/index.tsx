import HomePageBanner from "../home/home-page-banner";
import ClinicStories, { TClinicStory } from "../home/clinic-stories";

/**
 * The banner and the stories rail side by side. Sits near the top of the city home and of the
 * listing pages, so one change to the pairing reaches every page that carries it.
 */
const BannerWithStories = ({ city, stories = [], className = "" }: { city?: string, stories?: TClinicStory[], className?: string }) => {
    /* the stories half used to be a third of the row, which left the tiles too small to read a
       thumbnail in. even halves give them the width back without the banner losing much */
    return (
        <div className={`grid grid-cols-[1fr_1fr] gap-6 items-stretch ${className}`}>
            <div className="rounded-2xl overflow-hidden shadow-card min-w-0 self-start">
                <HomePageBanner />
            </div>
            <ClinicStories stories={stories} city={city} />
        </div>
    );
};

export default BannerWithStories;