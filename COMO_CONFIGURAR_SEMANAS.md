# 📅 Como Configurar o Início das Semanas Financeiras

Este guia explica como personalizar a forma como as semanas financeiras são calculadas.

---

## 🎯 **O que é isso?**

Você pode configurar de duas formas:

1. **Modo Segunda-feira (RECOMENDADO)**: As semanas sempre começam na segunda-feira e terminam no domingo
2. **Modo Dia Fixo**: As semanas começam em um dia específico do mês

---

## ⚙️ **Como Configurar**

### **Passo 1: Abrir o arquivo de configuração**

Abra o arquivo: `src/shared/constants/index.ts`

### **Passo 2: Localizar a configuração**

Procure por esta seção no final do arquivo:

```typescript
export const FINANCIAL_WEEK_CONFIG = {
  // Modo de cálculo das semanas:
  // 'MONDAY': Semanas sempre começam na segunda-feira (recomendado)
  // 'FIXED_DAY': Semanas começam em um dia fixo do mês
  MODE: 'MONDAY' as 'MONDAY' | 'FIXED_DAY',

  // Dia fixo do mês (usado apenas quando MODE = 'FIXED_DAY')
  START_DAY: 15
};
```

### **Passo 3: Escolher o modo desejado**

#### **Opção A: Usar Segundas-feiras (Recomendado)**

```typescript
export const FINANCIAL_WEEK_CONFIG = {
  MODE: 'MONDAY' as 'MONDAY' | 'FIXED_DAY',
  START_DAY: 15 // Ignorado quando MODE = 'MONDAY'
};
```

#### **Opção B: Usar dia fixo do mês**

```typescript
export const FINANCIAL_WEEK_CONFIG = {
  MODE: 'FIXED_DAY' as 'MONDAY' | 'FIXED_DAY',
  START_DAY: 13 // As semanas começam no dia 13 de cada mês
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

### **Exemplo 1: Modo Segunda-feira (RECOMENDADO)**

```typescript
MODE: 'MONDAY' as 'MONDAY' | 'FIXED_DAY',
```

**Resultado para Outubro/2025:**

Outubro de 2025 começa numa quarta-feira (01/10)

```
Semana 0 (parcial): 01/10 (qua) a 05/10 (dom)
Semana 1: 06/10 (seg) a 12/10 (dom)
Semana 2: 13/10 (seg) a 19/10 (dom)  ← Exemplo: dia 16/10 está aqui
Semana 3: 20/10 (seg) a 26/10 (dom)
Semana 4: 27/10 (seg) a 31/10 (sex)
```

✅ **Vantagens:**

- Sempre previsível (toda segunda começa uma semana)
- Fácil de entender
- Padrão internacional

---

### **Exemplo 2: Modo Dia Fixo - Dia 1**

```typescript
MODE: 'FIXED_DAY' as 'MONDAY' | 'FIXED_DAY',
START_DAY: 1,
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

### **Exemplo 3: Modo Dia Fixo - Dia 13**

```typescript
MODE: 'FIXED_DAY' as 'MONDAY' | 'FIXED_DAY',
START_DAY: 13,
```

**Resultado para Outubro/2025:**

```
Semana 0 (parcial): 01/10 a 12/10
Semana 1: 13/10 a 19/10
Semana 2: 20/10 a 26/10
Semana 3: 27/10 a 31/10
```

---

### **Exemplo 4: Modo Dia Fixo - Dia 5 (útil para quem recebe no dia 5)**

```typescript
MODE: 'FIXED_DAY' as 'MONDAY' | 'FIXED_DAY',
START_DAY: 5,
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

### **Exemplo 5: Modo Dia Fixo - Dia 25 (útil para quem recebe no dia 25)**

```typescript
MODE: 'FIXED_DAY' as 'MONDAY' | 'FIXED_DAY',
START_DAY: 25,
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

### **🌍 Padrão Internacional (Recomendado)**

Use o modo `MONDAY` para seguir o padrão internacional onde as semanas sempre começam na segunda-feira.

### **📅 Dia do Salário**

Se você recebe salário no dia 5, use:

```typescript
MODE: 'FIXED_DAY',
START_DAY: 5
```

### **💳 Fechamento do Cartão**

Se seu cartão fecha no dia 20, use:

```typescript
MODE: 'FIXED_DAY',
START_DAY: 20
```

### **🏠 Dia do Aluguel**

Se paga aluguel no dia 10, use:

```typescript
MODE: 'FIXED_DAY',
START_DAY: 10
```

---

## ⚠️ **Observações Importantes**

### **Modo MONDAY**

- ✅ As semanas sempre começam na **segunda-feira** e terminam no **domingo**
- ✅ Completamente independente do dia do mês
- ✅ Se o mês não começa numa segunda, cria uma semana parcial no início
- ✅ Se o mês não termina num domingo, a última semana é parcial

### **Modo FIXED_DAY**

#### **1. Meses com menos de 31 dias**

Se você configurar `START_DAY: 31`, em meses com menos dias (como fevereiro):

- O sistema automaticamente ajusta para o **último dia do mês**

#### **2. Semana "0" (parcial)**

Quando você configura um dia maior que 1, o sistema cria uma **Semana 0** que vai do dia 1 até o dia anterior ao configurado.

**Exemplo com START_DAY: 13:**

```
Semana 0: 01/10 a 12/10 (dias anteriores ao início configurado)
Semana 1: 13/10 a 19/10 (primeira semana completa)
```

#### **3. Última semana**

A última semana sempre vai até o **último dia do mês**, mesmo que não complete 7 dias.

---

## 🔄 **Como funciona tecnicamente**

### **Modo MONDAY:**

1. **Encontra todas as segundas-feiras do mês**
2. **Cria períodos de segunda a domingo**
3. **Adiciona semana parcial** no início (se o mês não começa na segunda)
4. **Ajusta a última semana** para terminar no último dia do mês

### **Modo FIXED_DAY:**

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
