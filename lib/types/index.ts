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