import { User } from './api/auth';

declare module 'http' {
    interface IncomingMessage {
        user: User | null;
    }
}
