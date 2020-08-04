import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index([ 'username', 'host' ], { unique: true })
export class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({
		type: 'varchar'
	})
	public username: string;

	@Column({
		type: 'varchar'
	})
	public host: string;

	@Column({
		type: 'varchar'
	})
	public token: string;

	@Column({
		type: 'integer',
		default: 0,
	})
	public prevNotesCount: number;

	@Column({
		type: 'integer',
		default: 0,
	})
	public prevFollowingCount: number;

	@Column({
		type: 'integer',
		default: 0,
	})
	public prevFollowersCount: number;
}