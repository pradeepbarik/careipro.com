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
                source:'/Physiotherapist-In-:city-of-:state',
                destination:'/physiotherapy'   
            },
            {
                source:'/Medicines-In-:city-of-:state',
                destination:'/medicine'
            },
            {
                source:'/Caretakers-In-:city-of-:state',
                destination:'/care-taker'
            },
            {
                source:'/Massage-Service-In-:city-of-:state',
                destination:'/massage-service'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-of-:state/CATG:cat_id-RELAXATION',
                destination:'/massage-service/service-detail'
            },
            {
                source:'/:seo_url-In-:city-of-:state/CATG:cat_id-RELAXATION',
                destination:'/massage-service/service-detail'
            },
            {
                source:'/Hospitals-and-clinics-In-:city-of-:state',
                destination:'/hospitals-and-clinics'
            },
            {
                source:'/Pet-Care-Clinics-In-:city-of-:state',
                destination:'/petcare'
            },
            {
                source:'/:seo_url-In-:city-of-:state/CATG:cat_id-DOCTOR',
                destination:'/doctors/doctors-list'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-Of-:state/DR:doctor_id-SL:service_loc_id-C:clinic_id',
                destination:'/doctors/doctor-detail'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-Of-:state/DR:doctor_id-SL:service_loc_id-C:clinic_id/:sub_page',
                destination:'/doctors/doctor-detail'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-of-:state/CLINICS-CATG:cat_id-:group_cat',
                destination:'/hospitals-and-clinics/clinics-list'
            },
            {
                source:'/:seo_url-In-:city-of-:state/CLINICS-CATG:cat_id-:group_cat',
                destination:'/hospitals-and-clinics/clinics-list'
            },
            // {
            //     source:'/:seo_url-At-:market_name-In-:city-of-:state/CT:clinic_id-:state_city',
            //     destination:'/care-taker/caretaker-clinic-detail'
            // }, 
            {
                source:'/:seo_url-At-:market_name-In-:city-of-:state/:business_type(CT|C):clinic_id-:state_city',
                destination:'/hospitals-and-clinics/clinic-detail'
            }, 
            {
                source:'/:seo_url-At-:market_name-In-:city-of-:state/C:clinic_id-:state_city/:sub_page',
                destination:'/hospitals-and-clinics/clinic-detail'
            },
            {
                source:'/Doctor-Specialists-And-Services-In-:city-of-:state',
                destination:'/all-specialists'
            },
            {
                source:'/:city-in-:state',
                destination:'/city'
            }
        ]
    }
};

export default nextConfig;
