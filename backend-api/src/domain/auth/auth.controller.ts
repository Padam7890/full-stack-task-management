import {
  Body,
  Get,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { forgetPasswordDTO, resetPasswordDTO, signInDTO } from './dto/auth';
import { UniversalDecorator } from '../../common/decorators/universal.decorator';
import { RefreshAuthGuard } from '../../core/guards/refresh-auth.guard';
import { GoogleAuthGuard } from '../../core/guards/googleauth.guard';
import { LocalAuthGuard } from '../../core/guards/local-auth.guard';
import { createResponse } from '../../helper/response.helper';



// Controller For Authentication Module
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //signin http method 
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @UniversalDecorator({
    summary: 'Sign in Form',
    responseType: signInDTO,
    body: {
      email: {
        type: 'string',
        example: 'padamthapa@gmail.com',
      },
      password: {
        type: 'string',
        example: 'padam786',
      },
    },
  })

  async signin(@Req() req) {
    return this.authService.login(req.user);
  }



  //signup http method 
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @UniversalDecorator({
    summary: 'Register New User',
    responseType: CreateUserDto,
  })
  async signUp(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.signUp(user);
  }

  @UniversalDecorator({
    summary: 'Register New User',
    responseType: CreateUserDto,
    includeBearerAuth: true,
  })
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() request) {
    return this.authService.createRefreshToken(request.user.id);
  }


  //google login http method 
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    

  }


  //google callback http method 
  @ApiExcludeEndpoint()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req , @Res() res) {
    console.log(req.user)
    const response = await this.authService.login(req.user);
    console.log(response)
    res.redirect(`http://localhost:5173?accesstoken=${response.refresh_token}?refreshtoken= ${response.refresh_token}`)
  }


  //forget password http method 
  @Post("forget-password")
  @UniversalDecorator({
    summary: 'Forget Password',
    responseType: forgetPasswordDTO,
  })
  async forgetPassword(@Body() forgetPasswordDTO: forgetPasswordDTO){
  const response = await this.authService.forgetPassword(forgetPasswordDTO.email)
  return createResponse(HttpStatus.OK, response.message)
  }


  //reset password http method 
  @Post("reset-password")
  @UniversalDecorator({
    summary: 'Reset Password',
    responseType: resetPasswordDTO,
  })
  async resetPassword(@Body() resetPasswordDTO: resetPasswordDTO){
    const response = await this.authService.resetPassword(resetPasswordDTO)
    return createResponse(HttpStatus.OK, "Password reset successfully", response)
  }
}
