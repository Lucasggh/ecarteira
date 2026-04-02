# eCarteira (Digital Wallet)

Este é o repositório do projeto **eCarteira**, uma aplicação de carteira digital full-stack. O projeto permite aos usuários gerenciar suas finanças através de um dashboard intuitivo, visualizando saldo total, múltiplas contas de usuário e possuindo um histórico de transações com uma tabela ordenável.

O projeto é dividido em duas partes principais:
- **Frontend**: Desenvolvido em React com Vite e estilizado com Tailwind CSS.
- **Backend**: Uma API RESTful desenvolvida em Node.js com Express e banco de dados PostgreSQL.

---

## 🚀 Pré-requisitos

Para rodar este projeto na sua máquina, você vai precisar ter instalado:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (Versão 18 ou superior recomendada)
- [PostgreSQL](https://www.postgresql.org/)

---

## 🛠️ Passo a passo para rodar localmente

### 1. Clonando o Repositório

Abra o seu terminal e rode o comando abaixo para clonar o projeto:
```bash
git clone https://github.com/lucasggh/ecarteira.git
cd ecarteira
```

---

### 2. Configurando o Banco de Dados (PostgreSQL)

> **Aviso Importante:** O projeto original utilizava um banco de dados fechado hospedado no **Supabase**. Para rodar localmente, você deverá criar o seu próprio banco de dados em **PostgreSQL** e certificar-se de configurar a conexão no arquivo `src/database/db.js` no backend (ou utilizar as variáveis de ambiente corretas).

1. Abra o console do seu PostgreSQL (`psql`) ou alguma interface gráfica como o pgAdmin.
2. Crie um banco de dados vazio chamado `ecarteira` executando o seguinte comando SQL:
   ```sql
   CREATE DATABASE ecarteira;
   ```
> **Nota:** Não se preocupe em criar as tabelas manualmente agora, nós temos um script no backend que fará isso automaticamente para você no próximo passo.

---

### 3. Configurando e Iniciando o Backend

1. No terminal, entre na pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências da API:
   ```bash
   npm install
   ```
3. Na raiz da pasta `backend`, crie um arquivo chamado `.env` e configure as seguintes variáveis referentes ao seu banco de dados local:
   ```env
   PG_USER=postgres
   PG_PASSWORD=sua_senha_do_postgres_aqui
   SERVER_PORT=3067
   ```
4. Com as variáveis configuradas, rode o script para criar a estrutura e as tabelas básicas do banco de dados automaticamente:
   ```bash
   node --env-file=.env src/database/setup-tables.js
   ```
5. Por fim, inicie o servidor:
   ```bash
   npm run dev
   ```
   *A API estará rodando, pronta para receber requisições (por padrão em `http://localhost:3067`). Acompanhe os logs de inicialização no terminal.*

---

### 4. Configurando e Iniciando o Frontend

1. Abra um **novo terminal** (deixe a aba do backend rodando) e vá para a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências da interface:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento do Vite:
   ```bash
   npm run dev
   ```
4. O terminal exibirá um link local (por padrão `http://localhost:5173`). Abra este link no seu navegador para acessar a eCarteira!

---

## 💻 Principais Tecnologias Utilizadas

**Frontend**:
- Vite + React
- Tailwind CSS (Estilização de interfaces)
- React Router (Navegação de rotas)
- React Hook Form (Gerenciamento de formulários)

**Backend**:
- Node.js + Express
- PostgreSQL (via `pg-pool`)
- Bcrypt (Criptografia de senhas)
- Dotenv (Gerenciamento de variáveis sensíveis)

<a href="/free-video/blue-purple-pink-gradient-background-motion-1_171556#fromView=search&page=1&position=25&uuid=e6cf3ef2-2183-4741-b3cb-c0b61b7978e8">Image by freepik</a>
