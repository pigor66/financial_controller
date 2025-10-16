# 🚀 Guia Completo de Deploy na Vercel

Este guia fornece instruções passo a passo para fazer o deploy do Financial Control na Vercel.

## 📋 Pré-requisitos

- ✅ Conta no GitHub
- ✅ Conta na Vercel (gratuita)
- ✅ Credenciais do Google Sheets API configuradas
- ✅ Projeto commitado no GitHub

## 🎯 Método 1: Deploy Automático via GitHub (Recomendado)

### Passo 1: Preparar o Repositório

```bash
# 1. Inicializar Git (se ainda não fez)
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Fazer commit
git commit -m "Initial commit: Financial Control Application"

# 4. Criar repositório no GitHub
# Acesse: https://github.com/new
# Nome sugerido: financial-control

# 5. Conectar ao repositório remoto
git remote add origin https://github.com/seu-usuario/financial-control.git

# 6. Push para o GitHub
git branch -M main
git push -u origin main
```

### Passo 2: Conectar com a Vercel

1. **Acesse a Vercel**
   - Vá para [vercel.com](https://vercel.com)
   - Clique em **Sign Up** ou **Login**
   - Use sua conta do GitHub para login

2. **Importar Projeto**
   - No dashboard, clique em **Add New Project**
   - Selecione **Import Git Repository**
   - Escolha seu repositório `financial-control`
   - Clique em **Import**

3. **Configurar o Projeto**
   ```
   Project Name: financial-control (ou outro nome de sua preferência)
   Framework Preset: Next.js (detectado automaticamente)
   Root Directory: ./
   Build Command: npm run build (padrão)
   Output Directory: .next (padrão)
   Install Command: npm install (padrão)
   ```

### Passo 3: Adicionar Variáveis de Ambiente

⚠️ **IMPORTANTE**: Não faça deploy sem configurar as variáveis de ambiente!

1. **Na página de configuração do projeto**, clique em **Environment Variables**

2. **Adicione cada variável**:

   ```env
   # Variável 1
   Name: GOOGLE_SHEET_ID
   Value: seu_sheet_id_aqui
   Environment: Production, Preview, Development (selecione todos)
   
   # Variável 2
   Name: GOOGLE_SERVICE_ACCOUNT_EMAIL
   Value: seu-email@projeto.iam.gserviceaccount.com
   Environment: Production, Preview, Development
   
   # Variável 3
   Name: GOOGLE_PRIVATE_KEY
   Value: -----BEGIN PRIVATE KEY-----\nsua_chave_aqui\n-----END PRIVATE KEY-----\n
   Environment: Production, Preview, Development
   ```

   **⚠️ Dica**: Para `GOOGLE_PRIVATE_KEY`, copie exatamente como está no arquivo JSON da Service Account, incluindo `\n` nas quebras de linha.

3. **Clique em Add** para cada variável

### Passo 4: Deploy

1. Clique em **Deploy**
2. Aguarde o build (2-3 minutos)
3. 🎉 Deploy concluído!

## 🎯 Método 2: Deploy via Vercel CLI

### Passo 1: Instalar a CLI

```bash
npm install -g vercel
```

### Passo 2: Login

```bash
vercel login
```

Siga as instruções no navegador para autenticar.

### Passo 3: Deploy

```bash
# Deploy de desenvolvimento (preview)
vercel

# Deploy de produção
vercel --prod
```

### Passo 4: Configurar Variáveis de Ambiente

```bash
# Adicionar variáveis via CLI
vercel env add GOOGLE_SHEET_ID
vercel env add GOOGLE_SERVICE_ACCOUNT_EMAIL
vercel env add GOOGLE_PRIVATE_KEY

# Ou adicione manualmente no dashboard da Vercel
```

## ⚙️ Configuração Pós-Deploy

### 1. Verificar o Deploy

Acesse a URL fornecida pela Vercel (ex: `https://seu-projeto.vercel.app`)

### 2. Testar Funcionalidades

- ✅ Dashboard carrega corretamente
- ✅ Criar nova transação
- ✅ Editar transação existente
- ✅ Deletar transação
- ✅ Verificar sincronização com Google Sheets

### 3. Configurar Domínio Customizado (Opcional)

1. No dashboard da Vercel, vá em **Settings > Domains**
2. Adicione seu domínio
3. Configure os DNS conforme instruções da Vercel

## 🔄 Deploy Automático (CI/CD)

Após o setup inicial, cada push para o branch `main` fará deploy automático:

```bash
# 1. Fazer alterações no código
# 2. Commit
git add .
git commit -m "feat: adiciona nova funcionalidade"

# 3. Push
git push origin main

# 4. Deploy automático na Vercel! 🚀
```

### Branches e Preview Deploys

- `main` → Deploy de **Produção**
- Outras branches → Deploy de **Preview**

```bash
# Criar branch de feature
git checkout -b feature/nova-funcionalidade

# Fazer alterações e push
git add .
git commit -m "WIP: nova funcionalidade"
git push origin feature/nova-funcionalidade

# Vercel cria automaticamente um preview deploy com URL única
```

## 🐛 Troubleshooting

### Erro: "GOOGLE_SHEET_ID is not defined"

**Solução**: Verifique se as variáveis de ambiente foram configuradas corretamente na Vercel.

```bash
# Via dashboard:
Settings > Environment Variables > Add

# Via CLI:
vercel env pull .env.local
```

### Erro: "Failed to authenticate with Google Sheets"

**Solução**:
1. Verifique se a planilha está compartilhada com o email da Service Account
2. Confirme que `GOOGLE_PRIVATE_KEY` tem as quebras de linha (`\n`)
3. Certifique-se de que a Google Sheets API está ativada no projeto

### Erro: "Build failed"

**Solução**:
1. Verifique os logs de build na Vercel
2. Teste localmente:
   ```bash
   npm run build
   ```
3. Corrija os erros de TypeScript/linting
4. Push novamente

### Deploy está lento

**Solução**:
- Adicione `.vercelignore` para ignorar arquivos desnecessários:
  ```
  node_modules
  .next
  .env*
  *.md
  ```

## 📊 Monitoramento

### Analytics (Vercel Analytics)

1. Acesse **Analytics** no dashboard
2. Visualize métricas de performance
3. Monitore Core Web Vitals

### Logs

```bash
# Ver logs em tempo real
vercel logs [deployment-url]

# Ver logs de uma função específica
vercel logs [deployment-url] --function=api/transactions
```

## 🔒 Segurança

### Variáveis de Ambiente Sensíveis

✅ **NUNCA** commite arquivos `.env.local` ou `.env`
✅ Use apenas variáveis de ambiente da Vercel
✅ Mantenha as credenciais do Google seguras

### CORS e Segurança

O Next.js e Vercel lidam automaticamente com:
- HTTPS
- Headers de segurança
- CORS
- Rate limiting

## 📈 Escalabilidade

### Limites do Plano Gratuito (Hobby)

- ✅ Builds ilimitados
- ✅ 100 GB de bandwidth/mês
- ✅ Domínio customizado
- ✅ Deploy automático
- ⚠️ Limite de execução de funções: 10s
- ⚠️ Sem garantia de SLA

### Upgrade para Pro (Se necessário)

- Execução de funções: 60s
- Prioridade de build
- Mais colaboradores
- Suporte técnico

## 🎉 Parabéns!

Seu Financial Control está no ar! 🚀

**Próximos Passos Sugeridos:**
1. ⭐ Adicione o repositório aos favoritos
2. 📱 Teste em dispositivos móveis
3. 📊 Configure Analytics
4. 🔔 Configure notificações de deploy
5. 👥 Compartilhe com amigos

---

**Links Úteis:**
- [Documentação Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

Precisando de ajuda? Abra uma issue no GitHub!

