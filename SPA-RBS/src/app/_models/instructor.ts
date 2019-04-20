import { Experience } from './experience';
import { User } from './user';
import { Client } from './client';

export interface Instructor extends User {
    experiences: Experience[];
    clients: Client[];
}
