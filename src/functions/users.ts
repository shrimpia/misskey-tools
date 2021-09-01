import { User } from '../models/entities/user';
import { Users } from '../models';
import { DeepPartial } from 'typeorm';
import { genToken } from './gen-token';
import pick from 'object.pick';

export const getUser = (username: string, host: string): Promise<User | undefined> => {
	return Users.findOne({ username, host });
};

export const updateUsersMisshaiToken = async (user: User | User['id']): Promise<string> => {
	const u = typeof user === 'number' 
		? user
		: user.id;
	
	const misshaiToken = await genToken();
	Users.update(u, { misshaiToken });
	return misshaiToken;	
};

export const getUserByMisshaiToken = (token: string): Promise<User | undefined> => {
	return Users.findOne({ misshaiToken: token });
};

export const upsertUser = async (username: string, host: string, token: string): Promise<void> => {
	const u = await getUser(username, host);
	if (u) {
		await Users.update(u.id, { token });
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