import useDeviceInfo from "@/lib/hooks/useDeviceInfo";
import PageSkeleton from "../components/mobile/page-loader";

const Bar = ({ className = "" }: { className?: string }) => (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

/**
 * The account section has its own boundary so a move between my-profile pages only blanks the panel
 * on the right. Without one the nearest boundary is the root, which sits above this section's
 * layout and would take the menu down with it on every click.
 */
export default function Loading() {
    const { device } = useDeviceInfo();
    if (device.type === "mobile") {
        return <PageSkeleton />;
    }
    return (
        <>
            <Bar className="h-5 w-48 mb-3" />
            <div className="flex flex-col gap-3">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4">
                        <Bar className="h-16 w-16 rounded-full shrink-0" />
                        <div className="flex-1 min-w-0 space-y-2 py-1">
                            <Bar className="h-4 w-1/3" />
                            <Bar className="h-3 w-2/3" />
                        </div>
                        <Bar className="h-9 w-40 rounded-lg shrink-0" />
                    </div>
                ))}
            </div>
        </>
    );
}
