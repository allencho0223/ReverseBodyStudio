import { Experience } from './experience';
import { User } from './user';
import { Customer } from './customer';

export interface Instructor extends User {
    experiences: Experience[];
    customers: Customer[];
}
