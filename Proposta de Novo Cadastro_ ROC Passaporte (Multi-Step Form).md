# Proposta de Novo Cadastro: ROC Passaporte (Multi-Step Form)

Dividir o cadastro em etapas reduz a desistência (churn) e torna o processo menos intimidador. Abaixo, descrevo a estrutura de **3 etapas** recomendada para o ROC Passaporte.

## 1. Visão Geral do Fluxo

O formulário deve conter uma **Barra de Progresso** no topo, indicando em qual etapa o usuário está (e.g., "1 de 3: Identificação").

| Etapa | Título | Campos | Objetivo |
| :--- | :--- | :--- | :--- |
| **Etapa 1** | **Identificação** | Nome Completo, CPF, E-mail. | Coletar dados básicos e validar o usuário. |
| **Etapa 2** | **Segurança** | Senha, Confirmação de Senha. | Definir o acesso à conta. |
| **Etapa 3** | **Entrega** | CEP, Rua, Número, Complemento, Bairro, Cidade, Estado. | Coletar dados para o envio do cupom físico. |

---

## 2. Detalhamento das Etapas

### Etapa 1: Identificação
*   **Título:** "Vamos começar seu cadastro"
*   **Subtítulo:** "Preencha seus dados básicos para criar sua conta."
*   **Campos:**
    *   **Nome Completo:** Placeholder "Ex: João Silva".
    *   **CPF:** Com máscara automática (000.000.000-00). *Abaixo do campo, manter o aviso: "Essencial para vincular o passaporte e validação no restaurante."*
    *   **E-mail:** Validação de formato de e-mail em tempo real.
*   **Botão:** "Próximo passo" (Alinhado à direita).

### Etapa 2: Segurança
*   **Título:** "Proteja sua conta"
*   **Subtítulo:** "Crie uma senha segura para acessar seus benefícios."
*   **Campos:**
    *   **Senha:** Mínimo de 6 caracteres. Incluir ícone de "olho" para mostrar/esconder senha.
    *   **Confirmar Senha:** Validação se as senhas coincidem.
*   **Botões:** "Voltar" (Estilo link/secundário) e "Próximo passo" (Primário).

### Etapa 3: Entrega (Novidade)
*   **Título:** "Onde você quer receber seu ROC?"
*   **Subtítulo:** "Precisamos do seu endereço para o envio do material físico."
*   **Aviso de Destaque (Box de Informação):**
    > ℹ️ **Aviso Importante:** Seu endereço será utilizado **exclusivamente** para o envio do seu cupom físico e materiais promocionais do ROC Passaporte.
*   **Campos:**
    *   **CEP:** Busca automática de endereço ao preencher.
    *   **Logradouro (Rua/Avenida):** Preenchimento automático via CEP.
    *   **Número e Complemento:** Campos manuais.
    *   **Bairro, Cidade e Estado:** Preenchimento automático via CEP.
*   **Botão Final:** "Finalizar cadastro e continuar" (Destaque visual).

---

## 3. Protótipo Visual (Mockup de Texto)

```text
+-----------------------------------------------------------+
|                      ROC Passaporte                       |
|                                                           |
|   [==== Passo 3 de 3: Entrega ====] (Barra de Progresso)  |
|                                                           |
|   Onde você quer receber seu ROC?                         |
|   Precisamos do seu endereço para o envio do material.    |
|                                                           |
|   +---------------------------------------------------+   |
|   |  Aviso: Seu endereço será usado apenas para o     |   |
|   |  envio do seu cupom físico.                       |   |
|   +---------------------------------------------------+   |
|                                                           |
|   CEP*                                                    |
|   [ 76800-000           ]                                 |
|                                                           |
|   Endereço*                                               |
|   [ Av. Sete de Setembro                              ]   |
|                                                           |
|   Número*                  Complemento                    |
|   [ 1234      ]            [ Apto 101                 ]   |
|                                                           |
|   Bairro*                                                 |
|   [ Centro                                            ]   |
|                                                           |
|   Cidade*                  Estado*                        |
|   [ Porto Velho       ]    [ RO ]                         |
|                                                           |
|   [ Voltar ]               [ FINALIZAR CADASTRO ]         |
|                                                           |
+-----------------------------------------------------------+
```

## 4. Recomendações de UX (Experiência do Usuário)

1.  **Validação em Tempo Real:** Não espere o usuário clicar em "Próximo" para avisar que o CPF está errado ou que as senhas não coincidem.
2.  **Auto-complete de CEP:** Use uma API (como ViaCEP) para preencher automaticamente a rua, bairro e cidade. Isso reduz drasticamente o erro humano e o tempo de cadastro.
3.  **Micro-interações:** Ao mudar de etapa, use uma transição suave (slide lateral) para dar a sensação de progresso.
4.  **Termos de Uso:** O checkbox de "Aceito os termos" deve estar na primeira ou na última etapa, de forma clara.

Este novo formato remove a barreira de um formulário longo e foca na coleta de dados de forma organizada, garantindo que o usuário entenda o porquê de cada informação solicitada.
