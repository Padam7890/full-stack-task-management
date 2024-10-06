import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


//Jwt Authentication Guard
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){

}