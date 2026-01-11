export const capitalizeFirstLetter = (text: string): string => {
    return text.replace(/^./, text[0].toUpperCase());
}
export const capitalizeEachWordFirstLetter = (text: string): string => {
    const finalSentence = text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    return finalSentence;
}
export const formatCurrency = (amount: number, format: 's' | 'l' = "s") => {
    if (format == 'l') {
        return 'Rs.' + parseInt(amount.toString());
    }
    return `₹${parseInt(amount.toString())}`
}
export const formatDoctorName = (name: string, business_type: string = "DOCTOR") => {
    if (business_type === "DOCTOR") {
        return `Dr. ${name}`;
    } else {
        return name;
    }
}
export const textTruncate = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text;
    }
}
export const doctorType=(business_type:string)=>{
    if(business_type==="RELAXATION"){
        return "Therapist";
    }else if(business_type==="CARETAKER"){
        return "Caretaker";
    }else if(business_type==="PHYSIOTHERAPY"){
        return "Physiotherapist";
    }else {
        return "Doctor";
    }
}
export const doctorsTabDisplayname=(business_type:string)=>{
    if(business_type==="RELAXATION"){
        return "Therapists";
    }else if(business_type==="CARETAKER"){
        return "Caretakers";
    }else if(business_type==="PHYSIOTHERAPY"){
        return "Physiotherapists";
    }else {
        return "Doctors";
    }
}
export const groupCategoryDisplayName=(business_type:string)=>{
    if(business_type==="RELAXATION"){
        return "Massage & Relaxation";
    }else if(business_type==="CARETAKER"){
        return "Caretaker";
    }else if(business_type==="PHYSIOTHERAPY"){
        return "Physiotherapy";
    }else if(business_type==="CLINIC"){
        return "Hospital & Clinic";
    }else if(business_type==="PETCARE"){
        return "Petcare";
    }else if(business_type==="MEDICINESTORE"){
        return "Medicine Store";
    }else if(business_type==="DISEASE"){
        return "Disease symptom";
    }else {
        return "Doctor";
    }
}
export const groupCategoryHeading=(business_type:string)=>{
    if(business_type==="RELAXATION"){
        return "Find best massage therapist for";
    }else if(business_type==="CARETAKER"){
        return "Hire best caretaker for";
    }else if(business_type==="PHYSIOTHERAPY"){
        return "Find best physiotherapist for";
    }else if(business_type==="CLINIC"){
        return "Find hospitals and clinics";
    }else if(business_type==="PETCARE"){
        return "Find best veterinarian for";
    }else if(business_type==="MEDICINESTORE"){
        return "Find medicines stores for";
    }else if(business_type==="DISEASE"){
        return "Find best doctors by symptom";
    }else {
        return "Find best Doctor by specialization";
    }
}
export const showMaskedMobile=(mobile:string)=>{
    if(mobile.length===10){
        return mobile.substr(0,3)+'XXXX'+mobile.substr(7,10);
    }
    return mobile;
}
export const FormatTotalLiked = (total_liked?: number) => {
    if (!total_liked) return '';
    if (total_liked >= 1000000) {
        return (total_liked / 1000000).toFixed(1).replace(/\.0$/, '') + 'M+';
    }
    if (total_liked >= 1000) {
        return (total_liked / 1000).toFixed(1).replace(/\.0$/, '') + 'K+';
    }
    return total_liked.toString();
}
export const formatRating=(rating:string,defaultValue:string="")=>{
    let rate=parseFloat(rating);
    if(isNaN(rate)){
        rate=0;
    }
    if(rate==0 && defaultValue!=""){
        return defaultValue;
    }
    if(rate<=2){
        rate=3;
    }
    if(rate>5){
        rate=5;
    }
    return rate.toFixed(1);
}