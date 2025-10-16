# 📘 Guia Rápido de Setup - Controle Financeiro

Este guia mostra passo a passo como configurar o projeto do zero até o deploy na Vercel.

---

## 🎯 Objetivo

Ter o sistema rodando localmente e fazer deploy na Vercel para acessar de qualquer dispositivo.

---

## ⏱️ Tempo estimado: 20-30 minutos

---

## Passo 1: Configurar Google Cloud (10 min)

### 1.1. Criar Projeto

1. Acesse: https://console.cloud.google.com/
2. Clique em **Selecionar Projeto** → **Novo Projeto**
3. Nome: `Controle Financeiro`
4. Clique em **Criar**

### 1.2. Ativar API

1. Menu lateral → **APIs e Serviços** → **Biblioteca**
2. Busque: `Google Sheets API`
3. Clique em **Ativar**

### 1.3. Criar Service Account

1. Menu → **APIs e Serviços** → **Credenciais**
2. **Criar Credenciais** → **Conta de serviço**
3. Preencha:
   - Nome: `financial-bot`
   - Clique em **Criar e Continuar**
4. Pule permissões → **Concluir**

### 1.4. Baixar Chave

1. Clique na Service Account criada
2. Aba **Chaves** → **Adicionar Chave** → **Criar Nova Chave**
3. Tipo: **JSON**
4. Baixe o arquivo → **Guarde com segurança!**

📝 **Anote**: O email da Service Account (ex: financial-bot@projeto.iam.gserviceaccount.com)

---

## Passo 2: Criar Planilha Google Sheets (5 min)

### 2.1. Criar Planilha

1. Acesse: https://docs.google.com/spreadsheets
2. **Nova Planilha em Branco**
3. Renomeie para: `Controle Financeiro`
4. Renomeie a primeira aba para: `Transações`

### 2.2. Copiar ID da Planilha

Na URL, copie o ID:
\`\`\`
https://docs.google.com/spreadsheets/d/[COPIE_ESTE_ID]/edit
\`\`\`

### 2.3. Compartilhar com Service Account

1. Botão **Compartilhar** (canto superior direito)
2. Cole o **email da Service Account**
3. Permissão: **Editor**
4. **Enviar**

✅ Pronto! A planilha está configurada.

---

## Passo 3: Configurar Projeto Localmente (5 min)

### 3.1. Instalar Dependências

\`\`\`bash
npm install
\`\`\`

### 3.2. Criar Arquivo .env.local

Crie um arquivo chamado \`.env.local\` na raiz do projeto com:

\`\`\`env
GOOGLE_SERVICE_ACCOUNT_EMAIL=seu-email@projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=id-copiado-da-url-da-planilha
GOOGLE_SHEET_NAME=Transações
\`\`\`

**Como preencher:**

1. **GOOGLE_SERVICE_ACCOUNT_EMAIL**:

   - Está no arquivo JSON baixado: campo \`client_email\`

2. **GOOGLE_PRIVATE_KEY**:

   - Está no arquivo JSON: campo \`private_key\`
   - **IMPORTANTE**: Copie exatamente como está, incluindo as quebras de linha (\\n)
   - Mantenha as aspas duplas

3. **GOOGLE_SPREADSHEET_ID**:

   - ID copiado da URL da planilha

4. **GOOGLE_SHEET_NAME**:
   - Nome da aba: \`Transações\`

### 3.3. Executar Localmente

\`\`\`bash
npm run dev
\`\`\`

Acesse: http://localhost:3000

✅ Se abrir a tela do dashboard, está funcionando!

---

## Passo 4: Deploy na Vercel (5-10 min)

### Opção A: Deploy via Dashboard (Mais Fácil)

#### 4.1. Preparar Repositório Git

\`\`\`bash
git init
git add .
git commit -m "Setup inicial"
\`\`\`

#### 4.2. Enviar para GitHub

1. Crie um repositório no GitHub (pode ser privado)
2. Siga as instruções para push:
   \`\`\`bash
   git remote add origin <url-do-repositorio>
   git branch -M main
   git push -u origin main
   \`\`\`

#### 4.3. Deploy na Vercel

1. Acesse: https://vercel.com
2. Faça login com GitHub
3. **New Project**
4. **Import** do repositório criado
5. **Configure** as variáveis de ambiente (ver próximo passo)
6. **Deploy**

#### 4.4. Configurar Environment Variables

Na tela de configuração (ou depois em Settings → Environment Variables):

Adicione:

- \`GOOGLE_SERVICE_ACCOUNT_EMAIL\` = (seu email da service account)
- \`GOOGLE_PRIVATE_KEY\` = (sua chave privada - copie do .env.local)
- \`GOOGLE_SPREADSHEET_ID\` = (id da planilha)
- \`GOOGLE_SHEET_NAME\` = \`Transações\`

**⚠️ IMPORTANTE**: Ao colar a GOOGLE_PRIVATE_KEY na Vercel, ela deve ficar em uma linha só, mas com os \\n preservados.

#### 4.5. Finalizar

Clique em **Deploy** e aguarde.

✅ Quando terminar, você terá uma URL tipo: \`seu-projeto.vercel.app\`

---

### Opção B: Deploy via CLI (Alternativa)

\`\`\`bash

# Instalar Vercel CLI

npm i -g vercel

# Fazer login

vercel login

# Deploy

vercel

# Configurar variáveis (será solicitado)

\`\`\`

---

## 🎉 Pronto!

Agora você pode acessar seu controle financeiro de qualquer dispositivo!

---

## ✅ Checklist Final

- [ ] Google Cloud configurado
- [ ] Service Account criada e chave baixada
- [ ] Planilha criada e compartilhada
- [ ] Projeto rodando localmente
- [ ] Deploy realizado na Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Sistema acessível pela URL da Vercel

---

## 🆘 Problemas Comuns

### "Falha na autenticação"

- Verifique se a planilha foi compartilhada com o email da Service Account
- Confirme que a chave privada foi copiada corretamente (com \\n)

### "Não encontra a planilha"

- Confirme o ID da planilha
- Verifique se o nome da aba é exatamente "Transações"

### "Erro no deploy da Vercel"

- Verifique se todas as 4 variáveis de ambiente foram configuradas
- Refaça o deploy após configurar as variáveis

---

## 📱 Próximos Passos

1. Abra o app no celular e adicione à tela inicial (PWA)
2. Comece a registrar suas transações
3. Acompanhe seus gastos semanalmente

**Boa gestão financeira! 💰**
