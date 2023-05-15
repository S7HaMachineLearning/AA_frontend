export interface Sensor {
    id: number;
    friendlyName: string;
    haSensorId: string;
    type: SensorType
    createdOn: string;
    updatedOn: string;
    deleted: boolean
}

export enum SensorType {
    TEMPERATURE = 1,
    HUMIDITY = 2,
}