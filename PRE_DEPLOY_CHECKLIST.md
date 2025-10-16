# ✅ Checklist Pré-Deploy

Use este checklist antes de fazer o deploy do projeto na Vercel.

## 🔧 Configuração Local

- [ ] Todas as dependências instaladas (`npm install` ou `yarn install`)
- [ ] Build local funciona sem erros (`npm run build`)
- [ ] Projeto roda localmente sem problemas (`npm run dev`)
- [ ] Arquivo `.env.local` configurado corretamente
- [ ] Conexão com Google Sheets funcionando

## 📝 Código

- [ ] Código commitado no Git
- [ ] Sem erros de TypeScript (`npm run build`)
- [ ] Sem warnings críticos no console
- [ ] Todos os arquivos importantes estão no repositório
- [ ] `.gitignore` atualizado (não commitar `.env.local`)

## 🔑 Google Sheets API

- [ ] Projeto criado no Google Cloud Console
- [ ] Google Sheets API ativada
- [ ] Service Account criada
- [ ] Chave JSON da Service Account baixada
- [ ] Planilha criada no Google Sheets
- [ ] Planilha compartilhada com o email da Service Account
- [ ] Cabeçalhos da planilha configurados corretamente:
  ```
  id | description | amount | type | category | date | status | createdAt | updatedAt
  ```
- [ ] Variáveis de ambiente anotadas:
  - `GOOGLE_SHEET_ID`
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_PRIVATE_KEY`

## 🌐 GitHub

- [ ] Repositório criado no GitHub
- [ ] Código enviado para o repositório (`git push`)
- [ ] Branch principal é `main` ou `master`
- [ ] README.md atualizado
- [ ] Licença incluída (LICENSE)

## 🚀 Vercel

- [ ] Conta criada na Vercel
- [ ] Conta conectada ao GitHub
- [ ] Variáveis de ambiente preparadas para adicionar na Vercel
- [ ] Entendimento do processo de deploy automático

## 🧪 Testes Pós-Deploy

Após o deploy, teste:

- [ ] Página inicial carrega
- [ ] Dashboard exibe dados
- [ ] Criar nova transação funciona
- [ ] Editar transação funciona
- [ ] Deletar transação funciona
- [ ] Dados sincronizam com Google Sheets
- [ ] Interface responsiva (mobile/desktop)
- [ ] Dark mode funciona corretamente
- [ ] Todas as categorias aparecem
- [ ] Campo personalizado "Outro" funciona

## 📱 Opcional

- [ ] Domínio customizado configurado
- [ ] Analytics da Vercel ativado
- [ ] Compartilhado com amigos/colegas
- [ ] Documentação adicional criada
- [ ] Issues/features planejadas no GitHub

## 🔒 Segurança

- [ ] Nenhum arquivo `.env` commitado
- [ ] Credenciais do Google não estão expostas
- [ ] Service Account tem apenas permissões necessárias
- [ ] Planilha não é pública (apenas compartilhada com Service Account)

## 📊 Performance

- [ ] Imagens otimizadas (se houver)
- [ ] Sem console.logs desnecessários em produção
- [ ] Build size razoável (< 5MB)
- [ ] Tempo de load < 3 segundos

---

## 🎯 Comando Final

Quando todos os itens estiverem marcados:

```bash
# 1. Último commit
git add .
git commit -m "chore: prepare for production deploy"

# 2. Push para GitHub
git push origin main

# 3. Deploy na Vercel
# Via dashboard: vercel.com > Import Project
# Ou via CLI: vercel --prod
```

## 🎉 Parabéns!

Seu projeto está pronto para o mundo! 🚀

**Próximos Passos:**

1. Compartilhe a URL do projeto
2. Peça feedback de usuários
3. Monitore erros e performance
4. Continue melhorando!

---

💡 **Dica**: Mantenha este checklist para futuros deploys ou atualizações importantes!
