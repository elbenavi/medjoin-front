export interface IAppointment {
    id?: number;
    preferredDate: string;
    endAppoinment: string;
    reason: string;
    userId?: string;
    doctorId?: string;
    isPassed?: boolean;
}
