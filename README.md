# Solto Studio Marketing Hub — Dra. Celine Lopes

Bem-vindo ao **Solto Studio Marketing Hub**, uma ferramenta local de controle e planejamento estratégico e operacional desenvolvido exclusivamente para a **Dra. Celine Lopes** (CRM-CE 25.970 | Médica). 

Este sistema foi projetado para rodar de forma **100% serverless e local** (diretamente no seu navegador web), sem a necessidade de instalar servidores de backend complexos ou dependências (como Node.js, Python ou bancos de dados locais). Todo o banco de dados é salvo de forma segura no `localStorage` do seu navegador.

---

## 🚀 Como Executar o Hub

Basta abrir o arquivo principal da aplicação no seu navegador:

1. Acesse a pasta do projeto no seu PC:  
   `h:\Meu Drive\Solto Studio\2.Clientes\3.CelineLopes\marketing-hub\`
2. Dê um duplo clique no arquivo **[index.html](file:///h:/Meu%20Drive/Solto%20Studio/2.Clientes/3.CelineLopes/marketing-hub/index.html)** (ou clique com o botão direito e selecione para abrir com Google Chrome, Microsoft Edge, Opera, Safari ou Firefox).
3. Pronto! O painel premium será carregado instantaneamente com seus dados de teste e estratégia.

---

## 🎨 Principais Funcionalidades

### 1. Dashboard Operacional
* Visão geral de métricas: total de posts na fila, posts publicados, posts planejados e roteiros criados com inteligência artificial.
* Posicionamento e alertas éticos atualizados com base na **Resolução CFM nº 2.336/2023**.
* Fila de próximos posts ordenados cronologicamente para fácil controle de postagens.

### 2. Gerador de Plano (Wizard Estratégico)
* Questionário passo a passo onde você responde perguntas fundamentais sobre posicionamento, diferenciais e dores do seu público-alvo (ICP).
* Compilador automático que formata todas as suas respostas em um plano estratégico estruturado em formato **Markdown / Texto**.
* Botões rápidos para **Copiar** o plano ou fazer o **Download** de um arquivo `.md` pronto para arquivamento.

### 3. Calendário Editorial
* Grade de visualização mensal dinâmica que permite planejar o mês com antecedência.
* Diferenciação visual dos posts baseada nos **5 pilares de conteúdo estratégico**:
  * 🔵 *Sintomas Explicados* (ex: Febre, Tosse, IVAS, Lavagem Nasal)
  * 🔴 *Sinais de Alerta* (ex: Respiração rápida, moleza extrema)
  * 🟡 *Mitos e Verdades* (ex: "Catarro verde precisa de antibiótico?")
  * 🟢 *Orientações Práticas* (tutoriais e dicas de rotina)
  * 🟣 *Atendimento / Conversão* (como funciona a consulta da Dra.)
* Filtros dinâmicos por canal (**Instagram**, **Threads**, **TikTok**) e pilar de conteúdo.
* Clique em qualquer célula vazia para adicionar um post novo ou clique em um post existente para editá-lo/removê-lo.

### 4. Editor de Posts
* Formulário com suporte para título, canal, pilar, status (Rascunho, Planejado, Agendado, Publicado), data e hora.
* Controle de gancho duplo (**Gancho A** e **Gancho B**) para você rodar testes A/B na hora de gravar ou publicar.
* Contador dinâmico de caracteres ajustado automaticamente de acordo com as regras de cada rede social (ex: limite de 2200 caracteres no Instagram e 500 caracteres no Threads).
* Campo para ideias de criativo visual / mídia.
* Função para **Duplicar** posts existentes de forma rápida.

### 5. Módulo de Inteligência Artificial (Gerador de Roteiros)
* Conecta seu Hub diretamente a um modelo de IA (Google Gemini ou OpenAI) a partir do seu próprio computador.
* **Templates de Prompt Médicos Otimizados:** O Hub já envia as instruções e as regras de compliance do CFM junto com o tema que você sugerir para que o roteiro gerado seja 100% ético e focado em educação em saúde.
* **Agendamento Direto:** Gostou do roteiro gerado pela IA? Clique em **"Agendar Post"** e ele abrirá o formulário do calendário automaticamente com o roteiro no campo de legenda, facilitando a programação.

### 6. Configurações
* Painel seguro para inserção das chaves de API (API Keys).
* Botão para restaurar dados de demonstração (Demo Data) ou limpar totalmente o banco local.

---

## 🔑 Como Configurar a IA (Chaves de API)

Para usar o gerador de roteiros por IA, você precisará de uma chave de API própria. O uso é cobrado por token, mas é extremamente barato (centavos de centavos de real por geração, e o Gemini muitas vezes possui cotas gratuitas para desenvolvimento).

### Configurando o Google Gemini (Recomendado):
1. Acesse o **[Google AI Studio](https://aistudio.google.com/)** e faça login com sua conta do Google.
2. Clique em **"Get API key"** (Obter chave de API) e crie uma chave em um novo projeto.
3. Copie a chave gerada (ela começa com `AIzaSy...`).
4. Abra o Marketing Hub no navegador, vá na aba **Configurações**, cole no campo **Google Gemini API Key** e clique em **Salvar Chaves**.

### Configurando a OpenAI (GPT):
1. Acesse o portal de desenvolvedores da **[OpenAI Platform](https://platform.openai.com/)**.
2. Crie uma chave de API (ela começa com `sk-...`).
3. Cole no campo correspondente nas **Configurações** do seu Hub e clique em **Salvar Chaves**.

> 🔒 **Privacidade Total:** Suas chaves de API nunca são enviadas para a Solto Studio ou servidores de terceiros. A aplicação faz uma chamada direta (`fetch`) do seu navegador para a API oficial do Google/OpenAI, garantindo segurança absoluta dos seus dados.

---

## 💾 Salvaguarda de Dados (Backup e Importação)

Por segurança e para evitar a perda dos seus posts caso o navegador limpe os dados de navegação ou cache:

* **Exportar Backup:** No rodapé da sidebar esquerda, clique no botão **Exportar**. O navegador fará o download de um arquivo JSON (ex: `solto_hub_backup_AAAA-MM-DD.json`) contendo todos os seus posts, configurações do wizard e credenciais de chaves de API. Guarde esse arquivo em uma pasta segura no seu Google Drive.
* **Importar Backup:** Se você trocar de navegador, usar outro PC ou precisar restaurar seus dados, clique no botão **Importar** na sidebar, selecione o arquivo JSON de backup e o painel carregará todas as suas informações de volta instantaneamente.

---

## ⚖️ Conformidade Médica (Resolução CFM 2.336/2023)

O Hub foi pré-programado para manter sua atuação ética alinhada com as novas diretrizes do CFM:

1. **Assinatura Obrigatória:** Todas as legendas de demonstração e o template do gerador de roteiros de IA assinam automaticamente com:  
   *`Dra. Celine Lopes | Médica | CRM-CE 25.970`*
2. **Posicionamento Geral:** Como profissional graduada em medicina sem RQE (Registro de Qualificação de Especialidade) em Pediatria, você deve evitar se denominar "Pediatra" diretamente no perfil, artes e títulos de criativos. Use termos descritivos de atuação como:  
   * "Consultas médicas focadas na criança"
   * "Acompanhamento da saúde infantil"
   * "Orientação para pais sobre sintomas comuns da infância"
3. **Novas Possibilidades (CFM 2.336/2023):** Você tem direito de mostrar a estrutura do seu consultório, seus equipamentos, publicar valores de consultas de forma clara e compartilhar feedbacks espontâneos de pacientes (desde que de forma moderada, não sensacionalista, e sem expor imagens identificáveis de menores de idade sem autorização expressa dos responsáveis).

---
*Desenvolvido com carinho por **Solto Studio**.*
