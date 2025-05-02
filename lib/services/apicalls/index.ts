import { httpPost, authenicatedFetchJson, IResponse, buildResponse } from "../http-client";
export const registerGuestUser = (data: any) => {
   return httpPost<{ secreate_key: string }>("/guser/register", data);
}
export const getUpcomingBookingList = <T>() => {
   try {
      return authenicatedFetchJson<IResponse<T>>("/user/upcoming-appointments-list");
   } catch (err: any) {
      return buildResponse(<T>[]);
   }
}
export type Tappointment = {
   booking_id: number
   booking_time: string
   clinic_id: number,
   clinic_name: string
   consult_date: string
   doctor_id: number
   doctor_name: string
   doctor_photo: string
   patient_name: string
   payment_status: string
   rating: number
   review_id: number | null
   servicelocation_id: number
   status: string
   today_booking_id: string,
   seo_url: string,
   active: number,
   case_id: number,
   experience: string,
   visited_for: string,
   review_tags: Array<{
      tag: string, score: number, topic: string, sub_topic: string
   }> | null,
   review_tags_arr?: Array<string>
}
export const fetchAppointmentHistory = (start_from: number, count: number) => {
   try {
      return authenicatedFetchJson<IResponse<Tappointment[]>>(`/user/appointment-history?start_from=${start_from}&count=${count}`)
   } catch (err: any) {
      return buildResponse<Tappointment[]>([]);
   }
}
export type TappointmentDetail = {
   booking_charge: string
   booking_id: number
   booking_time: string
   city: string
   clinic_id: number
   clinic_contact_no: string
   clinic_name: string
   clinic_state: string
   consult_date: string
   doctor_id: number
   doctor_name: string
   doctor_photo: string
   doctor_seo_url: string
   location: string
   location_lat: string
   location_lng: string
   patient_email: string
   patient_mobile: string
   patient_name: string
   patient_address: string
   patient_age: string
   patient_gender: string
   payment_status: string
   place: string
   service_charge: string
   servicelocation_id: number
   status: string
   today_booking_id: string
   total_amount: string
   prescriptions: any[],
   rev_id: number,
   rating: number,
   visited_for: string,
   experience: string,
   review_tags: Array<{
      tag: string, score: number, topic: string, sub_topic: string
   }> | null
}
export const fetchAppointmentDetail = (case_id: number, appointment_id: number) => {
   try {
      return authenicatedFetchJson<IResponse<TappointmentDetail>>(`/user/appointment-detail?case_id=${case_id}&appointment_id=${appointment_id}`);
   } catch (err: any) {
      return buildResponse<TappointmentDetail>({} as TappointmentDetail);
   }
}
type TcaseDetail = {
   booking_ids: number[]
}
export const fetchCaseDetails = (case_id: number) => {
   try {
      return authenicatedFetchJson<IResponse<TcaseDetail>>(`/user/case-details?case_id=${case_id}`);
   } catch (err: any) {
      return buildResponse<TcaseDetail>({ booking_ids: [] });
   }
}
export const uploadPrescriptionPostCurl = (data: FormData) => {
   return httpPost<{}>(`/user/upload-prescription`, data, { passSecreateKey: true, fileUpload: true });
}
export const deletePrescriptionCurl = (params: { prescription: string, booking_id: number }) => {
   return httpPost<{}>(`/user/delete-prescription`, { prescription: params.prescription, booking_id: params.booking_id }, { passSecreateKey: true });
}