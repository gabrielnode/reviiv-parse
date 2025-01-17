# **Reviiv Backend**

## **Descrição**

Este projeto é uma solução backend para gerenciar jogos e suas informações. Ele utiliza uma arquitetura modular com práticas recomendadas para escalabilidade e organização do código.

A solução inclui:

- Um controlador HTTP para manipulação de dados de jogos.
- Um parser de logs para interpretar dados de jogos.
- Um repositório em memória para gerenciar o estado dos jogos.
- Fábricas para injeção de dependências e criação de objetos.

---

## **Configuração do Ambiente**

### **Pré-requisitos**

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### **Passos para Configuração**

1. **Clone o Repositório**:

   ```bash
   git clone https://github.com/seu-usuario/reviiv-backend.git
   cd reviiv-backend
   ```

2. **Instale as Dependências**:

   ```bash
   npm install
   ```

3. **Execute a Aplicação**:

   ```bash
   npm start
   ```

4. **Execute os Testes**:
   Para garantir que tudo está funcionando corretamente:
   ```bash
   npm test
   ```

---

## **Estrutura do Projeto**

Abaixo está uma visão geral da estrutura de pastas do projeto:

```
src/
├── modules/
│   ├── games/
│   │   ├── application/
│   │   │   └── usecase/        # Casos de uso, como GetGameById
│   │   ├── controllers/        # Controladores HTTP (ex.: GameHttpController)
│   │   ├── domain/
│   │   │   ├── models/         # Modelos de domínio (ex.: Game)
│   │   │   └── ports/          # Interfaces para repositórios
│   │   ├── factories/          # Fábricas para injeção de dependências
│   │   ├── infrastructure/
│   │   │   ├── files-reader/   # Parser de logs
│   │   │   └── persistences/   # Repositórios (ex.: InMemoryGameRepository)
tests/                          # Testes unitários e integração
```

---

## **Componentes Principais**

### **1. GameHttpController**

O controlador HTTP responsável por expor endpoints para manipulação de dados de jogos.

- **Exemplo de Método**: `GetGameById`
  - Entrada: `req.params.id`
  - Saída: Detalhes do jogo em JSON ou erro.
  - Código relevante: [`src/modules/games/controllers/games-http.controller.ts`](src/modules/games/controllers/games-http.controller.ts)

### **2. LogParser**

Um parser de logs que lê arquivos de log de jogos e converte em objetos utilizáveis.

- **Responsabilidades**:

  - Interpretar linhas de log.
  - Criar instâncias de jogos a partir dos logs.

- Código relevante: [`src/modules/games/infrastructure/files-reader/log-parser.ts`](src/modules/games/infrastructure/files-reader/log-parser.ts)

### **3. InMemoryGameRepository**

Repositório em memória para armazenar e acessar dados de jogos.

- **Exemplo de Método**: `findGameById(id: number)`

  - Retorna os detalhes de um jogo baseado em seu ID.

- Código relevante: [`src/modules/games/infrastructure/persistences/in-memory-game-repository.ts`](src/modules/games/infrastructure/persistences/in-memory-game-repository.ts)

---

## **Como Funciona a Solução**

1. **Processamento de Logs**:

   - O `LogParser` lê e interpreta um arquivo de log especificado.
   - Ele cria objetos de jogo que são armazenados no `InMemoryGameRepository`.

2. **Exposição de Dados via HTTP**:

   - O `GameHttpController` oferece endpoints para consultar dados de jogos.
   - Exemplo de endpoint: `GET /games/:id`

3. **Injeção de Dependências**:
   - Fábricas, como `makeGameParserUseCase`, facilitam a criação de instâncias de casos de uso com dependências pré-configuradas.

---

## **Como Contribuir**

1. Faça um fork do projeto.
2. Crie um branch para suas alterações:
   ```bash
   git checkout -b feature/minha-feature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m "feat: descrição da sua feature"
   ```
4. Envie para o branch principal:
   ```bash
   git push origin feature/minha-feature
   ```
5. Abra um pull request no GitHub.

---

## **Contato**

Se tiver dúvidas ou sugestões, entre em contato:

- **Email**: gabriiel.lima.br@gmail.com
- **GitHub**: [gabrielnode](https://github.com/gabrielnode)

---

Se precisar de mais ajustes ou quiser detalhar algum aspecto, é só avisar! 🚀
