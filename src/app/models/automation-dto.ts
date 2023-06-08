export interface newAutomation {
    value: string;
}

export interface Automation{
    id: number;
    value: string;
    status: FeedbackType;
    createdOn: string;
    updatedOn: string;
    deleted: boolean
}

export enum FeedbackType {
    NEW = 0,
    ACCEPTED = 1,
    DECLINED_GOOD = 2,
    DECLINED_BAD = 3,
}
