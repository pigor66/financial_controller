# 💳 Atualização: Status de Pagamento

Esta atualização adiciona o controle de **pagamentos pendentes** ao sistema!

---

## 🎯 **O que mudou?**

Agora cada transação tem um **status de pagamento**:

- ✅ **PAGO** - A despesa foi paga ou a receita foi recebida
- ⏳ **PENDENTE** - A despesa ainda não foi paga ou a receita não foi recebida

---

## 📊 **Nova Estrutura do Google Sheets**

A planilha agora tem **9 colunas** (antes eram 8):

```
| A   | B           | C      | D      | E        | F    | G       | H         | I         |
|-----|-------------|--------|--------|----------|------|---------|-----------|-----------|
| id  | description | amount | type   | category | date | status  | createdAt | updatedAt |
```

**Nova coluna G = STATUS** (PAID ou PENDING)

---

## ⚠️ **IMPORTANTE: Atualizar Planilha Existente**

Se você já tinha dados na planilha, precisa adicionar a coluna de status:

### **Opção 1: Manualmente**

1. Abra sua planilha no Google Sheets
2. Clique na coluna **G** (entre F e G atual)
3. Clique com botão direito → **Inserir 1 coluna à esquerda**
4. Na célula **G1**, escreva: `status`
5. Nas células **G2** em diante (onde tem dados), preencha com: `PAID`

### **Opção 2: Começar do Zero**

1. Delete todos os dados da planilha (ou crie uma nova aba)
2. O sistema criará automaticamente os cabeçalhos corretos

---

## 🆕 **Novas Funcionalidades**

### **1. Formulário de Transação**

Agora tem um campo **"Status"** onde você escolhe:

- **Pago** - Para transações já efetivadas
- **Pendente** - Para transações futuras ou não pagas

### **2. Listagem de Transações**

Nova coluna mostrando o status:

- 🟢 **Chip verde "Pago"** - Transações pagas
- 🟡 **Chip amarelo "Pendente"** - Transações pendentes

### **3. Banner de Alerta no Dashboard**

⚠️ Banner amarelo mostrando:

- Quantas transações pendentes você tem
- Total de despesas pendentes
- Total de receitas pendentes

---

## 💡 **Casos de Uso**

### **Exemplo 1: Conta de Luz Pendente**

```
Descrição: Conta de luz - Outubro
Valor: R$ 150,00
Tipo: Despesa
Categoria: Contas
Data: 25/10/2025
Status: PENDENTE ⏳
```

Quando você pagar, edita e muda pra **PAGO** ✅

### **Exemplo 2: Freelance a Receber**

```
Descrição: Projeto Cliente X
Valor: R$ 2.000,00
Tipo: Receita
Categoria: Freelance
Data: 30/10/2025
Status: PENDENTE ⏳
```

Quando receber, muda pra **PAGO** ✅

### **Exemplo 3: Mercado já Pago**

```
Descrição: Mercado do mês
Valor: R$ 450,00
Tipo: Despesa
Categoria: Alimentação
Data: 15/10/2025
Status: PAGO ✅
```

---

## 📈 **Benefícios**

✅ **Visibilidade do fluxo de caixa real**  
✅ **Planejamento melhor** - Sabe o que ainda vai sair/entrar  
✅ **Alerta visual** - Banner mostra pendências  
✅ **Controle de contas a pagar**  
✅ **Acompanhamento de recebíveis**

---

## 🎨 **Indicadores Visuais**

### **Na Listagem:**

- 🟢 Chip **verde cheio** = Pago
- 🟡 Chip **amarelo contornado** = Pendente

### **No Dashboard:**

- ⚠️ **Banner amarelo** aparece quando há pendências
- Mostra quantidade e valores totais pendentes

---

## 🔄 **Compatibilidade**

**Dados antigos (sem status):**

- São automaticamente considerados como **PAID** (pago)
- Você pode editar e mudar se necessário

**Novos dados:**

- Campo obrigatório no formulário
- Padrão: **PAID** (pago)

---

## 📝 **Exemplo de Uso no Dia a Dia**

### **Dia 15 (Recebeu o Salário):**

```
1. Cadastra o salário como PAGO
2. Cadastra todas as contas do mês como PENDENTE
3. Vê no banner: "Você tem 5 transações pendentes - Despesas: R$ 1.200"
```

### **Durante o Mês:**

```
1. Pagou a conta de luz → Edita e muda status para PAGO
2. Pagou o mercado → Edita e muda status para PAGO
3. Banner atualiza automaticamente
```

### **Fim do Mês:**

```
1. Todas as transações estão PAGAS
2. Banner não aparece mais
3. Relatórios mostram gastos reais
```

---

## ✅ **Checklist de Atualização**

- [ ] Coluna "status" adicionada na planilha (coluna G)
- [ ] Dados antigos preenchidos com "PAID"
- [ ] Servidor reiniciado (`yarn dev`)
- [ ] Testado criar transação com status PENDENTE
- [ ] Testado editar status de PENDENTE para PAGO
- [ ] Banner de pendências aparecendo no dashboard

---

**🎉 Agora você tem controle total sobre o que foi pago e o que ainda está pendente!**

Muito útil para planejar seu mês e não esquecer de pagar contas! 💰
