const Bar = ({ className = "" }: { className?: string }) => (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const CardBlock = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4">
        <Bar className="h-20 w-20 rounded-lg shrink-0" />
        <div className="flex-1 min-w-0 space-y-2 py-1">
            <Bar className="h-4 w-1/3" />
            <Bar className="h-3 w-2/3" />
            <Bar className="h-3 w-1/2" />
            <div className="flex gap-2 pt-1">
                <Bar className="h-5 w-20 rounded-full" />
                <Bar className="h-5 w-24 rounded-full" />
                <Bar className="h-5 w-16 rounded-full" />
            </div>
        </div>
        <div className="w-52 shrink-0 border-l border-gray-100 pl-4 flex flex-col gap-2">
            <Bar className="h-3 w-2/3" />
            <Bar className="h-3 w-1/2" />
            <Bar className="h-9 w-full rounded-lg mt-auto" />
        </div>
    </div>
);

/**
 * What a desktop page looks like while the next one is being fetched.
 *
 * It mirrors the shape nearly every desktop page here settles into, a title over a wide results
 * column with an ad rail beside it, so the layout does not jump when the real content lands. The
 * mobile skeleton used to serve both, which on a wide screen was a column of narrow bars stretched
 * across the whole window.
 *
 * The header and footer are not drawn: they live in the root layout, stay mounted across a
 * navigation, and so are never part of what is replaced here.
 */
const PageSkeletonDesktop = () => (
    <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-5">
            <Bar className="h-7 w-2/5 mb-2" />
            <Bar className="h-4 w-1/4 mb-5" />

            <div className="grid grid-cols-[7fr_3fr] gap-5 items-start">
                <div className="min-w-0 flex flex-col gap-3">
                    <CardBlock />
                    <CardBlock />
                    <CardBlock />
                </div>
                <div className="min-w-0 flex flex-col gap-4">
                    <Bar className="h-80 w-full rounded-xl" />
                    <Bar className="h-40 w-full rounded-xl" />
                </div>
            </div>
        </div>
    </div>
);

export default PageSkeletonDesktop;
