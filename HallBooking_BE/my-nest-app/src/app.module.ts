   // src/app.module.ts
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { ConfigModule } from '@nestjs/config';
   import { AuthModule } from './auth/auth.module';
   import { UserModule } from './user/user.module';
   import { SeederModule } from './seeder/seeder.module';

   @Module({
     imports: [
       ConfigModule.forRoot(),
       TypeOrmModule.forRoot({
         type: 'mssql',
         host: process.env.DB_HOST,
         port: parseInt(process.env.DB_PORT || '1433', 10),
         username: process.env.DB_USER,
         password: process.env.DB_PASS,
         database: process.env.DB_NAME,
         entities: [__dirname + '/**/*.entity{.ts,.js}'],
         synchronize: true,
         options: {
           encrypt: true,
           trustServerCertificate: true, // Add this line to trust the self-signed certificate
         },
       }),
       UserModule,
       AuthModule,
       SeederModule,
     ],
   })
   export class AppModule {}