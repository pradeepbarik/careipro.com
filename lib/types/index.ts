export type TSeodt={
    h1:string,
    title:string,
    meta_description:string,
    seo_url:string,
    short_seo_url:string
}
export type Tstate = {
    id: number,
    name: string,
    icon: null | string,
    is_serviceable: number
}
export type Tcity = {
    id: number,
    name: string,
    state: string,
    city_icon: null | string,
    is_serviceable: number,
    name_ln: string
}
export type TSelectedAddress={
    source:"map"|"pincode"|"manual"
    state:string,
    city:string,
    sub_dist:string,
    area:string,
    pincode?:number,
    landmark:string
}