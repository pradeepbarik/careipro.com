export const doctorSpecialityIcon=(icon:string)=>{
    return `http://localhost:8080/doctorapp/assets/images/doctor-specialist/${icon}`;
}
export const verticalIcon=(icon:string)=>{
    return `http://localhost:8080/doctorapp/assets/images/verticals/${icon}`;
}
export const getCityIcon=(icon:string)=>{
    if(icon){
        return `http://localhost:8080/doctorapp/assets/images/city-icon/${icon}`;
    }else{
        return `http://localhost:8080/doctorapp/assets/images/city-icon/default-city.png`;
    }
}
export const doctorProfilePic=(image:string)=>{
    if(image){
        return `http://localhost:8080/doctorapp/assets/images/profile/doctor/${image}`;
    }else{
        return `http://localhost:8080/doctorapp/assets/images/profile/doctor/default.webp`;

    }
}
export const clinicProfilePic=(image:string)=>{
    if(image){
        return `http://localhost:8080/doctorapp/assets/images/clinic/${image}`;
    }else{
        return `http://localhost:8080/doctorapp/assets/images/clinic/default_clinic.jpg`;

    }
}
export const clinicBannerImage=(image:string)=>{
    return `http://localhost:8080/doctorapp/assets/images/clinic/${image}`;
}
export const popularClinicBanner=(image:string)=>{
    return `http://localhost:8080/doctorapp/assets/images/popular-clinic-banner/${image}`;
}