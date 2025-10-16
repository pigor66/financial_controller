# 📅 Como Configurar o Início das Semanas Financeiras

Este guia explica como personalizar o dia do mês em que as semanas financeiras começam.

---

## 🎯 **O que é isso?**

Por padrão, as semanas são contadas a partir do **dia 1** de cada mês. Mas você pode mudar para qualquer dia!

**Exemplo:**

- Se configurar para começar no **dia 13**:
  - Semana 1: dias 13 a 19
  - Semana 2: dias 20 a 26
  - Semana 3: dias 27 ao último dia do mês
  - Semana 0 (parcial): dias 1 a 12

---

## ⚙️ **Como Configurar**

### **Passo 1: Abrir o arquivo de configuração**

Abra o arquivo: `src/shared/constants/index.ts`

### **Passo 2: Localizar a configuração**

Procure por esta seção no final do arquivo:

```typescript
// Configuração do início da semana financeira
export const FINANCIAL_WEEK_CONFIG = {
  // Dia do mês em que começa a contagem (1 a 31)
  START_DAY: 1 // Altere este valor conforme necessário
};
```

### **Passo 3: Alterar o dia**

Mude o valor de `START_DAY` para o dia desejado:

```typescript
export const FINANCIAL_WEEK_CONFIG = {
  START_DAY: 13 // Agora as semanas começam no dia 13
};
```

### **Passo 4: Reiniciar o servidor**

```bash
# Pare o servidor (Ctrl+C)
# Inicie novamente
yarn dev
```

---

## 📊 **Exemplos de Configuração**

### **Exemplo 1: Dia 1 (padrão)**

```typescript
START_DAY: 1;
```

**Resultado para Outubro/2025:**

```
Semana 1: 01/10 a 07/10
Semana 2: 08/10 a 14/10
Semana 3: 15/10 a 21/10
Semana 4: 22/10 a 28/10
Semana 5: 29/10 a 31/10
```

---

### **Exemplo 2: Dia 13**

```typescript
START_DAY: 13;
```

**Resultado para Outubro/2025:**

```
Semana 0 (parcial): 01/10 a 12/10
Semana 1: 13/10 a 19/10
Semana 2: 20/10 a 26/10
Semana 3: 27/10 a 31/10
```

---

### **Exemplo 3: Dia 5 (útil para quem recebe no dia 5)**

```typescript
START_DAY: 5;
```

**Resultado para Outubro/2025:**

```
Semana 0 (parcial): 01/10 a 04/10
Semana 1: 05/10 a 11/10
Semana 2: 12/10 a 18/10
Semana 3: 19/10 a 25/10
Semana 4: 26/10 a 31/10
```

---

### **Exemplo 4: Dia 25 (útil para quem recebe no dia 25)**

```typescript
START_DAY: 25;
```

**Resultado para Outubro/2025:**

```
Semana 0 (parcial): 01/10 a 24/10
Semana 1: 25/10 a 31/10
```

**Resultado para Novembro/2025:**

```
Semana 0 (parcial): 01/11 a 24/11
Semana 1: 25/11 a 30/11
```

---

## 💡 **Casos de Uso**

### **📅 Dia do Salário**

Se você recebe salário no dia 5, configure `START_DAY: 5` para que suas semanas comecem quando o dinheiro entra.

### **💳 Fechamento do Cartão**

Se seu cartão fecha no dia 20, configure `START_DAY: 20` para acompanhar melhor os gastos por ciclo.

### **🏠 Dia do Aluguel**

Se paga aluguel no dia 10, configure `START_DAY: 10` para organizar suas finanças a partir desse dia.

---

## ⚠️ **Observações Importantes**

### **1. Meses com menos de 31 dias**

Se você configurar `START_DAY: 31`, em meses com menos dias (como fevereiro):

- O sistema automaticamente ajusta para o **último dia do mês**

### **2. Semana "0" (parcial)**

Quando você configura um dia maior que 1, o sistema cria uma **Semana 0** que vai do dia 1 até o dia anterior ao configurado.

**Exemplo com START_DAY: 13:**

```
Semana 0: 01/10 a 12/10 (dias anteriores ao início configurado)
Semana 1: 13/10 a 19/10 (primeira semana completa)
```

### **3. Última semana**

A última semana sempre vai até o **último dia do mês**, mesmo que não complete 7 dias.

---

## 🔄 **Como funciona tecnicamente**

A lógica implementada:

1. **Define o dia inicial** com base em `START_DAY`
2. **Cria períodos de 7 dias** a partir desse dia
3. **Agrupa as transações** em cada período
4. **Adiciona semana parcial** no início do mês (se necessário)
5. **Ajusta a última semana** para terminar no último dia do mês

---

## 📝 **Exemplos Completos**

### **Cenário: Recebo no dia 15**

```typescript
// src/shared/constants/index.ts
export const FINANCIAL_WEEK_CONFIG = {
  START_DAY: 15
};
```

**Como ficaria Outubro/2025:**

```
┌─────────┬────────────┬─────────────┬─────────┐
│ Semana  │ Período    │ Descrição   │ Dias    │
├─────────┼────────────┼─────────────┼─────────┤
│ Semana 0│ 01 a 14/10 │ Pré-salário │ 14 dias │
│ Semana 1│ 15 a 21/10 │ Pós-salário │ 7 dias  │
│ Semana 2│ 22 a 28/10 │ Meio do mês │ 7 dias  │
│ Semana 3│ 29 a 31/10 │ Fim do mês  │ 3 dias  │
└─────────┴────────────┴─────────────┴─────────┘
```

### **Benefícios:**

- ✅ Semana 1 começa quando o dinheiro entra
- ✅ Fácil de planejar gastos semanais
- ✅ Melhor controle do orçamento

---

## 🆘 **Problemas Comuns**

### **"Não está mudando as semanas"**

➡️ Reinicie o servidor: `Ctrl+C` e depois `yarn dev`

### **"A Semana 0 aparece no dashboard"**

➡️ Isso é normal quando `START_DAY > 1`. Ela representa os dias antes do início configurado.

### **"Quero remover a Semana 0"**

➡️ Configure `START_DAY: 1` para as semanas começarem no primeiro dia do mês.

---

## 🎯 **Recomendações**

**Para a maioria das pessoas:**

- Configure o dia que você recebe seu salário

**Para quem tem cartão de crédito:**

- Configure o dia de fechamento da fatura

**Para organizações:**

- Configure o dia do fechamento contábil

---

**🎉 Agora você tem controle total sobre suas semanas financeiras!**

Qualquer dúvida, consulte este guia ou ajuste conforme necessário.
