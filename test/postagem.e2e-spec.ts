import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Testes do Módulo Postagem (e2e)', () => {
  let app: INestApplication<App>;
  let token: any;
  let temaId: any;
  let postagemId: any;

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

    const loginResposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({ usuario: 'root@root.com', senha: 'rootroot' });

    token = loginResposta.body.token;

    const temaResposta = await request(app.getHttpServer())
      .post('/temas')
      .set('Authorization', `${token}`)
      .send({ descricao: 'Tema Teste' });

    temaId = temaResposta.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve Cadastrar uma nova Postagem', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/postagens')
      .set('Authorization', `${token}`)
      .send({
        titulo: 'Postagem Teste',
        texto: 'Texto da postagem de teste',
        tema: { id: temaId },
        usuario: { id: 1 },
      })
      .expect(201);

    postagemId = resposta.body.id;
  });

  it('02 - Deve Listar todas as Postagens', () => {
    return request(app.getHttpServer())
      .get('/postagens')
      .set('Authorization', `${token}`)
      .expect(200);
  });

  it('03 - Deve Atualizar uma Postagem', async () => {
    const resposta = await request(app.getHttpServer())
      .put('/postagens')
      .set('Authorization', `${token}`)
      .send({
        id: postagemId,
        titulo: 'Postagem Atualizada',
        texto: 'Texto atualizado',
        tema: { id: temaId },
        usuario: { id: 1 },
      })
      .expect(200);

    expect(resposta.body.titulo).toBe('Postagem Atualizada');
  });

  it('04 - Deve Buscar Postagem por ID', () => {
    return request(app.getHttpServer())
      .get(`/postagens/${postagemId}`)
      .set('Authorization', `${token}`)
      .expect(200);
  });
});
