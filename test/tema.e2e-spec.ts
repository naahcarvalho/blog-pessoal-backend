import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Testes do Módulo Tema (e2e)', () => {
  let token: any;
  let temaId: any;
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    await request(app.getHttpServer()).post('/usuarios/cadastrar').send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-',
    });

    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot',
      });

    token = resposta.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve Cadastrar um novo Tema', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/temas')
      .set('Authorization', `${token}`)
      .send({
        descricao: 'Tema Teste',
      })
      .expect(201);

    temaId = resposta.body.id;
  });

  it('02 - Deve Listar todos os Temas', async () => {
    return request(app.getHttpServer())
      .get('/temas')
      .set('Authorization', `${token}`)
      .expect(200);
  });

  it('03 - Deve Atualizar um Tema', async () => {
    return request(app.getHttpServer())
      .put('/temas')
      .set('Authorization', `${token}`)
      .send({
        id: temaId,
        descricao: 'Tema Teste Atualizado',
      })
      .expect(200)
      .then((resposta) => {
        expect('Tema Teste Atualizado').toEqual(resposta.body.descricao);
      });
  });

  it('04 - Deve Buscar Tema por ID', async () => {
    return request(app.getHttpServer())
      .get(`/temas/${temaId}`)
      .set('Authorization', `${token}`)
      .expect(200);
  });
});
