import { IBase } from "./base_interface";
import { IPriceList } from "./price_list";

export interface IServices extends IBase {
    name: string;
    image?: string;
    descr?: string;
    is_public: boolean;
    price: number;
    duration: number;
    type: string;
    staff_id: string;

    price_list: IPriceList[]
} 