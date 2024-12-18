# API Node.js com JWT e Prisma

Este projeto é a API do sistema de cadastro, login e listagem de usuários. Foi desenvolvido usando Node.js, Express, Prisma ORM e JWT para autenticação. O foco deste projeto é aprimorar habilidades no desenvolvimento backend, criando endpoints seguros e integrando com um banco de dados.

## Funcionalidades

### Cadastro de Usuários
- Recebe dados de registro via POST e armazena no banco de dados.
- As senhas são criptografadas utilizando bcrypt antes de salvar.

### Autenticação de Login
- Valida as credenciais fornecidas.
- Caso as credenciais estejam corretas, gera um token JWT e o retorna ao usuário.

### Listagem de Usuários
- Acessível apenas para usuários autenticados.
- Requer um token JWT válido enviado no cabeçalho `Authorization`.

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução para JavaScript.
- **Express**: Framework para criação de servidores HTTP.
- **Prisma ORM**: Gerenciamento e integração com banco de dados.
- **bcrypt**: Criptografia de senhas.
- **jsonwebtoken (JWT)**: Autenticação segura por tokens.
- **CORS**: Permite requisições entre domínios.

## Scripts Disponíveis

### `npm install`
Instala as dependências necessárias do projeto.

### `npm start`
Inicia o servidor backend localmente. Por padrão, o servidor estará disponível em:
[http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto
```plaintext
api-node-jwt/
│   ├── prisma/ 
│   │   ├── schema.prisma       # Schema do banco de dados Prisma
│   │   ├── migrations/         # Migrações do banco de dados
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js  # Lógica de cadastro e login
│   │   │   ├── userController.js  # Lógica da listagem de usuários
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js  # Validação do token JWT
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Rotas de autenticação
│   │   │   ├── userRoutes.js      # Rotas de listagem
│   │   ├── utils/
│   │   │   ├── token.js           # Funções de criação/validação do token
│   │   ├── app.js                 # Configuração do servidor Express
│   │   ├── index.js               # Entrada principal da aplicação
│   ├── package.json
│   ├── .env                       # Variáveis de ambiente
│   └── .gitignore                 # Arquivos ignorados pelo Git
```
## Endpoints da API

### 1. Cadastro de Usuário
- **Rota**: `POST /api/register`
- **Descrição**: Registra um novo usuário no banco de dados.
- **Exemplo de Requisição**:
  ```json
  {
    "name": "Arthur Luiz",
    "email": "arthur@example.com",
    "password": "123456"
  }
    ```

## Resposta:
```json
{
  "message": "Usuário cadastrado com sucesso!"
}
```
### 2. Login
- **Rota**: POST /api/login
- **Descrição**: Autentica o usuário e retorna um token JWT.
- **Exemplo de Requisição**:
```json
{
  "email": "arthur@example.com",
  "password": "123456"
}
```
## Resposta:
```json
{
  "token": "JWT_TOKEN",
  "message": "Login realizado com sucesso!"
}
```
### 3. Listagem de Usuários
- **Rota**: `GET /api/users`
- **Descrição**: Retorna uma lista de usuários cadastrados.
- **Requer**: Cabeçalho com `Authorization: Bearer JWT_TOKEN`.

#### Exemplo de Resposta:
```json
[
  {
    "id": 1,
    "name": "Arthur Luiz",
    "email": "arthur@example.com"
  },
  {
    "id": 2,
    "name": "João Silva",
    "email": "joao@example.com"
  }
]
```
## Configuração do Ambiente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/ArthurLuiz/api-node-jwt.git
    ```
2. **Instale as dependências**:

```bash
npm install
```
3. **Configure as variáveis de ambiente: Crie um arquivo .env na raiz do projeto**:

```plaintext
DATABASE_URL="URL_DO_BANCO_DE_DADOS"
JWT_SECRET="CHAVE_SECRETA_JWT"
PORT=3000
```
4. **Rode as migrações do Prisma**:

```bash
npx prisma migrate dev
```
5. **Inicie o servidor**:
```bash
npm start
```
## Banco de Dados

A API utiliza **Prisma** como ORM para gerenciamento do banco de dados. O modelo atual possui uma tabela `User` com os seguintes campos:

```prisma
model User {
  id       Int      @id @default(autoincrement())
  name     String
  email    String   @unique
  password String
  createdAt DateTime @default(now())
}
```
## Exemplo de Conexão com o Banco

Configure a variável `DATABASE_URL` no arquivo `.env` para a URL de conexão com o banco de dados (SQLite, PostgreSQL, etc.).

## Segurança

### Criptografia de Senha

As senhas dos usuários são armazenadas de forma segura usando **bcrypt**.

### Autenticação JWT

Após o login bem-sucedido, um **token JWT** é gerado e enviado ao cliente. Esse token é utilizado para acessar rotas protegidas, garantindo segurança e autenticidade.

## Próximos Passos

- Adicionar testes unitários.
- Implementar a atualização e exclusão de usuários.
- Melhorar os logs de erro e mensagens de retorno.

## Conclusão

Este projeto foi criado para desenvolver habilidades práticas no backend, utilizando tecnologias modernas como **Node.js**, **Express**, **Prisma** e **JWT**. Com isso, é possível criar sistemas seguros e escaláveis de autenticação e gerenciamento de usuários.

## Contato

Criado por **Arthur Luiz da Silva**. Caso tenha dúvidas ou sugestões, sinta-se à vontade para entrar em contato! 🚀
