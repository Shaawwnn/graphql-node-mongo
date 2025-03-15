import { UserRole } from './UserRole';

export type AuthUser = { uid: string; email: string; role: UserRole } | null;
