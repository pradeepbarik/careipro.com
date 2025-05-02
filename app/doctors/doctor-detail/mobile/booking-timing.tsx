import { TDoctorDetail } from "@/lib/types/doctor";

const BookingTimings = ({ data }: { data: TDoctorDetail }) => {
    if (data.slno_type === "group" || data.slno_type == "group_without_time") {
        return (
            <table className="px-2 mt-2 w-full">
                <thead>
                    <tr className="fs-16">
                        <th className="">Session</th>
                        <th className="">Booking Start Time</th>
                        <th className="">Booking Limit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slno_groups?.map((slgroup) =>
                        <tr className="font-semibold color-text-light">
                            <td className="text-center py-1">{slgroup.group_name_for_user} ({slgroup.group_name})</td>
                            <td className="text-center py-1">{slgroup.booking_start}</td>
                            <td className="text-center py-1">{slgroup.limit}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
    return (
        <div className="flex flex-col gap-4">
            
        </div>
    );
}
export default BookingTimings;