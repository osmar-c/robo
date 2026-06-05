/**
 * MODULE: GITHUB SYNC CONTEXT
 * Permite que a IA se conecte à API do GitHub para gerenciar o repositório.
 */

const GitHubSync = {
    token: "",
    owner: "", // Seu usuário do GitHub
    repo: "",  // Nome do repositório do robô
    branch: "main",

    // Inicializa as credenciais de forma segura pós-autenticação biométrica
    configurarConexao(token, owner, repo) {
        this.token = token;
        this.owner = owner;
        this.repo = repo;
        console.log("🛰️ [GitHub Sync]: Conexão estabelecida com o repositório do robô.");
    },

    // Função autônoma para a IA buscar a versão mais recente do código
    async obterArquivoDoRepositorio(path) {
        const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}?ref=${this.branch}`;
        
        try {
            const response = await fetch(url, {
                headers: {
                    "Authorization": `token ${this.token}`,
                    "Accept": "application/vnd.github.v3+json"
                }
            });
            const data = await response.json();
            // O GitHub retorna o conteúdo em Base64, precisamos decodificar
            const conteudoDecodificado = decodeURIComponent(atob(data.content).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            return {
                sha: data.sha,
                content: conteudoDecodificado
            };
        } catch (error) {
            console.error(`❌ Erro ao ler ${path} no GitHub:`, error);
            return null;
        }
    },

    // Função autônoma para a IA salvar alterações/posts direto no GitHub (Commit)
    async atualizarArquivoNoRepositorio(path, novoConteudo, mensagemCommit, shaAnterior = null) {
        const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
        
        // Se não passarmos o SHA anterior, precisamos buscar para não dar conflito
        let sha = shaAnterior;
        if (!sha) {
            const arquivoAtual = await this.obterArquivoDoRepositorio(path);
            if (arquivoAtual) sha = arquivoAtual.sha;
        }

        const body = {
            message: mensagemCommit,
            content: btoa(unescape(encodeURIComponent(novoConteudo))), // Codifica para Base64
            branch: this.branch
        };

        if (sha) body.sha = sha; // Necessário se o arquivo já existir

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Authorization": `token ${this.token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/vnd.github.v3+json"
                },
                body: JSON.stringify(body)
            });
            
            if (response.ok) {
                console.log(`✅ [GitHub Sync]: Sincronização realizada com sucesso: ${path}`);
                return true;
            }
            return false;
        } catch (error) {
            console.error("❌ Erro ao commitar no GitHub:", error);
            return false;
        }
    }
};

if (typeof module !== 'undefined') {
    module.exports = GitHubSync;
}
