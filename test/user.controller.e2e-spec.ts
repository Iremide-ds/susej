import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { UsersModule } from '../src/user/user.module';

describe('Users controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('getAllUsers', () => {
    it('should return an array of users or an empty array if no users are existing', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      const data = response.body.data;

      expect(data).toBeInstanceOf(Array);
      if (data.length > 1) {
        expect(data[0]).toHaveProperty('id');
        expect(data[0]).toHaveProperty('firstName');
        expect(data[0]).toHaveProperty('lastName');
        expect(data[0]).toHaveProperty('email');
        expect(data[0]).toHaveProperty('password');
      }
    });
  });

  describe('getAUser', () => {
    it('should return one user or a message if id is not existing', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/4')
        .expect(200);

      const data = response.body.data;

      if (response.body.message === 'success') {
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('firstName');
        expect(data).toHaveProperty('lastName');
        expect(data).toHaveProperty('email');
        expect(data).toHaveProperty('password');
      } else {
        expect(typeof response.body.message).toBe('string');
      }
    });
  });

  describe('createUser', () => {
    it('should return a string indicating success or explaining reason for failure', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({
          id: '70',
          firstName: 'tester',
          lastName: 'one',
          email: 'iremideadeboye11@gmail.com',
          password: '1234567',
        })
        .expect(201);

      expect(typeof response.body.message).toBe('string');
      // expect(response.text).toMatch(/success/);
    });
  });

  describe('updateUser', () => {
    it('should return a string indicating success or explaining reason for failure', async () => {
      const response = await request(app.getHttpServer())
        .put('/users/4')
        .send({
          id: '70',
          firstName: 'tester',
          lastName: 'three',
          email: 'iremideadeboye11@gmail.com',
          password: '1234567',
        })
        .expect(200);

      expect(typeof response.body.message).toBe('string');
      // expect(response.text).toMatch(/success/);
    });
  });

  describe('deleteUser', () => {
    it('should return a string indicating success or explaining reason for failure', async () => {
      const response = await request(app.getHttpServer())
        .delete('/users/70')
        .expect(200);

      expect(typeof response.body.message).toBe('string');
      // expect(response.text).toMatch(/success/);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
