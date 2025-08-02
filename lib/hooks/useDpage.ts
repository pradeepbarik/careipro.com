import { cache } from "react";
import { fetchJson, IResponse } from "../services/http-server";

export type Section = {
    section_name:string,
    heading: string;
    subHeading: string;
    sectionType: "form" | string;
    content: string;
    inputFields: InputField[];
    button: {
        label: string;
        style: { [key: string]: any }; // Can be made stricter if you know the style keys
        icon: string;
    };
};

type InputField = {
    key:string,
    label: string;
    placeHolder: string;
    required: boolean;
    element: "input" | "dropdown" | string;
    type: "text" | "mobile" | "number" | string;
    options: Option[];
};

type Option = {
    label: string;
    value: string;
};
export type PageData = {
    _id: string;
    pageType: "FORM" | string;
    state: string;
    city: string;
    seo_url: string;
    pageId: number;
    seoDt: {
        pageTitle: string;
        pageDescription: string;
    };
    logo: string;
    banners: any[]; // Can be replaced with a proper Banner[] type if needed
    heading: string;
    subHeading: string;
    sections: Section[];
};
export const fetchDPageData = cache(async (state: string, city: string, pageType: string, pageId: number) => {
    try {
        const res = await fetchJson<PageData>(`/cache/${state.toLowerCase().replace(' ', '-')}/${city.toLowerCase().replace(' ', '-')}/pages/${pageType.toUpperCase()}_${pageId}.json`);
        return res;
    } catch (err: any) {
        const { data } = await fetchJson<IResponse<PageData>>(`/init-cache/init-page-data?state=${state.replace(' ', '-')}&city=${city.replace(' ', '-')}&page_type=${pageType.toUpperCase()}&page_id=${pageId}`);
        return data;
    }
})