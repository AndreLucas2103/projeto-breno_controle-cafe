# Controle de Café ☕

Sistema para controle de presença e consumo de café da empresa.

## ✨ Funcionalidades

- **Grade Semanal**: Visualização da programação de café para cada dia e período
- **Seleção de Pessoas**: Interface intuitiva para marcar presença por andar (Cima/Baixo)
- **Configuração de Sábado**: Sistema especial para configurar quantas pessoas de cada andar participarão
- **Relatório de Consumo**: Visualização detalhada do consumo por dia e totais
- **Tema Claro/Escuro**: Interface adaptável com alternância de temas
- **💾 Persistência Local**: Todos os dados são salvos automaticamente no localStorage do navegador
- **🗑️ Limpeza de Dados**: Opção para limpar todos os dados salvos com confirmação

## 🏗️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **Vite** para bundling e desenvolvimento
- **Tailwind CSS** para estilização
- **Radix UI** para componentes acessíveis
- **Lucide React** para ícones
- **Wouter** para roteamento
- **TanStack Query** para gerenciamento de estado
- **Zod** para validação de esquemas

## 📱 Como Usar

1. **Marcar Presença**:

   - Clique em qualquer período da grade semanal
   - Selecione as pessoas que irão consumir café naquele período
   - Os dados são salvos automaticamente

2. **Configurar Sábado**:

   - Clique na célula "Sábado"
   - Configure quantas pessoas de cada andar participarão
   - Sistema de escala automática

3. **Ver Relatório**:

   - Clique no botão "Ver Relatório" no cabeçalho
   - Visualize o consumo detalhado por dia e totais

4. **Limpar Dados**:
   - Clique no botão "Limpar Dados" no cabeçalho
   - Confirme a ação no diálogo de confirmação

## 🔧 Desenvolvimento

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone [url-do-repositorio]

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 💾 Armazenamento Local

O sistema utiliza localStorage para persistir:

- **controle-cafe-attendance**: Dados de presença por dia/período
- **controle-cafe-saturday**: Configurações de sábado
- **controle-cafe-show-report**: Estado de exibição do relatório
- **controle-cafe-welcome-seen**: Flag para mensagem de boas-vindas

Os dados são automaticamente serializados/deserializados e permanecem salvos entre sessões do navegador.

## 🎨 Interface

- **Design Responsivo**: Funciona em desktop, tablet e mobile
- **Tema Adaptável**: Suporte nativo para temas claro e escuro
- **Feedback Visual**: Toasts informativos para todas as ações
- **Confirmações**: Diálogos de confirmação para ações destrutivas

## 📋 Cardápio Semanal

- **Segunda**: Manhã - Pão de queijo G | Tarde - Forrozinho de coco
- **Terça**: Manhã - Pão de queijo G | Tarde - Pão de queijo médio c/ presunto
- **Quarta**: Manhã - Pão de queijo G | Tarde - Forrozinho de coco
- **Quinta**: Manhã - Pão de queijo G | Tarde - Salgado
- **Sexta**: Manhã - Pão de queijo G | Tarde - Pão de queijo médio c/ presunto
- **Sábado**: Por escala configurável

## 📝 Estrutura de Dados

### Pessoas por Andar

- **Andar de Cima**: 19 pessoas
- **Andar de Baixo**: 15 pessoas

### Esquema de Dados

```typescript
type WeekDay = "Segunda" | "Terça" | "Quarta" | "Quinta" | "Sexta" | "Sábado";
type Period = "Manhã" | "Tarde";
type SaturdayConfig = { andarCima: number; andarBaixo: number };
```

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
