import { Symptom } from './symptom';
import { User } from './user';

export interface Customer extends User {
    phone: string;
    email: string;
    address: string;
    age: number;
    gender: string;
    height: string;
    weight: string;
    purpose: string;
    symptoms: Symptom[];
}
