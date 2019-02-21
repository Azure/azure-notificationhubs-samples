// Interface: Events

export interface Registration {
    type: EventType;
    title: string;
    registrationId: string;
    azureRegId: string;
    received: Date;
}

export interface Notification {
    type: EventType;
    title: string;
    message: string;
    count: number;
    sound: string;
    image: string;
    additionalData: any;
    received: Date;
}

export enum EventType {
    registration, 
    notification
}