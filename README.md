<div align="center">
  <h1>Travel Broker</h1>
  <p><strong>Correção e monitoramento de saídas automáticas de ônibus com inconsistências de horário</strong></p>

  ![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=for-the-badge&logo=typescript)
  ![Vite](https://img.shields.io/badge/Vite-7.2.2-646cff?style=for-the-badge&logo=vite)
  ![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%26%20Auth-orange?style=for-the-badge&logo=firebase)
  ![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)
</div>

---

## Resumo

Travel Broker é uma aplicação web para identificar e corrigir datas/horários incorretos gerados automaticamente por veículos (ônibus) devido a inconsistências no sistema embarcado. A ferramenta valida saídas informadas, consulta a API de transporte, aplica correções quando cabível e atualiza métricas em Firestore para monitoramento e relatórios.

Principais funcionalidades:
- Upload e validação de planilhas Excel com viagens.
- Consulta à API TACOM para obter saídas atuais.
- Geração automática de horários válidos quando a saída manual é inconsistente.
- Aplicação de correções via endpoint de atualização.
- Monitoramento de linhas (contadores) e bloqueio de linhas proibidas.
- Dashboard com gráficos mensais e por linha.
- Autenticação via Firebase.

---

## Principais conceitos

- Broker: componente responsável por validar e aplicar correções de saída.
- MCO: calendário de processamento que pode bloquear correções já processadas.
- MONITORED_LINES: coleções que armazenam linhas sendo monitoradas e seus contadores.
- PROHIBILE_ROWS: linhas que não devem ser corrigidas automaticamente.
- CHART: coleção com métricas mensais agregadas.

---

## Tecnologias

- React, TypeScript, Vite
- Firebase (Auth + Firestore)
- Axios para chamadas HTTP
- read-excel-file para leitura de planilhas
- Tailwind CSS para UI
- Chart.js (react-chartjs-2) para gráficos
- date-fns para manipulação de datas
- react-toastify para notificações

---

## Instalação rápida

1. Clone o repositório e instale dependências:
   npm install

2. Crie um arquivo de ambiente (.env) com as variáveis listadas abaixo (apenas os nomes; não insira valores sensíveis no repositório).

3. Inicie em modo desenvolvimento:
   npm run dev

---

## Variáveis de ambiente (apenas nomes)

Defina no seu .env (ou no painel de deploy) as variáveis abaixo:

- VITE_API_TRAVEL
- VITE_API_SETTRAVEL
- VITE_TRAVEL_PING_NUMBER
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID

(Não adicione valores sensíveis no repositório público.)

---

## Scripts úteis

- npm run dev — servidor de desenvolvimento
- npm run build — build para produção
- npm run preview — preview do build
- npm run lint — lint do projeto

---

## Estrutura principal do projeto

- src/
  - components/ — componentes reutilizáveis (charts, container, header, inputs, layout)
  - contexts/MainContext.tsx — contexto global (token, ping da API, charts, linhas)
  - pages/
    - broker/ — upload, validação e aplicação de correções
    - home/ — dashboard com gráficos
    - login/ — autenticação
    - mcocalendary/ — calendário MCO
    - prohibitedlines/ — gerenciamento de linhas bloqueadas
    - linesmonitor/ — monitoramento e contadores
  - routes/privateRoutes.tsx — proteção de rotas
  - services/
    - api/ — instância axios e wrappers
    - firebase/ — conexão Auth e Firestore
  - main.tsx, router.tsx, index.css

---

## Fluxo de correção (Broker) — visão resumida

1. Usuário faz upload de planilha (.xlsx / .xls).
2. App lê a planilha e formata linhas (data, código da viagem, linha, horário desejado).
3. Para cada viagem:
   - Consulta a API (VITE_API_TRAVEL) para obter dados atuais.
   - Verifica se a saída manual existe e se a linha está proibida.
   - Compara horário desejado vs saída manual; se inválido, gera horário alternativo (adiciona 10s ou lógica definida).
   - Verifica se a viagem já foi processada (MCO).
4. Se validada, envia atualização para a API de aplicação (VITE_API_SETTRAVEL).
5. Atualiza Firestore: incrementa contadores em MONITORED_LINES e atualiza CHART (métricas mensais).
6. Exibe resultados em tabelas (avaliação, antes/depois).

Observações de implementação:
- Requisições paralelas são feitas com Promise.all para validação.
- Erros de API são sinalizados para o usuário com toast.
- Estados críticos são persistidos em localStorage para recuperação de sessão.

---

## Autenticação e segurança

- Firebase Authentication protege o acesso; rotas são guardadas pelo componente Private.
- O MainContext armazena o token JWT obtido do usuário e faz ping periódico à API para verificar disponibilidade.
- Não logue credenciais sensíveis no console em produção.

---

## Firestore — coleções principais

- CHART — métricas agregadas por mês (amount, datetext, datedb).
- MONITORED_LINES — linhas com contadores e metadados (rowCode, rowLine, amount).
- PROHIBILE_ROWS — linhas bloqueadas para correção.
- MCO/MM-yyyy/dd-MM/info — registros de processamento diário (processed, dateClosed, hourSeach, totals).

---

## Boas práticas e limites

- Para evitar timeout/instabilidade na API, trate lotes de correção (ex.: 20 viagens por vez).
- Use retry/backoff para chamadas críticas.
- Garanta que as colunas da planilha sigam o formato esperado (índice, linha, código, horário original, horário corrigido).
- Teste com usuários de staging antes de operações em produção.

---

## Troubleshooting rápido

- API off: verifique VITE_API_TRAVEL, faça ping manual via curl/httpie.
- Erro na planilha: valide extensão (.xlsx/.xls) e formato de colunas.
- Viagens marcadas como "PROCESSADA": verifique calendário MCO e timestamps.
- Porta 5173 ocupada (dev): trocar porta com npm run dev -- --port 3000.

---

## Licença

Projeto privado 

---

