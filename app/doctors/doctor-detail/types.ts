export type TsearchParams= {
    city: string,
    state: string,
    seo_url: string,
    market_name: string,
    doctor_id: number,
    service_loc_id: number,
    clinic_id: number,
    book_appointment?:'1'|'0',
    sub_page?:string
}