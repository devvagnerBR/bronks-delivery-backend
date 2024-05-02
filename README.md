# API Bronks Delivery

A API Bronks Delivery é responsável por gerenciar os dados e funcionalidades relacionadas aos pedidos de marmitas online na plataforma Bronks Delivery.

## Funcionalidades

- **Registro de Empresa**: Permite que uma nova empresa seja registrada.
- **Autenticação de Empresa**: Permite a autenticação de uma empresa.
- **Adição de Novo Produto**: Permite que a empresa adicione um novo produto.
- **Listagem de Produtos**: Permite que a empresa liste todos os produtos disponíveis.
- **Obtenção de Produto por ID**: Permite que a empresa obtenha informações de um produto específico através da rota.

- **Listagem de Empresas**: Pe

## Endpoints

- **`POST /company/create`**: Rota para registro de uma nova empresa.
- **`POST /company/authenticate`**: Rota para autenticação da empresa.

- **`POST /company/product/new`**: Rota para adicionar um novo produto à empresa.
- **`GET /company/product/list`**: Rota para listar todos os produtos da empresa.
- **`GET /company/product/:productId`**: Rota para obter um produto específico da empresa.

- **`GET /company/list`**: Rota para listar todas as empresas.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução do código JavaScript.
- **TypeScript**: Adiciona tipagem estática ao projeto, garantindo maior robustez e segurança no desenvolvimento.
- **Fastify**: Framework web para Node.js, utilizado para criar APIs de alta performance.
- **bcryptjs**: Biblioteca para hash de senhas, garantindo a segurança das informações de usuários.
- **JWT**: JSON Web Tokens utilizados para autenticação e autorização dos usuários na API.
- **Zod**: Utilizado para validação de dados e schemas, garantindo consistência nos dados da API.

- **Projeto Frontend utilizando a API** [Repositório do projeto](https://github.com/devvagnerBR/bronks-delivery-backend).
