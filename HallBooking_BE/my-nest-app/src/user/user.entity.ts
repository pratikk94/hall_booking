   // src/users/user.entity.ts
   import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

   @Entity()
   export class User {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     email: string;

     @Column()
     password: string;

     @Column()
     role: string;
   }