import { ISpecialization } from './ISpecializations';
import { ITag } from './ITag';
import { ISchedule } from './ISchedule';

export interface IDoctor {
    id?: number;
    name: string;
    urlImg: string;
    rate: number;
    specializations: ISpecialization[];
    tags: ITag[];
    schedules: ISchedule[];
}
