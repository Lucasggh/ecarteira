# Plano de Testes (Vitest) - eCarteira Backend

Este plano define a estratégia de testes automatizados para todas as rotas do backend do eCarteira. Utilizaremos o **Vitest** como framework de testes e o **Supertest** para realizar as chamadas HTTP nas rotas da API.

## 1. Escopo dos Testes
Os testes cobrirão:
- **Autenticação (`/api/auth`)**: Registro e Login de usuários.
- **Transações (`/api/transactions`)**: Consultas de saldo, extrato e operações (depósito, saque, transferência).

## 2. Configuração
As dependências `vitest` e `supertest` foram instaladas no diretório `backend`.
Para rodar os testes, basta acessar a pasta `backend` e executar o comando:
```bash
npx vitest
```

## 3. Cenários de Teste

### A. Rotas de Autenticação (`/api/auth`)
1. **`POST /api/auth/register`**
   - **Sucesso:** Criar um novo usuário com dados válidos (name, cpf, email, password, role).
   - **Falha:** Tentar criar com um CPF ou Email já existente (deve retornar erro).
   - **Falha:** Senha ou e-mail com formato inválido (validações do `verifyScript.js`).

2. **`POST /api/auth/login`**
   - **Sucesso:** Realizar login com credenciais válidas e receber o token JWT.
   - **Falha:** Login com senha incorreta.
   - **Falha:** Login com email inexistente.

### B. Rotas de Transações (`/api/transactions`)
> *Nota: Todas as requisições abaixo exigem que o cabeçalho `Authorization: Bearer <token>` seja passado, gerado previamente na etapa de login.*

1. **`POST /api/transactions/deposit`**
   - **Sucesso:** Enviar um valor válido. O sistema deve multiplicar por 100 e salvar os centavos, retornando HTTP 200.
   - **Falha:** Enviar um formato de valor inválido ou negativo.

2. **`POST /api/transactions/withdrawn`**
   - **Sucesso:** Solicitar um saque com valor inferior ou igual ao saldo atual.
   - **Falha:** Solicitar um saque com valor superior ao saldo atual (regra de validação recém-adicionada!).

3. **`POST /api/transactions/transfer`**
   - **Sucesso:** Transferir para o `receiver_id` de um usuário existente (tendo saldo suficiente).
   - **Falha:** Transferir um valor maior que o saldo em conta.

4. **`GET /api/transactions/balance`**
   - **Sucesso:** Deve retornar o saldo do usuário autenticado no formato em reais/dólares (centavos divididos por 100).

5. **`GET /api/transactions/`**
   - **Sucesso:** Retornar o array completo de transações vinculadas ao usuário (formatadas com o valor decimal correto).

## 4. Análise de Erros do Código (Checklist Realizado)
Durante a leitura de todos os arquivos `src` do backend, os seguintes erros lógicos foram identificados e **corrigidos**:

- **Falta de Validação no Saque**: O arquivo `transactionService.js` executava saques (`withdrawnService`) sem verificar se o usuário tinha saldo! (Risco grave de segurança que permitia saldo negativo). *Corrigido.*
- **Erros de Digitação**: Diversas rotas retornavam `status: "sucess"` e `message: "Succes..."`. *Corrigido.*
- **Mensagem Incorreta na Transferência**: O `transferController` copiava a mensagem do saque e retornava `Success withdrawn`. *Corrigido.*
- **Retorno Indevido de Centavos**: A rota de extrato (`transactionsService`) retornava centavos diretamente, enquanto as outras (como saldo) já retornavam convertido, quebrando o cálculo do frontend. *Corrigido.*
