/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'http',
                hostname: 'localhost',
                port:"8080",
            },
            {
                protocol: 'https',
                hostname: 'careipro.com',
            },
            {
                protocol: 'https',
                hostname: 'assets.careipro.com',
            }
        ]
    },
    rewrites: async()=> {
        return [
            {
                source:'/Doctors-In-:city-of-:state',
                destination:'/doctors'
            },
            {
                source:'/:seo_url-In-:city-of-:state/CATG:cat_id-:group_cat',
                destination:'/doctors/doctors-list'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-Of-:state/DR:doctor_id-SL:service_loc_id-C:clinic_id',
                destination:'/doctors/doctor-detail'
            },
            {
                source:'/Hospitals-and-clinics-in-:city-of-:state',
                destination:'/hospitals-and-clinics'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-of-:state/CLINICS-CATG:cat_id-:group_cat',
                destination:'/hospitals-and-clinics/clinics-list'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-of-:state/C:clinic_id-:state_city',
                destination:'/hospitals-and-clinics/clinic-detail'
            },
            {
                source:'/Medicines-in-:city-of-:state',
                destination:'/medicine'
            },
            {
                source:'/Caretaker-service-in-:city-of-:state',
                destination:'/care-taker'
            },
            {
                source:'/:city-in-:state',
                destination:'/city'
            }
        ]
    }
};

export default nextConfig;
