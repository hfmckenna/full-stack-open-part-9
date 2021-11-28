export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

type Gender = "male" | "female" | "other";

export interface Entry {
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >