const chai = require('chai');
const expect = chai.expect;

describe('Register', ()=> {
    it('deve criar registro de usuário', (done)=> {
        const resultado =  await require(app)
        .post('/user/register')
        .send({
            nome: 'Raissa Macedo Pereira',
            email: 'raissamacedo7@gmail.com',
            senha: '123456',
            telefones: [
                {
                    numero: '988181212',
                    ddd: '11'
                }
            ]
        });
        expect(resultado.status).toBe(200)
        done();
    });
});

describe('Authentication', () => {
    it('É necessário criar autenticação', async (done) => {
      const response = await request(app).post('/authenticate').send({
        email: 'raissamacedo7@gmail.com',
        senha: '123456'
      });
  
      expect(resultado.status).toBe(200);
      done();
    });
  });
  
  describe('Auth', () => {
    it('should list user by id', async (done) => {
      const resultado = await request(app)
        .get('/auth/f901e3b3b6807bdd7128d269719b614c')
        .send();
  
      expect(resultado.status).toBe(401);
      done();
    });
  });