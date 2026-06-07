# 🛡️ DIRETRIZES DE MANUTENÇÃO - NEUROSE AUTÔNOMA APK

Este repositório contém a infraestrutura mãe da aplicação unificada para a plataforma Blogger. Para garantir a estabilidade do ecossistema e evitar quebras de código ou regressão de recursos, qualquer IA que trabalhar neste projeto deve seguir as regras estritas abaixo.

## 🛑 REGRAS CRÍTICAS DE NÃO-ALTERAÇÃO

1. **PROIBIDO Unificar ou Remover Tags de Bloco:** O arquivo `iaapk.html` é dividido estritamente usando comentários estruturados (`[BLOCO_01_CSS]`, `[BLOCO_02_CLASS]`, `[BLOCO_03_BIO]`, etc.). NUNCA aglutine ou delete estas divisões.
2. **PROIBIDO Adicionar Botões Duplicados:** A navegação por abas e o controle de segurança utilizam injeção de estado dinâmico na mesma janela gráfica. Não crie botões extras no cabeçalho ou no escopo global para funções que já existem nas sidebars.
3. **Preservação de Contexto Local:** Os motores de Gamificação e IA dependem das propriedades `this.points` e `this.vocabularioIA` persistidas sob a chave exclusiva `${this.instanceId}` no `localStorage`. Não altere a nomenclatura das chaves de persistência.

## 🛠️ ESTRUTURA DOS BLOCOS MARCADORES

Ao reescrever ou atualizar uma funcionalidade, substitua **APENAS** o conteúdo interno do bloco correspondente:

* `[BLOCO_01_CSS]`: Toda a folha de estilo responsiva mobile-first do aplicativo.
* `[BLOCO_02_CLASS]`: A estrutura de inicialização e as rotas lógicas das telas.
* `[BLOCO_03_BIO]`: Chamadas nativas de hardware via API WebAuthn e o algoritmo de fallback do Touch Timer (retenção de 1.6s).
* `[BLOCO_04_GAMIFICATION]`: Gerenciamento e atualização visual imediata de pontuação do Admin.
* `[BLOCO_05_IA_ENGINE]`: Escuta ativa, alimentação de strings brutas (editais) e banco de dados de vocabulário local.

## 🚀 FLUXO DE DEPLOY NO BLOGGER
* O código gerado deve se manter autônomo, sem requisições de scripts externos ou bibliotecas de terceiros (como jQuery ou Bootstrap), evitando conflitos com os widgets padrão do Blogger e scripts do Google AdSense.
