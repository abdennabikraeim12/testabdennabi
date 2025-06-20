import { Controller, Post, Body, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
@ApiOperation({ summary: 'Register a new user' })
@ApiResponse({ status: 201, description: 'User registered successfully' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 409, description: 'Email already in use' })
@ApiResponse({ status: 500, description: 'Internal server error' })
async register(@Body() registerDto: RegisterDto) {
  try {
    return await this.authService.register(registerDto);
  } catch (error) {
    if (error instanceof ConflictException) {
      throw error; 
    }
    throw new InternalServerErrorException('Registration process failed');
  }
}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}