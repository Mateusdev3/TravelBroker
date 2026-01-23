<div align="center">
  <h1>✈️ Travel Broker</h1>
  <p><strong>Sistema Inteligente de Correção e Monitoramento de Viagens</strong></p>
  
  ![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=for-the-badge&logo=typescript)
  ![Vite](https://img.shields.io/badge/Vite-7.2.2-646cff?style=for-the-badge&logo=vite)
  ![Firebase](https://img.shields.io/badge/Firebase-12.5.0-ffca28?style=for-the-badge&logo=firebase)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-06b6d4?style=for-the-badge&logo=tailwindcss)
  ![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)
  
  [Documentação](#-documentação) • [Instalação](#-instalação) • [Como Usar](#-como-usar) • [Estrutura](#-estrutura-do-projeto)
</div>

---

## 📋 Sobre o Projeto

**Travel Broker** é uma aplicação web moderna de gestão de viagens desenvolvida com as mais recentes tecnologias do ecossistema React. O sistema foi projetado para facilitar a correção automática de horários de viagens, monitoramento de linhas específicas e gerenciamento centralizado de dados através da integração com Firebase.

### 🎯 Objetivos Principais

- ✅ Validação automática de dados de viagens via planilhas Excel
- ✅ Correção inteligente de horários através de integração com API TACOM
- ✅ Monitoramento em tempo real de linhas de transporte
- ✅ Gerenciamento de linhas bloqueadas para correção
- ✅ Calendário MCO para controle de processamento
- ✅ Dashboard interativo com gráficos de desempenho
- ✅ Autenticação segura com Firebase

---

## 🚀 Tecnologias Utilizadas

### Frontend
| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **React** | 19.2.0 | Framework principal de UI |
| **TypeScript** | 5.9.3 | Tipagem estática e qualidade de código |
| **Vite** | 7.2.2 | Build tool ultra-rápido |
| **React Router DOM** | 7.9.5 | Roteamento entre páginas |
| **Tailwind CSS** | 4.1.17 | Estilização utilitária responsiva |
| **Chart.js** | 4.5.1 | Biblioteca de gráficos |
| **react-chartjs-2** | 5.3.1 | Integração Chart.js com React |

### Backend & Integrações
| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **Firebase** | 12.5.0 | Autenticação e Firestore |
| **Axios** | 1.13.2 | Client HTTP para requisições |
| **read-excel-file** | 6.0.1 | Parser de arquivos Excel |

### Utilitários
| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **date-fns** | 4.1.0 | Manipulação de datas |
| **react-icons** | 5.5.0 | Biblioteca de ícones |
| **react-toastify** | 11.0.5 | Notificações toast |

---

## 📦 Instalação

### Pré-requisitos
- **Node.js** 16.0.0 ou superior
- **npm** 8.0.0 ou **yarn** 1.22.0 ou superior
- Conta **Firebase** configurada
- Chave de API **TACOM** válida

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/travelbroker.git
cd travelbroker

# 2. Instale as dependências
npm install
# ou
yarn install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

### Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Configuration
VITE_API_TRAVEL="https://api-tacom.vercel.app/api/viagen?id="
VITE_API_SETTRAVEL="https://api-tacom.vercel.app/api/setviagen?id="
VITE_TRAVEL_PING_NUMBER="42623469"

# Firebase Configuration
VITE_FIREBASE_API_KEY="sua-chave-aqui"
VITE_FIREBASE_AUTH_DOMAIN="seu-projeto.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="seu-projeto-id"
VITE_FIREBASE_STORAGE_BUCKET="seu-projeto.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="seu-id"
VITE_FIREBASE_APP_ID="seu-app-id"
VITE_FIREBASE_MEASUREMENT_ID="seu-measurement-id"
```

---

## 🏃 Como Usar

### Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento (http://localhost:5173)
npm run dev

# Build otimizado para produção
npm run build

# Visualiza o build em ambiente local
npm run preview

# Verifica a qualidade do código com ESLint
npm run lint

# Corrige problemas automaticamente
npm run lint --fix
```

---

## 📁 Estrutura do Projeto

```
TravelBroker/
│
├── 📂 src/
│   ├── 📂 components/                 # Componentes reutilizáveis
│   │   ├── 📂 charts/                 # Componentes de gráficos
│   │   │   ├── ChartTotal.tsx
│   │   │   └── ChartLines.tsx
│   │   ├── 📂 container/              # Container wrapper
│   │   │   └── Container.tsx
│   │   ├── 📂 header/                 # Header e navegação
│   │   │   ├── Header.tsx
│   │   │   └── StatusAPI.tsx
│   │   ├── 📂 input/                  # Componentes de input
│   │   │   ├── InputText.tsx
│   │   │   ├── InputSelect.tsx
│   │   │   └── InputUpload.tsx
│   │   └── 📂 layout/                 # Layout principal
│   │       └── Layout.tsx
│   │
│   ├── 📂 contexts/                   # Context API
│   │   └── MainContext.tsx            # Estado global da aplicação
│   │
│   ├── 📂 pages/                      # Páginas da aplicação
│   │   ├── 📂 broker/                 # Página de correção de viagens
│   │   │   ├── Broker.tsx
│   │   │   ├── BrokerTable.tsx
│   │   │   └── UploadModal.tsx
│   │   ├── 📂 home/                   # Dashboard principal
│   │   │   └── Home.tsx
│   │   ├── 📂 login/                  # Página de autenticação
│   │   │   └── Login.tsx
│   │   ├── 📂 mcocalendary/           # Calendário MCO
│   │   │   └── MCOCalendar.tsx
│   │   ├── 📂 prohibitedlines/        # Gerenciar linhas bloqueadas
│   │   │   └── ProhibitedLines.tsx
│   │   ├── 📂 linesmonitor/           # Monitorar linhas
│   │   │   └── LinesMonitor.tsx
│   │   └── 📂 registrations/          # Cadastros gerais
│   │       └── Registrations.tsx
│   │
│   ├── 📂 routes/                     # Configuração de rotas
│   │   └── privateRoutes.tsx          # Rotas protegidas
│   │
│   ├── 📂 services/
│   │   ├── 📂 api/                    # Configuração Axios
│   │   │   └── axiosInstance.ts
│   │   └── 📂 firebase/               # Configuração Firebase
│   │       ├── firebaseConection.ts
│   │       ├── firebaseAuth.ts
│   │       └── firebaseDB.ts
│   │
│   ├── main.tsx                       # Entry point React
│   ├── router.tsx                     # Definição de rotas
│   └── index.css                      # Estilos globais
│
├── 📂 public/                         # Arquivos estáticos
│
├── 📄 package.json                    # Dependências e scripts
├── 📄 tsconfig.json                   # Configuração TypeScript
├── 📄 vite.config.ts                  # Configuração Vite
├── 📄 tailwind.config.js              # Configuração Tailwind
├── 📄 .env.example                    # Template de variáveis
├── 📄 vercel.json                     # Configuração Vercel
├── 📄 .gitignore                      # Arquivos ignorados pelo Git
└── 📄 README.md                       # Este arquivo
```

---

## 🔐 Autenticação & Segurança

### Firebase Authentication

O projeto utiliza **Firebase Authentication** para gerenciar acesso seguro:

```tsx
// src/services/firebase/firebaseAuth.ts
- signUp(email, password)      // Criar novo usuário
- signIn(email, password)      // Fazer login
- signOut()                    // Fazer logout
- onAuthStateChanged()         // Monitorar mudanças de autenticação
```

### Rotas Privadas

Todas as rotas exceto `/login` são protegidas pelo componente `Private`:

```tsx
// src/routes/privateRoutes.tsx
<Route element={<Private />}>
  <Route path="/home" element={<Home />} />
  <Route path="/broker" element={<Broker />} />
  // ... outras rotas privadas
</Route>
```

### Fluxo de Autenticação

```
┌─────────────────┐
│  Página Login   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│ Validar com Firebase Auth       │
└────────┬────────────────────────┘
         │
         ├─ Sucesso ──────┐
         │                │
         └─ Erro ──┐      │
                   │      │
                   ▼      ▼
              Erro    Home Page
            Message   (MainContext)
```

---

## 💾 Banco de Dados (Firestore)

### Estrutura de Coleções

```
Firestore Root
│
├── 📦 CHART
│   ├── 📄 mm-yyyy (documento)
│   │   ├── total: 42
│   │   ├── lines: { "101": 5, "202": 3 }
│   │   └── timestamp: 2024-01-16
│   │
│   └── 📄 01-2024 (documento)
│       └── [dados agregados]
│
├── 📦 MONITORED_LINES
│   ├── 📄 101 (documento)
│   │   ├── name: "São Paulo - Rio"
│   │   ├── corrections: 15
│   │   └── active: true
│   │
│   └── 📄 202 (documento)
│       └── [dados da linha]
│
├── 📦 PROHIBILE_ROWS
│   ├── 📄 301 (documento)
│   │   ├── reason: "Manutenção"
│   │   ├── blockedAt: timestamp
│   │   └── blockedBy: "admin@email.com"
│   │
│   └── 📄 302 (documento)
│       └── [dados da linha bloqueada]
│
└── 📦 MCO
    └── 📂 MM-yyyy (subcoleção)
        └── 📂 dd-MM (subcoleção)
            └── 📄 info (documento)
                ├── processed: true
                ├── totalTrips: 250
                ├── corrected: 42
                └── timestamp: 2024-01-16T10:30:00Z
```

### Operações Comuns

```typescript
// Ler linha monitorada
const getMonitoredLine = async (lineId: string) => {
  const doc = await getDoc(doc(db, "MONITORED_LINES", lineId));
  return doc.data();
};

// Adicionar correção ao gráfico
const addCorrection = async (month: string, lineId: string) => {
  const docRef = doc(db, "CHART", month);
  await updateDoc(docRef, {
    "lines." + lineId: increment(1),
    total: increment(1)
  });
};

// Bloquear linha
const blockLine = async (lineId: string, reason: string) => {
  await setDoc(doc(db, "PROHIBILE_ROWS", lineId), {
    reason,
    blockedAt: serverTimestamp(),
    blockedBy: getCurrentUser().email
  });
};
```

---

## 🔄 Fluxo Principal - Broker (Correção de Viagens)

### Diagrama do Processo

```
┌──────────────────────────────────────────────────────────────┐
│                    PÁGINA BROKER                              │
└──────────────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Upload de Arquivo Excel │
│  (read-excel-file)       │
└──────────────┬───────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Validação de Colunas e Dados       │
│  - ID Viagem                        │
│  - Linha                            │
│  - Horário Saída                    │
│  - Destino                          │
└──────────────┬──────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  Consulta API TACOM                  │
│  GET /api/viagen?id={idViagem}       │
│  Retorna dados atuais da viagem      │
└──────────────┬───────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Análise de Status                  │
│  ✓ Linha não está bloqueada?        │
│  ✓ Horário pode ser corrigido?      │
│  ✓ MCO está processando?            │
│  ✓ API TACOM respondeu?             │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │             │
   SIM  ▼             ▼  NÃO
┌──────────────┐  ┌─────────────┐
│  Corrigir    │  │ Registrar   │
│  Viagem      │  │ Erro        │
└──────┬───────┘  └──────┬──────┘
       │                 │
       ▼                 │
┌──────────────────────────────────────┐
│  PUT /api/setviagen?id={idViagem}    │
│  body: { novoHorario, ... }          │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  Atualizar Firestore                 │
│  - Incrementar contador de linha     │
│  - Atualizar gráfico mensal          │
│  - Registrar no MCO                  │
└──────────────┬───────────────────────┘
               │
               ▼
┌────────────────────────────────────┐
│  Exibir Resultado na Tabela        │
│  Status: ✅ CORRIGIDO              │
│  Linha: 101                        │
│  Horário: 10:30 → 10:45            │
│  Timestamp: 2024-01-16 14:32:15    │
└────────────────────────────────────┘
```

### Exemplo de Uso

```tsx
// Broker.tsx - Fluxo simplificado
const handleUploadAndCorrect = async (file: File) => {
  try {
    // 1. Ler arquivo
    const trips = await read(file);
    
    // 2. Iterar sobre viagens
    for (const trip of trips) {
      // 3. Consultar API TACOM
      const currentTrip = await axios.get(
        `${VITE_API_TRAVEL}${trip.id}`
      );
      
      // 4. Verificar se pode corrigir
      if (!isLineProhibited(trip.line) && canCorrect(trip)) {
        // 5. Aplicar correção
        await axios.put(
          `${VITE_API_SETTRAVEL}${trip.id}`,
          { newTime: trip.correctedTime }
        );
        
        // 6. Atualizar Firestore
        await updateCorrectionsCount(trip.line);
        
        // 7. Feedback ao usuário
        toast.success(`Viagem ${trip.id} corrigida!`);
      }
    }
  } catch (error) {
    toast.error("Erro ao processar viagens");
  }
};
```

---

## 📊 Dashboard (Home)

### Funcionalidades

O dashboard exibe visualizações importantes de correções realizadas:

#### 1. Gráfico de Total
- Histórico mensal de todas as correções
- Permite identificar tendências
- Filtrável por período

#### 2. Gráfico de Linhas
- Correções segregadas por linha monitorada
- Comparativo de performance entre linhas
- Ranking visual

#### 3. Indicadores
- Total de correções (mês atual)
- Linhas monitoradas ativas
- Taxa de sucesso da API

### Componentes

```tsx
// src/pages/home/Home.tsx
<Dashboard>
  <ChartTotal data={chartsData} />
  <ChartLines data={chartsData} />
  <StatsCards stats={stats} />
</Dashboard>

// src/components/charts/ChartTotal.tsx
export const ChartTotal: FC<Props> = ({ data }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: "Total de Correções por Mês"
      },
      legend: {
        display: true,
        position: "top" as const
      }
    }
  };
  
  return <Bar options={chartOptions} data={chartData} />;
};
```

---

## 🛠️ Configurações Importantes

### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://citgisnext.sitbus.com.br:9998",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0066cc",
        secondary: "#00cc99"
      },
      spacing: {
        "128": "32rem"
      }
    }
  },
  plugins: []
};
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

---

## 🌐 Deploy

### Vercel (Recomendado)

O projeto está pré-configurado para deploy no Vercel:

```json
// vercel.json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache"
        }
      ]
    }
  ]
}
```

### Passos para Deploy

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Configurar variáveis de ambiente no Vercel Dashboard
# VITE_API_TRAVEL
# VITE_API_SETTRAVEL
# VITE_TRAVEL_PING_NUMBER
# VITE_FIREBASE_* (todas as configurações Firebase)
```

### Environment Variables no Vercel

Acesse `Project Settings → Environment Variables` e adicione:
- ✅ Development
- ✅ Preview
- ✅ Production

---

## 📱 Responsividade

O projeto utiliza **Tailwind CSS** com breakpoints:

| Breakpoint | Largura | Uso |
|-----------|---------|-----|
| `sm` | 640px | Telefones pequenos |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | TVs/Monitores grandes |

```tsx
// Exemplo de componente responsivo
<div className="
  w-full
  md:w-1/2
  lg:w-1/3
  p-4
  md:p-6
  lg:p-8
">
  Conteúdo responsivo
</div>
```

---

## ⚡ Performance

### Otimizações Implementadas

- ✅ **Lazy Loading de Rotas** - Carregamento sob demanda
- ✅ **Code Splitting** - Vite divide automaticamente o bundle
- ✅ **Memoization** - React.memo em componentes pesados
- ✅ **LocalStorage Cache** - Cache de dados locais
- ✅ **Debounce em Inputs** - Evita requisições desnecessárias
- ✅ **Image Optimization** - Otimização automática de imagens
- ✅ **Tree Shaking** - Remoção de código não utilizado

### Métricas Típicas

| Métrica | Valor |
|---------|-------|
| Bundle Size | ~180KB (gzipped) |
| Time to Interactive | ~1.2s |
| Lighthouse Score | 90+ |
| First Contentful Paint | ~800ms |

---

## 🐛 Troubleshooting

### Erro: "API is Offline"

**Solução:**
```bash
# Verificar conectividade
curl -I https://api-tacom.vercel.app/api/viagen?id=1

# Verificar se firewall está bloqueando
# Se estiver em rede corporativa, configure proxy
```

### Erro: "Firebase Connection Failed"

**Solução:**
```typescript
// Verificar credenciais em src/services/firebase/firebaseConection.ts
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... resto das credenciais
};

console.log("Firebase Config:", firebaseConfig); // Debug
```

### Erro: "Excel file not supported"

**Solução:**
```bash
# Certifique-se que o arquivo é .xlsx ou .xls
# Não use .csv ou .ods
# Verifique se as colunas estão na ordem correta:
# - Coluna A: ID Viagem
# - Coluna B: Linha
# - Coluna C: Horário Original
# - Coluna D: Horário Corrigido
```

### Erro: "Not Authenticated"

**Solução:**
```tsx
// Verifique o localStorage
localStorage.removeItem("authToken");

// Force logout e faça login novamente
// Verifique se o usuário existe no Firebase Console
```

### Erro: "Port 5173 already in use"

**Solução:**
```bash
# Use porta diferente
npm run dev -- --port 3000

# Ou feche a aplicação que está usando a porta 5173
# No Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

## 🔄 Monitoramento de API

O sistema monitora continuamente a disponibilidade da API TACOM:

```typescript
// src/services/api/healthCheck.ts
const checkAPIHealth = async () => {
  try {
    const response = await axios.get(
      `${VITE_API_TRAVEL}${VITE_TRAVEL_PING_NUMBER}`
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Verifica a cada 60 segundos
setInterval(checkAPIHealth, 60000);
```

Status é exibido no Header:
```
🟢 API Online  (último check: há 2 minutos)
🔴 API Offline (tentando reconectar...)
```

---

## 📚 Documentação Adicional

### Links Úteis

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com)

### Recursos Internos

- **API TACOM**: Integração para consulta e atualização de viagens
- **Firebase Firestore**: Banco de dados em tempo real
- **Firebase Auth**: Autenticação de usuários

---

## 🤝 Contribuindo

### Padrão de Código

```typescript
// Sempre use TypeScript com tipos explícitos
interface Travel {
  id: string;
  line: string;
  originalTime: Date;
  correctedTime: Date;
  status: "pending" | "corrected" | "failed";
}

// Componentes com FC (Functional Component)
interface Props {
  travel: Travel;
  onCorrect: (travelId: string) => Promise<void>;
}

const TravelItem: FC<Props> = ({ travel, onCorrect }) => {
  // Implementação
};

export default TravelItem;
```

### Commits

```bash
# Use conventional commits
git commit -m "feat: adicionar novo recurso de monitoramento"
git commit -m "fix: corrigir bug no cálculo de horários"
git commit -m "refactor: otimizar renderização de tabelas"
git commit -m "docs: atualizar README"
```

---

## 📞 Suporte

Para dúvidas, problemas ou sugestões:

1. **Verificar Documentação** - Consulte este README
2. **Procurar Issues Existentes** - Busque em Issues do repositório
3. **Abrir Nova Issue** - Descreva o problema detalhadamente
4. **Entre em Contato** - Email: [contato]

---

## 📄 Licença

Este projeto é **privado** - Todos os direitos reservados.

Uso exclusivo autorizado para: **[Organização/Empresa]**

---

## 👥 Time de Desenvolvimento

| Função | Responsabilidades |
|--------|-------------------|
| **Frontend Lead** | UI/UX, React components, styling |
| **Backend Integration** | APIs, Firebase, data management |
| **DevOps** | Deploy, CI/CD, infrastructure |
| **QA** | Testes, validação, quality assurance |

---

<div align="center">

### 🎉 Obrigado por usar Travel Broker!

Desenvolvido com ❤️ usando **React** + **TypeScript** + **Vite**

![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)
![Last Updated](https://img.shields.io/badge/Last%20Updated-Jan%202024-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Production-brightgreen?style=flat-square)

**[⬆ Voltar ao Topo](#-travel-broker)**

</div>