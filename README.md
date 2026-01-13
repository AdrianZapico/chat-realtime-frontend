# 💬 Chat Realtime - Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

Interface moderna e responsiva para uma aplicação de chat em tempo real, desenvolvida com React e TypeScript. Este projeto se conecta a um backend Node.js/Socket.io para permitir comunicação instantânea entre usuários em diferentes salas.

🔗 **Demo Online:** [Acesse o Chat aqui](https://SEU-LINK-NO-NETLIFY.app)

## 🚀 Funcionalidades

- **Autenticação:** Login e Cadastro de usuários (JWT).
- **Tempo Real:** Envio e recebimento de mensagens instantâneas via Socket.io.
- **Salas de Bate-papo:** Navegação entre diferentes salas/canais.
- **Feedback Visual:** Indicador de "Usuário digitando..." e notificações.
- **Responsividade:** Layout adaptável para Mobile e Desktop usando Tailwind CSS.
- **TypeScript:** Código tipado para maior segurança e escalabilidade.

## 🛠️ Tecnologias Utilizadas

- **React:** Biblioteca principal para construção da UI.
- **Vite:** Build tool ultrarrápida.
- **TypeScript:** Superset JavaScript para tipagem estática.
- **Tailwind CSS + DaisyUI:** Estilização rápida e componentes prontos.
- **Socket.io-client:** Cliente para comunicação WebSocket.
- **Zustand:** Gerenciamento de estado global (se tiver usado, senão pode remover).
- **React Router Dom:** Gerenciamento de rotas.

## 📦 Como rodar localmente

Siga os passos abaixo para rodar o frontend na sua máquina:

### 1. Pré-requisitos
Certifique-se de que o **Backend** esteja rodando (localmente ou na nuvem).

### 2. Clonar o repositório
```bash
git clone [https://github.com/AdrianZapico/chat-realtime-frontend.git](https://github.com/AdrianZapico/chat-realtime-frontend.git)
cd chat-realtime-frontend
3. Instalar dependências
Bash

npm install
4. Configurar Variáveis de Ambiente
O projeto utiliza um arquivo de configuração para conectar com o backend. Verifique o arquivo src/services/api.ts e src/services/socket.ts ou crie um arquivo .env na raiz:

Snippet de código

VITE_API_URL=http://localhost:5000/api
5. Rodar o projeto
Bash

npm run dev
O projeto estará disponível em http://localhost:5173.

🌐 Deploy
O frontend foi implantado no Netlify e configurado para redirecionar chamadas de API (/api/*) para o backend hospedado no Render, evitando problemas de CORS e mantendo a segurança.

🤝 Autor
Desenvolvido por Adrian Zapico.

Este projeto foi desenvolvido para fins de estudo sobre WebSockets e arquitetura Full Stack.


---

### O que você precisa ajustar nesse texto:
1.  **Link da Demo:** Onde está `[Acesse o Chat aqui](...)`, coloque o link real do seu Netlify.
2.  **Zustand:** Eu deixei ali nas tecnologias, mas se você usou apenas `Context API` (que vi no seu código `useAuth`), pode apagar a linha do Zustand.
3.  **Autor:** Confirme se o link do seu GitHub está certo ali no final.

Ficou legal? Isso dá uma cara muito mais profissional para quem visita seu GitHub.

Link do Netlify: https://chat-real-time-on.netlify.app/