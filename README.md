# 💰 Financial Control

Sistema de controle financeiro pessoal moderno e intuitivo, desenvolvido com Next.js 15, TypeScript e Material-UI. Gerencie suas receitas e despesas com monitoramento semanal e mensal, integração com Google Sheets e interface dark mode elegante.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Material-UI](https://img.shields.io/badge/MUI-6.0-007FFF?logo=mui)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Funcionalidades

- 📊 **Dashboard Interativo**: Visualização em tempo real de receitas, despesas e saldos
- 📅 **Controle Semanal e Mensal**: Acompanhamento baseado em semanas personalizadas
- 💳 **Gestão de Transações**: CRUD completo com categorização inteligente
- 🏷️ **Categorias Customizadas**: Campo livre para criar suas próprias categorias
- 📈 **Relatórios Detalhados**: Análise por categoria com percentuais
- ⚠️ **Alertas de Pendências**: Notificações de transações pendentes
- 🌙 **Dark Mode**: Interface moderna com tema escuro
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- 🔄 **Integração Google Sheets**: Sincronização automática com planilhas

## 🚀 Tecnologias

### Frontend
- **Next.js 15**: Framework React com Server Components e App Router
- **TypeScript**: Tipagem estática para maior segurança
- **Material-UI (MUI)**: Componentes UI modernos e acessíveis
- **Tailwind CSS**: Estilização utilitária e responsiva

### Backend
- **Next.js API Routes**: APIs serverless integradas
- **Google Sheets API**: Armazenamento e sincronização de dados
- **date-fns**: Manipulação avançada de datas

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta Google com acesso ao Google Sheets API

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/financial_control.git
cd financial_control
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# Google Sheets API
GOOGLE_SHEET_ID=seu_sheet_id_aqui
GOOGLE_SERVICE_ACCOUNT_EMAIL=seu_email_service_account@projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nsua_chave_privada_aqui\n-----END PRIVATE KEY-----\n"
```

### 4. Execute o projeto
```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🔧 Configuração do Google Sheets

### 1. Criar um Projeto no Google Cloud
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative a **Google Sheets API**

### 2. Criar Service Account
1. Vá em **IAM & Admin > Service Accounts**
2. Crie uma nova Service Account
3. Baixe a chave JSON

### 3. Configurar a Planilha
1. Crie uma nova planilha no Google Sheets
2. Compartilhe com o email da Service Account (editor)
3. Copie o ID da planilha (está na URL)
4. Configure as colunas: `id`, `description`, `amount`, `type`, `category`, `date`, `status`, `createdAt`, `updatedAt`

## 📁 Estrutura do Projeto

```
financial_control/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── api/               # API Routes
│   │   ├── dashboard/         # Página do dashboard
│   │   ├── transactions/      # Gestão de transações
│   │   └── reports/           # Relatórios
│   ├── components/            # Componentes React
│   │   ├── common/            # Componentes reutilizáveis
│   │   ├── features/          # Componentes específicos
│   │   └── layout/            # Layout e navegação
│   ├── contexts/              # Context API
│   ├── lib/                   # Utilitários e helpers
│   ├── server/                # Lógica do servidor
│   │   ├── controllers/       # Controllers da API
│   │   ├── services/          # Camada de serviços
│   │   └── models/            # Modelos de dados
│   ├── shared/                # Código compartilhado
│   │   ├── types/             # TypeScript types
│   │   └── constants/         # Constantes da aplicação
│   └── styles/                # Estilos globais e tema
├── public/                    # Arquivos estáticos
└── .env.local                 # Variáveis de ambiente (não versionado)
```

## 🎨 Categorias Disponíveis

### Despesas
- 🍷 Adega
- 🍕 Alimentação
- 🚗 Transporte
- 🏠 Moradia
- 💊 Saúde
- 🎮 Lazer
- 📚 Educação
- 🛍️ Compras
- 📄 Contas
- 🐾 Pets
- 📺 Streaming
- ✏️ Outro (customizável)

### Receitas
- 💼 Salário
- 💻 Freelance
- 📈 Investimentos
- 💰 Outros Ganhos

## 📅 Sistema de Semanas

O sistema utiliza semanas personalizadas baseadas no dia do salário:
- **Configurável**: Defina o dia de início (padrão: dia 15)
- **Semana 1**: Dia 15 a 21
- **Semana 2**: Dia 22 a 28
- **Semana 3**: Dia 29 a 7 (próximo mês)
- **Semana 4**: Dia 8 a 14 (próximo mês)

Configure em `src/shared/constants/index.ts`:
```typescript
export const FINANCIAL_WEEK_CONFIG = {
  START_DAY: 15 // Altere para o dia desejado
};
```

## 🌐 Deploy na Vercel

### Deploy Automático (Recomendado)
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **Import Project**
3. Conecte seu repositório GitHub
4. Configure as variáveis de ambiente
5. Deploy automático! 🎉

### Deploy via CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

**⚠️ Importante**: Adicione as variáveis de ambiente no painel da Vercel:
- Settings > Environment Variables
- Adicione: `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Linting
npm run lint
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Pigor**

- GitHub: [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- Material-UI pela biblioteca de componentes
- Next.js pela excelente developer experience
- Google Sheets API pela facilidade de integração

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
