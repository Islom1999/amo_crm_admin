import { SchemoduleType } from "src/enumerations";
import { IBase } from "./base_interface";
import { IStaff } from "./staff";

export interface ISchemodule extends IBase{
    notes:           string;
    schemodule_type: SchemoduleType;   //enum
    day_of_week:     number;
    start_time:      Date;
    end_time:        Date;
    staff_id:        string;

    staff: IStaff
} 