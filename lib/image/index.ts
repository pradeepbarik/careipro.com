const ASSET_URL=process.env.asset_url
export const doctorSpecialityIcon=(icon:string)=>{
    return `${ASSET_URL}/images/doctor-specialist/${icon}`;
}
export const verticalIcon=(icon:string)=>{
    return `${ASSET_URL}/images/verticals/${icon}`;
}
export const getCityIcon=(icon:string)=>{
    if(icon){
        return `${ASSET_URL}/images/city-icon/${icon}`;
    }else{
        return `${ASSET_URL}/images/city-icon/default-city.png`;
    }
}
export const doctorProfilePic=(image:string)=>{
    if(image){
        return `${ASSET_URL}/images/profile/doctor/${image}`;
    }else{
        return `${ASSET_URL}/images/profile/doctor/default.webp`;

    }
}
export const clinicProfilePic=(image:string)=>{
    if(image){
        return `${ASSET_URL}/images/clinic/${image}`;
    }else{
        return `${ASSET_URL}/images/clinic/default_clinic.jpg`;

    }
}
export const clinicBannerImage=(image:string)=>{
    return `${ASSET_URL}/images/banners/${image}`;
}
export const popularClinicBanner=(image:string)=>{
    return `${ASSET_URL}/images/popular-clinic-banner/${image}`;
}