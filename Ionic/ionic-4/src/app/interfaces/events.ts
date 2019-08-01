// Interface: Events

export interface Registration {
    type: EventType;
    title: string;
    registrationId: string;
    azureRegId: string;
    received: Date;
}

export interface Notification {
    // custom properties I added to the object
    type: EventType;
    received: Date;
    // Copied over from the Capacitor plugin
    id: string;
    title: string;
    subtitle?: string;
    body?: string;
    badge?: number;
    notification?: any;
    data: any;
    click_action?: string;
    link?: string;

    // message: string;
    // count: number;
    // sound: string;
    // image: string;
    // additionalData: any;
}

export enum EventType {
    registration,
    notification
}
