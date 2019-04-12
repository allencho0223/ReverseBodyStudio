import { Experience } from './experience';
import { User } from './user';

export interface Instructor extends User {
    experiences: Experience[];
}
