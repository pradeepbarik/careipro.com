/** @type {import('next').NextConfig} */
const nextConfig = {
   // output:"standalone",//Next. js can automatically create a standalone folder that copies only the necessary files for a production deployment including select files in node_modules . This will create a folder at . next/standalone which can then be deployed on its own without installing node_modules .
    images:{
        remotePatterns:[
            {
                protocol: 'http',
                hostname: 'localhost',
                port:"8080",
            },
            {
                protocol: 'http',
                hostname: 'dev.careipro.com',
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
                source:'/(Doctors|Best-Doctors)-In-:city-(of|in)-:state',
                destination:'/doctors'
            },
            {
                source:'/:state/:city/(Doctors|Best-Doctors)',
                destination:'/doctors'
            },
            {
                source:'/Physiotherapist-In-:city-of-:state',
                destination:'/physiotherapy'   
            },
            {
                source:'/:state/:city/(Physiotherapy-Centers|Physiotherapists|Best-Physiotherapy-Centers|Best-Physiotherapists)',
                destination:'/physiotherapy'   
            },
            {
                source:'/Medicines-In-:city-of-:state',
                destination:'/medicine'
            },
            {
                source:'/:state/:city/Medicines-Stores-Pharmacies',
                destination:'/medicine'
            },
            {
                source:'/Caretakers-In-:city-of-:state',
                destination:'/care-taker'
            },
            {
                source:'/:state/:city/(Caretakers|Best-Caretakers|Caregivers)',
                destination:'/care-taker'
            },
            {
                source:'/Massage-Service-In-:city-of-:state',
                destination:'/massage-service'
            },
            {
                source:'/:state/:city/(Massage-Service-Spas|Massage-Services|Best-Massage-Service-Spas|Best-Massage-Services)',
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
                source:'/:state/:city/Hospitals-And-Clinics',
                destination:'/hospitals-and-clinics'
            },
            {
                source:'/Pet-Care-Clinics-In-:city-of-:state',
                destination:'/petcare'
            },
            {
                source:'/:state/:city/Pet-Care-Clinics',
                destination:'/petcare'
            },
            {
                source: '/:seo_url([a-zA-Z0-9-_]+)-In-:city([a-zA-Z-]+)-of-:state/CATG:cat_id-:group_cat',
                destination:'/doctors/doctors-list'
            },
            {
                source: '/:state/:city([a-zA-Z-]+)/:seo_url([a-zA-Z0-9-_]+)/CATG:cat_id-:group_cat',
                destination:'/doctors/doctors-list'
            },
            {
                source:'/:state/:city/:seo_url([a-zA-Z0-9-_]+)-CATG:cat_id-:group_cat',
                destination:'/doctors/doctors-list'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-Of-:state/DR:doctor_id-SL:service_loc_id-C:clinic_id',
                destination:'/doctors/doctor-detail'
            },
            {
                source:'/:state/:city/:seo_url-In-:market_name/DR:doctor_id-SL:service_loc_id-C:clinic_id',
                destination:'/doctors/doctor-detail'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-Of-:state/DR:doctor_id-SL:service_loc_id-C:clinic_id/help-center',
                destination:'/doctor-help-center'
            },
            {
                source:'/:state/:city/:seo_url-In-:market_name/DR:doctor_id-SL:service_loc_id-C:clinic_id/help-center',
                destination:'/doctor-help-center'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-Of-:state/DR:doctor_id-SL:service_loc_id-C:clinic_id/:sub_page',
                destination:'/doctors/doctor-detail'
            },
            {
                source:'/:state/:city/:seo_url-In-:market_name/DR:doctor_id-SL:service_loc_id-C:clinic_id/:sub_page',
                destination:'/doctors/doctor-detail'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-of-:state/CLINICS-CATG:cat_id-:group_cat',
                destination:'/hospitals-and-clinics/clinics-list'
            },
            {
                source:'/:state/:city/:seo_url-In-:market_name/CLINICS-CATG:cat_id-:group_cat',
                destination:'/hospitals-and-clinics/clinics-list'
            },
            {
                source:'/:seo_url-In-:city-of-:state/CLINICS-CATG:cat_id-:group_cat',
                destination:'/hospitals-and-clinics/clinics-list'
            },
            {
                source:'/:state/:city/:seo_url/CLINICS-CATG:cat_id-:group_cat',
                destination:'/hospitals-and-clinics/clinics-list'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-of-:state/:business_type(CT|C|PTY):clinic_id-:state_city',
                destination:'/hospitals-and-clinics/clinic-detail'
            },
            {
                source:'/:state/:city/:seo_url-In-:market_name/:business_type(CT|C|PTY):clinic_id-:state_city',
                destination:'/hospitals-and-clinics/clinic-detail'
            },
            {
                source:'/:seo_url-At-:market_name-In-:city-of-:state/:business_type(CT|C|PTY):clinic_id-:state_city/:sub_page',
                destination:'/hospitals-and-clinics/clinic-detail'
            },
             {
                source:'/:state/:city/:seo_url-In-:market_name/:business_type(CT|C|PTY):clinic_id-:state_city/:sub_page',
                destination:'/hospitals-and-clinics/clinic-detail'
            },
            {
                source:'/Doctor-Specialists-And-Services-In-:city-of-:state',
                destination:'/all-specialists'
            },
            {
                source:'/:state/:city/doctor-specialists-and-services',
                destination:'/all-specialists'
            },
            {
                source:'/Read-Articles-for-:city-in-:state',
                destination:'/articles'
            },
            {
                source:'/:state/:city/(Read-Articles|Healthcare-Articles)',
                destination:'/articles'
            },
            {
                source:'/:state/:seo_url-in-:city/:page_type-:page_id',
                destination:'/dynamic-page'
            },
            {
                source:'/:state/:city/:seo_url/:page_type-:page_id',
                destination:'/dynamic-page'
            },
            // {
            //     source:'/articles/:seo_url/:page_type-:page_id',
            //     destination:'/dynamic-page'
            // },
            {
                source:'/quick-actions-in-:city-of-:state',
                destination:'/quick-actions'
            },
            {
                source:'/:state/:city/Quick-Actions',
                destination:'/quick-actions'
            },
            {
                source:'/:city-in-:state',
                destination:'/city'
            },
            {
                source:'/:state/:city.xml',
                destination:'/city-sitemap?state=:state&city=:city'
            },
            {
                source:'/:state/:city',
                destination:'/city'
            }
        ]
    }
};

export default nextConfig;