import {
  Column,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'Users',
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
 
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    username : string

    @Column
    password : string

    @Column
    name : string
}


export interface IUser {
    id? : number
    username : string
    password : string
    name : string
}