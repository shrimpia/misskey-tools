import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IAnnouncement } from '../../../common/types/announcement';

@Entity()
export class Announcement implements IAnnouncement {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({
		type: 'timestamp without time zone',
	})
	public createdAt: Date;

	@Column({
		type: 'varchar',
		length: 128,
	})
	public title: string;

	@Column({
		type: 'varchar',
		length: 8192,
	})
	public body: string;

	@Column({
		type: 'integer',
		default: 0,
	})
	public like: number;
}
