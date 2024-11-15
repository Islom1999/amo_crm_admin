import { BloodGroup } from "src/enumerations";
import { IBase } from "./base_interface";
import { IAppointment } from "./appiontment";

export interface IPatient extends IBase {
    image: string;
    fullname: string;
    gender: string;
    pinfl: string;
    series_document: string;
    nationality: string;
    phone: number;
    email: string;
    address: string;
    date_of_birth: Date;
    bios: string;
    blood_group: BloodGroup;
}

export interface IPatientHistory extends IBase {
    name: string
    descr: string
    date: string
    appointment_id: any
    patient_id: string

    appointment: IAppointment
    patient: IPatient
}
  