import { PermissionLevel } from '@/interfaces/Config';

export default interface Permission {
	user: string;
	level: PermissionLevel;
}
