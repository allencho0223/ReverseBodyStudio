import { Symptom } from './symptom';
import { User } from './user';
import { Programme } from './programme';
import { CustomerImage } from './customerImage';

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
    programmes: Programme[];
    customerImages: CustomerImage[];
}
