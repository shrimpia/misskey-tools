import { User } from '../models/entities/user';
import { Users } from '../models';
import { DeepPartial } from 'typeorm';

export const getUser = (username: string, host: string): Promise<User | undefined> => {
	return Users.findOne({ username, host });
};

export const upsertUser = async (username: string, host: string, token: string): Promise<void> => {
	const u = await getUser(username, host);
	if (u) {
		await Users.update({ username, host }, { token });
	} else {
		await Users.insert({ username, host, token });
	}
};

export const updateUser = async (username: string, host: string, record: DeepPartial<User>): Promise<void> => {
	await Users.update({ username, host }, record);
};

export const deleteUser = async (username: string, host: string): Promise<void> => {
	await Users.delete({ username, host });
};

export const getUserCount = (): Promise<number> => {
	return Users.count();
};
