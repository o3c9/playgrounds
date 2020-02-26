import EventEmitter from "events";

type EventsOf<T> = keyof T & string;

type ListenerFunc<T, E extends EventsOf<T>> = T[E] extends (
    ...args: any[]
) => void
    ? T[E]
    : never;

type ListenerArgs<T, E extends EventsOf<T>> = T[E] extends (
    ...args: infer A
) => void
    ? A
    : never;

export class SafeEmitter<T> {
    private emitter = new EventEmitter();
    public emit<E extends EventsOf<T>>(event: E, ...data: ListenerArgs<T, E>) {
        return this.emitter.emit(event, ...data);
    }

    public on<E extends EventsOf<T>>(event: E, listener: ListenerFunc<T, E>) {
        return this.emitter.on(event, listener);
    }
}

export type Message = string;
export type ThreadID = number;
export type UserID = number;
export type Participants = UserID[];

export type Commands = {
    sendMessageToThread: (t: ThreadID, m: Message) => void;
    createThread: (p: Participants) => void;
    addUserToThread: (t: ThreadID, u: UserID) => void;
    removeUserFromThread: (t: ThreadID, u: UserID) => void;
};

export type Events = {
    receiveddMessage: (t: ThreadID, u: UserID, m: Message) => void;
    createdThread: (t: ThreadID, ps: Participants) => void;
    addedUserToThread: (t: ThreadID, u: UserID) => void;
    removeUserFromThread: (t: ThreadID, u: UserID) => void;
};
