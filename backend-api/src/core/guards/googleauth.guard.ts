
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

//Google Authentication Guard
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}