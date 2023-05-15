export interface newSensor{
    friendlyName: string;
    haSensorId: string;
    type: SensorType
}

export interface Sensor extends  newSensor {
    id: number;
    createdOn: string;
    updatedOn: string;
    deleted: boolean
}

export enum SensorType {
    TEMPERATURE = 1,
    HUMIDITY = 2,
}

