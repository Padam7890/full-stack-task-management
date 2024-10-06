import {Module, } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "../common/service/mail/mail.module";
import { TaskModule } from './task/task.module';

@Module({
  imports: [UserModule, AuthModule, MailModule, TaskModule,],
  controllers: [],
  providers: [],
})

export class DomainModule{}