# Monopoly Manager

Sistema BackEnd para gerenciamento de partidas de jogos como monopoly com controle de jogadores, dinheiro, ranking ao vivo e tela de corrida para exibição em outro dispositivo.

## Funcionalidades

- Cadastro e login de usuários
- Cadastro, edição e exclusão de jogadores (clientes)
- Controle de dinheiro dos jogadores durante a partida
- Timer de partida com pausa e reset
- Modal de ganhadores ao final do tempo ou ao zerar
- Tela de corrida (ranking ao vivo) para exibição em outra tela/dispositivo
- Ranking dos 3 primeiros colocados ao final da partida

## Tecnologias

- Node.js + Express
- TypeScript
- MongoDB (Mongoose)
- EJS (templates)
- JWT (autenticação)

## Instalação

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/monopoly.git
   cd monopoly
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure o banco de dados e variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz com:
     ```
     PORT=5000
     JWT_SECRET=sua_chave_secreta
     ```

4. **Compile o projeto:**
   ```sh
   npm run build
   ```

5. **Inicie o servidor:**
   ```sh
   npm start
   ```
   Ou para desenvolvimento:
   ```sh
   npm run dev
   ```

6. **Acesse no navegador:**
   ```
   http://localhost:5000
   ```

## Uso

- Cadastre-se e faça login.
- Cadastre os jogadores (clientes) e seus valores iniciais.
- Clique em **Jogar** para iniciar uma partida.
- Use os botões para iniciar, pausar ou zerar o timer.
- Altere o dinheiro dos jogadores conforme o jogo.
- Para exibir o ranking ao vivo em outra tela, acesse `/customers/race` em outro dispositivo.
- O ranking será atualizado em tempo real e mostrará o modal de ganhadores ao final.

## Scripts

- `npm run build` — Compila o TypeScript para a pasta `dist`
- `npm start` — Inicia o servidor em produção (`dist/index.js`)
- `npm run dev` — Inicia o servidor em modo desenvolvimento com `ts-node`

## Estrutura de Pastas

```
src/
  config/
  controllers/
  middleware/
  models/
  routes/
  types/
  views/
```

> Projeto em desenvolvimento para gerenciar partidas de Jogos como monopoly e banco imobiliaria de forma prática e interativa