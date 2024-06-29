import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import { AuthController } from '../../src/api/auth/auth.controller';
import { AuthService } from '../../src/api/auth/auth.service';
import { AuthRegisterDto } from '../../src/api/auth/dto/auth-register.dto';
import { faker } from '@faker-js/faker';
import { AuthLoginDto } from '../../src/api/auth/dto/auth-login.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  const userMock: AuthRegisterDto = {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    address: 'address',
    phone: '1234567',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('register a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(userMock)
      .expect(200);
  });

  it('login a user', async () => {
    const loginData: AuthLoginDto = {
      email: userMock.email,
      password: userMock.password,
    };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(200);
  });

  it('get profile', async () => {
    const loginData: AuthLoginDto = {
      email: userMock.email,
      password: userMock.password,
    };
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(200);

    const {
      data: { accessToken },
    } = loginResponse.body;

    const profileResponse = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const {data:user} = profileResponse.body;

    expect(user.email).toBe(loginData.email);
  });

});
