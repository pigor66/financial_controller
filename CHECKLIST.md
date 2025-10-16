# ✅ Checklist de Setup - Controle Financeiro

Use este checklist para garantir que tudo está configurado corretamente.

## 📦 Passo 1: Instalar Dependências

```bash
npm install
```

**Status:** ⬜ Pendente

---

## 🔧 Passo 2: Configurar Google Cloud

- ⬜ Projeto criado no Google Cloud Console
- ⬜ Google Sheets API ativada
- ⬜ Service Account criada
- ⬜ Chave JSON baixada
- ⬜ Email da Service Account anotado

**Guia:** Ver `SETUP_GUIDE.md` - Passo 1

---

## 📊 Passo 3: Configurar Google Sheets

- ⬜ Planilha criada no Google Sheets
- ⬜ Primeira aba renomeada para "Transações"
- ⬜ ID da planilha copiado
- ⬜ Planilha compartilhada com Service Account (permissão de Editor)

**Guia:** Ver `SETUP_GUIDE.md` - Passo 2

---

## ⚙️ Passo 4: Configurar Variáveis de Ambiente

- ⬜ Arquivo `.env.local` criado na raiz do projeto
- ⬜ `GOOGLE_SERVICE_ACCOUNT_EMAIL` preenchido
- ⬜ `GOOGLE_PRIVATE_KEY` preenchido (com \\n preservados)
- ⬜ `GOOGLE_SPREADSHEET_ID` preenchido
- ⬜ `GOOGLE_SHEET_NAME` preenchido (Transações)

**Template:** Ver arquivo `env.example.txt`

**Guia:** Ver `SETUP_GUIDE.md` - Passo 3

---

## 🧪 Passo 5: Testar Localmente

```bash
npm run dev
```

- ⬜ Servidor iniciou sem erros
- ⬜ Acesso a http://localhost:3000 funciona
- ⬜ Dashboard carrega
- ⬜ É possível criar uma transação de teste
- ⬜ Transação aparece na planilha do Google Sheets

**Guia:** Ver `SETUP_GUIDE.md` - Passo 3.3

---

## 🚀 Passo 6: Deploy na Vercel (Opcional)

### 6.1 Preparar Git

```bash
git init
git add .
git commit -m "Setup inicial"
```

- ⬜ Repositório Git iniciado
- ⬜ Código commitado

### 6.2 Push para GitHub

- ⬜ Repositório criado no GitHub
- ⬜ Código enviado para GitHub

```bash
git remote add origin <url-do-repositorio>
git branch -M main
git push -u origin main
```

### 6.3 Deploy

- ⬜ Conta na Vercel criada
- ⬜ Projeto importado do GitHub
- ⬜ Variáveis de ambiente configuradas na Vercel:
  - ⬜ GOOGLE_SERVICE_ACCOUNT_EMAIL
  - ⬜ GOOGLE_PRIVATE_KEY
  - ⬜ GOOGLE_SPREADSHEET_ID
  - ⬜ GOOGLE_SHEET_NAME
- ⬜ Deploy realizado com sucesso
- ⬜ URL da Vercel funcionando

**Guia:** Ver `SETUP_GUIDE.md` - Passo 4

---

## 🎯 Funcionalidades Implementadas

### ✅ Backend (API)

- ✅ Google Sheets como banco de dados
- ✅ CRUD completo de transações
- ✅ Cálculos de resumos semanais e mensais
- ✅ Análise por categorias
- ✅ API RESTful com Next.js API Routes

### ✅ Frontend (Páginas)

- ✅ **Dashboard** - Visão geral das finanças
- ✅ **Transações** - Listagem completa
- ✅ **Nova Transação** - Formulário de criação
- ✅ **Editar Transação** - Formulário de edição
- ✅ **Relatórios** - Análises e insights

### ✅ Componentes

- ✅ Layout responsivo (Desktop + Mobile)
- ✅ Menu lateral (Sidebar)
- ✅ Cards de estatísticas
- ✅ Tabelas
- ✅ Formulários com validação
- ✅ Loading states
- ✅ Empty states

### ✅ Recursos

- ✅ Tipagem TypeScript completa
- ✅ Material-UI (MUI) integrado
- ✅ Tema customizado
- ✅ Formatação de moeda (BRL)
- ✅ Formatação de datas (PT-BR)
- ✅ Categorias de despesas e receitas
- ✅ Filtros por data, tipo e categoria

---

## 📚 Documentação Criada

- ✅ `README.md` - Documentação completa do projeto
- ✅ `SETUP_GUIDE.md` - Guia passo a passo de configuração
- ✅ `CHECKLIST.md` - Este arquivo
- ✅ `env.example.txt` - Template de variáveis de ambiente
- ✅ Comentários no código

---

## 🐛 Solução de Problemas

### Erro: "Cannot find module..."

**Solução:** Execute `npm install` novamente

### Erro: "Falha na autenticação com Google Sheets"

**Solução:**

- Verifique se a planilha foi compartilhada com o email da Service Account
- Confirme que a chave privada está correta no .env.local
- Verifique se os \\n estão preservados na GOOGLE_PRIVATE_KEY

### Erro: "GOOGLE_SPREADSHEET_ID não configurado"

**Solução:**

- Certifique-se que o arquivo .env.local existe na raiz do projeto
- Verifique se todas as variáveis estão preenchidas
- Reinicie o servidor (`npm run dev`)

### Página em branco ou erro 404

**Solução:**

- Limpe o cache: `.next` folder pode estar com cache antigo
- Execute: `rm -rf .next` (Linux/Mac) ou `Remove-Item -Recurse -Force .next` (Windows)
- Execute `npm run dev` novamente

---

## 📞 Próximos Passos

Depois que tudo estiver funcionando:

1. ✅ Teste criando algumas transações
2. ✅ Veja os dados na planilha do Google Sheets
3. ✅ Explore o dashboard e relatórios
4. ✅ Acesse de outro dispositivo (após deploy)
5. ✅ Adicione à tela inicial do celular (PWA)

---

## 🎉 Projeto Completo!

Quando todos os checkboxes estiverem marcados, seu sistema de controle financeiro estará 100% funcional!

**Dúvidas?** Consulte o `README.md` ou `SETUP_GUIDE.md`

---

**Desenvolvido com 💚 por Pigor & James**
