import {
    Column,
    Model,
    PrimaryKey,
    Table,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
import { User } from 'src/user/entity/user.entity';
  
  @Table({
    tableName: 'Address',
    timestamps: true,
    paranoid: true,
  })
  export class Address extends Model<Address> {
   
      @PrimaryKey
      @AutoIncrement
      @Column
      id: number
  
      @Column
      address : string
  
      @ForeignKey(()=>User)
      @Column
      userID : number

     @BelongsTo(()=>User , 'userID')
     user : User

  }
  
  