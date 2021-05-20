import {
  Column,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  BelongsTo,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { Address } from 'src/address/entity/address.entity';

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

    @HasMany(()=>Address)
    address : Address[]


}


export interface IUser {
    id? : number
    username : string
    password : string
    name : string
}