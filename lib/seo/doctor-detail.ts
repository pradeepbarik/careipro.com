import { formatDoctorName } from "../helper/format-text"
export const doctorDiseaseExpertiseTabSeoData=(params:{
    doctor_name: string,
    city: string,
})=>{
    return {
        title: `Diseases treated by ${formatDoctorName(params.doctor_name)} in ${params.city} - Careipro`,
        description: `Discover the diseases treated by ${formatDoctorName(params.doctor_name)} in ${params.city}. Get expert medical care for a wide range of health conditions at Careipro.`,
        keywords: `${formatDoctorName(params.doctor_name)} diseases treated, medical conditions treated by ${formatDoctorName(params.doctor_name)}, healthcare services by ${formatDoctorName(params.doctor_name)} in ${params.city}, expert medical care in ${params.city}, Careipro doctor expertise`
    }
}
export const doctorReviewsTabSeoData=(params:{
    doctor_name: string,
    city: string,
})=>{
    return {
        title: `Patient Reviews for ${formatDoctorName(params.doctor_name)} in ${params.city} - Careipro`,
        description: `Read patient reviews for ${formatDoctorName(params.doctor_name)} in ${params.city}. Learn about the experiences of patients and the quality of care provided by ${formatDoctorName(params.doctor_name)} at Careipro.`,
        keywords: `${formatDoctorName(params.doctor_name)} patient reviews, ${formatDoctorName(params.doctor_name)} ratings, healthcare feedback for ${formatDoctorName(params.doctor_name)}, patient experiences with ${formatDoctorName(params.doctor_name)} in ${params.city}, Careipro doctor reviews`
    }
}