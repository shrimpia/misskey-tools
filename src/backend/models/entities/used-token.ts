import { Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
@Index([ 'token' ], { unique: true })
export class UsedToken {
	@PrimaryColumn({
		type: 'varchar'
	})
	public token: string;
}