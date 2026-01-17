# Design System: ROC Passaporte - Rondônia Oferta Club

## 1. Introdução

Este Design System (DS) estabelece os princípios e padrões visuais para o projeto **ROC Passaporte - Rondônia Oferta Club**. O objetivo é garantir consistência, eficiência e uma experiência de usuário coesa, refletindo os valores de **confiança**, **exclusividade** e **conexão regional**.

## 2. Cores

A paleta de cores foi concebida para evocar a seriedade de um "passaporte" de benefícios (Azul Royal e Dourado) e a conexão com a região de Rondônia (Verde Amazônia).

### Paleta Principal

| Nome | Hex | RGB | Uso Principal |
| :--- | :--- | :--- | :--- |
| **ROC Primary** | `#0056b3` | `rgb(0, 86, 179)` | Ações primárias, botões, cabeçalhos. |
| **ROC Primary Light** | `#337ab7` | `rgb(51, 122, 183)` | Estados de *hover* e elementos secundários. |
| **ROC Primary Dark** | `#003d80` | `rgb(0, 61, 128)` | Estados de *active* e texto sobre fundo primário. |
| **ROC Accent (Gold)** | `#FFD700` | `rgb(255, 215, 0)` | Destaques, selos de oferta, ícones de exclusividade. |
| **ROC Success (Green)** | `#228B22` | `rgb(34, 139, 34)` | Mensagens de sucesso, preços, elementos regionais. |
| **ROC Danger (Red)** | `#dc3545` | `rgb(220, 53, 69)` | Mensagens de erro, ações destrutivas. |

### Paleta Neutra

| Nome | Hex | Uso Principal |
| :--- | :--- | :--- |
| **White** | `#FFFFFF` | Fundos, texto em elementos escuros. |
| **Dark Text** | `#333333` | Texto principal, títulos. |
| **Medium Text** | `#6c757d` | Texto secundário, legendas. |
| **Light Background** | `#F8F9FA` | Fundos de seção, cards. |
| **Border/Divider** | `#dee2e6` | Linhas divisórias, bordas sutis. |

## 3. Tipografia

A família tipográfica escolhida é a **Montserrat**, conhecida por sua excelente legibilidade e estética moderna, funcionando bem em diversas densidades de tela.

- **Família:** Montserrat, *sans-serif*
- **Ícones:** Phosphor Icons

### Escala Tipográfica (Base 16px)

| Elemento | Tamanho (rem) | Tamanho (px) | Peso (Weight) | Uso |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | `3.0rem` | `48px` | Bold (700) | Títulos de página. |
| **H2** | `2.25rem` | `36px` | Bold (700) | Títulos de seção. |
| **H3** | `1.75rem` | `28px` | SemiBold (600) | Subtítulos importantes. |
| **H4** | `1.25rem` | `20px` | SemiBold (600) | Títulos de card/componente. |
| **Body Large** | `1.125rem` | `18px` | Regular (400) | Destaques de texto. |
| **Body Regular** | `1.0rem` | `16px` | Regular (400) | Corpo de texto padrão. |
| **Small Text** | `0.875rem` | `14px` | Regular (400) | Legendas, *tooltips*. |

## 4. Layout e Espaçamento

O sistema de layout utiliza a unidade **rem** para garantir escalabilidade e acessibilidade, e adota um sistema de espaçamento baseado em **8px** para consistência vertical e horizontal.

### Unidades e Escala

| Nome | Valor (px) | Valor (rem) | Uso |
| :--- | :--- | :--- | :--- |
| **Spacing 1** | `4px` | `0.25rem` | Espaçamento mínimo entre elementos inline. |
| **Spacing 2** | `8px` | `0.5rem` | Espaçamento padrão para ícones e texto. |
| **Spacing 3** | `16px` | `1.0rem` | Espaçamento interno (padding) de botões e cards. |
| **Spacing 4** | `24px` | `1.5rem` | Espaçamento entre componentes menores. |
| **Spacing 5** | `32px` | `2.0rem` | Espaçamento entre seções. |
| **Spacing 6** | `48px` | `3.0rem` | Margem de página em mobile. |
| **Spacing 7** | `64px` | `4.0rem` | Margem de página em desktop. |

### Grid

- **Sistema:** 12 colunas.
- **Breakpoints:** Definir para Mobile, Tablet e Desktop.

## 5. Componentes Visuais (Boxes, Shadows e Bordas)

### Boxes (Cards)

Os componentes de caixa (cards) são essenciais para agrupar ofertas e informações.

| Propriedade | Valor Padrão | Uso |
| :--- | :--- | :--- |
| **Background** | `var(--light-background)` (`#F8F9FA`) | Fundo de cards. |
| **Border Radius** | `8px` | Padrão para cards e botões. |
| **Border Radius Large** | `16px` | Para seções ou *modals*. |

### Sombras (Shadows)

As sombras adicionam profundidade e hierarquia visual, indicando interatividade ou elevação.

| Nome | CSS Value | Uso |
| :--- | :--- | :--- |
| **Shadow Soft (Default)** | `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)` | Elevação sutil, cards em estado normal. |
| **Shadow Medium (Hover)** | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` | Elevação ao passar o mouse (*hover*). |
| **Shadow Large (Modal)** | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` | Elementos de alta hierarquia, como *modals* ou *popovers*. |

## 6. Diretrizes de Ícones

Utilizar a biblioteca **Phosphor Icons** para todos os elementos de interface.

- **Estilo Preferencial:** `Regular` ou `Light` para manter a interface leve e moderna.
- **Tamanho Padrão:** `24px` (1.5rem).
- **Cor Padrão:** `var(--dark-text)` ou `var(--roc-primary)` quando em destaque.

## 7. Exemplos de Código (CSS/Tailwind-like)

Para facilitar a implementação, o Design System deve ser traduzido em variáveis CSS e classes de utilidade.

### 7.1. Variáveis de Cores (CSS Custom Properties)

```css
:root {
  /* Cores Primárias e de Ação */
  --color-roc-primary: #0056b3;
  --color-roc-primary-light: #337ab7;
  --color-roc-primary-dark: #003d80;
  --color-roc-accent: #FFD700;
  --color-roc-success: #228B22;
  --color-roc-danger: #dc3545;

  /* Cores Neutras */
  --color-white: #FFFFFF;
  --color-text-dark: #333333;
  --color-text-medium: #6c757d;
  --color-bg-light: #F8F9FA;
  --color-border: #dee2e6;

  /* Tipografia */
  --font-family-primary: 'Montserrat', sans-serif;

  /* Espaçamento (Base 8px) */
  --spacing-1: 0.25rem; /* 4px */
  --spacing-2: 0.5rem;  /* 8px */
  --spacing-3: 1.0rem;  /* 16px */
  --spacing-4: 1.5rem;  /* 24px */
  --spacing-5: 2.0rem;  /* 32px */
  --spacing-6: 3.0rem;  /* 48px */
  --spacing-7: 4.0rem;  /* 64px */
}
```

### 7.2. Classes de Sombras (Utility Classes)

As classes de sombra podem ser aplicadas diretamente aos componentes para dar o efeito de elevação.

| Classe | Descrição | Exemplo de Uso |
| :--- | :--- | :--- |
| `.shadow-soft` | Elevação padrão para cards. | `<div class="card shadow-soft">...</div>` |
| `.shadow-medium` | Elevação em estado de *hover*. | `<button class="btn shadow-medium">...</div>` |
| `.shadow-large` | Elevação para *modals* ou *popovers*. | `<div class="modal shadow-large">...</div>` |

```css
/* Shadow Soft (Default) */
.shadow-soft {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

/* Shadow Medium (Hover) */
.shadow-medium {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Shadow Large (Modal) */
.shadow-large {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
```
