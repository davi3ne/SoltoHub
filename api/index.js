const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const usersFilePath = path.join(process.cwd(), 'users.json');
const projectsDir = path.join(process.cwd(), 'projects');

// Sessões em memória (token -> dados da sessão)
const sessions = {};

// Função para gerar hash de senha (scrypt nativo)
function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) return reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'));
        });
    });
}

// Função para verificar senha (scrypt nativo)
function verifyPassword(password, storedHash) {
    return new Promise((resolve) => {
        if (!storedHash || !storedHash.includes(':')) {
            return resolve(false);
        }
        const [salt, hash] = storedHash.split(':');
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) return resolve(false);
            resolve(derivedKey.toString('hex') === hash);
        });
    });
}

// Inicializa diretório de projetos
if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir);
}

// ====================================================
// MIGRACÃO AUTOMÁTICA DE DADOS (BOOT)
// ====================================================
const defaultProjectDir = path.join(projectsDir, 'celine-lopes');
const defaultProjectMediaDir = path.join(defaultProjectDir, 'media');

if (!fs.existsSync(defaultProjectDir)) {
    fs.mkdirSync(defaultProjectDir);
}
if (!fs.existsSync(defaultProjectMediaDir)) {
    fs.mkdirSync(defaultProjectMediaDir);
}

// 1. Mover data.json da raiz para o projeto celine-lopes
const oldStatePath = path.join(process.cwd(), 'data.json');
const newStatePath = path.join(defaultProjectDir, 'data.json');
if (fs.existsSync(oldStatePath) && !fs.existsSync(newStatePath)) {
    console.log("MIGRATION: Movendo data.json da raiz para o projeto celine-lopes...");
    fs.renameSync(oldStatePath, newStatePath);
}

// 2. Mover arquivos da pasta media/ da raiz para projects/celine-lopes/media/
const oldMediaDir = path.join(process.cwd(), 'media');
if (fs.existsSync(oldMediaDir)) {
    try {
        const files = fs.readdirSync(oldMediaDir);
        files.forEach(file => {
            const oldFile = path.join(oldMediaDir, file);
            const newFile = path.join(defaultProjectMediaDir, file);
            if (fs.statSync(oldFile).isFile()) {
                console.log(`MIGRATION: Movendo media/${file} para projects/celine-lopes/media/...`);
                fs.renameSync(oldFile, newFile);
            }
        });
        fs.rmdirSync(oldMediaDir);
        console.log("MIGRATION: Pasta media/ antiga removida com sucesso.");
    } catch (e) {
        console.error("MIGRATION WARNING: Erro ao migrar pasta media antiga:", e.message);
    }
}

// ====================================================
// MIME TYPES E AUTH HELPERS
// ====================================================
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm'
};

function getSession(req) {
    // Tentar ler do Header Authorization
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        if (sessions[token]) return { token, ...sessions[token] };
    }

    // Tentar ler do Cookie session_token
    const cookieHeader = req.headers['cookie'];
    if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce((acc, c) => {
            const [name, val] = c.trim().split('=');
            if (name && val) acc[name] = val;
            return acc;
        }, {});
        const token = cookies['session_token'];
        if (token && sessions[token]) return { token, ...sessions[token] };
    }

    return null;
}

function hasProjectAccess(session, projectId) {
    if (!session) return false;
    if (session.role === 'admin') return true;
    return session.projects && session.projects.includes(projectId);
}

// Helper para ler JSON da request
function readJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                reject(new Error('JSON Inválido'));
            }
        });
    });
}

// ====================================================
// SERVER LOGIC
// ====================================================
const server = http.createServer(async (req, res) => {
    const urlPath = req.url.split('?')[0];

    // ------------------------------------------------
    // API: LOGIN
    // ------------------------------------------------
    if (req.method === 'POST' && urlPath === '/api/login') {
        try {
            const { username, password } = await readJsonBody(req);
            if (!username || !password) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Usuário e senha são obrigatórios' }));
            }

            if (!fs.existsSync(usersFilePath)) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Banco de dados de usuários ausente' }));
            }

            const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
            const user = usersData.users.find(u => u.username === username);

            if (user && await verifyPassword(password, user.passwordHash)) {
                const token = crypto.randomUUID();
                sessions[token] = {
                    id: user.id,
                    username: user.username,
                    displayName: user.displayName,
                    role: user.role,
                    projects: user.projects
                };

                // Define cookie seguro HTTPOnly
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Set-Cookie': `session_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
                });
                return res.end(JSON.stringify({
                    success: true,
                    token,
                    user: {
                        username: user.username,
                        displayName: user.displayName,
                        role: user.role,
                        projects: user.projects
                    }
                }));
            }

            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Usuário ou senha incorretos' }));
        } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Erro no servidor: ' + e.message }));
        }
    }

    // ------------------------------------------------
    // API: LOGOUT
    // ------------------------------------------------
    if (req.method === 'POST' && urlPath === '/api/logout') {
        const session = getSession(req);
        if (session) {
            delete sessions[session.token];
        }
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Set-Cookie': 'session_token=; Path=/; HttpOnly; Max-Age=0'
        });
        return res.end(JSON.stringify({ success: true }));
    }

    // ------------------------------------------------
    // API: GET /api/me
    // ------------------------------------------------
    if (req.method === 'GET' && urlPath === '/api/me') {
        const session = getSession(req);
        if (!session) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Não autenticado' }));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ user: session }));
    }

    // ------------------------------------------------
    // API: POST /api/me/settings
    // ------------------------------------------------
    if (req.method === 'POST' && urlPath === '/api/me/settings') {
        const session = getSession(req);
        if (!session) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Não autenticado' }));
        }

        try {
            const { displayName, currentPassword, newPassword } = await readJsonBody(req);

            if (!fs.existsSync(usersFilePath)) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Banco de dados de usuários ausente' }));
            }

            const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
            const userIndex = usersData.users.findIndex(u => u.id === session.id);

            if (userIndex === -1) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Usuário não encontrado' }));
            }

            const user = usersData.users[userIndex];

            // Se for mudar a senha
            if (newPassword) {
                if (!currentPassword) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Senha atual é obrigatória para definir uma nova' }));
                }

                const isPasswordValid = await verifyPassword(currentPassword, user.passwordHash);
                if (!isPasswordValid) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Senha atual incorreta' }));
                }

                if (newPassword.length < 6) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'A nova senha deve ter no mínimo 6 caracteres' }));
                }

                user.passwordHash = await hashPassword(newPassword);
            }

            // Atualiza display name se fornecido
            if (displayName) {
                user.displayName = displayName;
                // Atualiza também na sessão ativa
                if (sessions[session.token]) {
                    sessions[session.token].displayName = displayName;
                }
            }

            fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: true,
                user: {
                    username: user.username,
                    displayName: user.displayName,
                    role: user.role,
                    projects: user.projects
                }
            }));
        } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Erro ao salvar configurações da conta: ' + e.message }));
        }
    }

    // ------------------------------------------------
    // API: POST /api/generate
    // ------------------------------------------------
    if (req.method === 'POST' && urlPath === '/api/generate') {
        const session = getSession(req);
        if (!session) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Não autenticado' }));
        }

        try {
            const { model, prompt, clientKey } = await readJsonBody(req);
            if (!model || !prompt) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Modelo e Prompt são obrigatórios' }));
            }

            let responseText = "";
            if (model.includes("gemini")) {
                const apiKey = process.env.GEMINI_API_KEY || clientKey;
                if (!apiKey) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Chave de API do Gemini não configurada no servidor' }));
                }

                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
                const payload = {
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
                    safetySettings: [
                        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
                    ]
                };

                const apiRes = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!apiRes.ok) {
                    const err = await apiRes.json();
                    throw new Error(err.error?.message || "Erro na API do Gemini");
                }

                const data = await apiRes.json();
                responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Nenhum texto retornado.";
            } else {
                const apiKey = process.env.OPENAI_API_KEY || clientKey;
                if (!apiKey) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Chave de API do OpenAI não configurada no servidor' }));
                }

                const url = "https://api.openai.com/v1/chat/completions";
                const payload = {
                    model: model,
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7,
                    max_tokens: 4096
                };

                const apiRes = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify(payload)
                });

                if (!apiRes.ok) {
                    const err = await apiRes.json();
                    throw new Error(err.error?.message || "Erro na API do OpenAI");
                }

                const data = await apiRes.json();
                responseText = data.choices?.[0]?.message?.content || "Nenhum texto retornado.";
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: true, text: responseText }));
        } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Erro ao gerar conteúdo: ' + e.message }));
        }
    }

    // ====================================================
    // VERIFICACÃO GERAL DE AUTH DAQUI EM DIANTE
    // ====================================================
    const session = getSession(req);

    // Regexes de API de Projeto
    const projectStateRegex = /^\/api\/projects\/([a-zA-Z0-9_-]+)\/state$/;
    const projectUploadRegex = /^\/api\/projects\/([a-zA-Z0-9_-]+)\/upload$/;
    const projectSettingsRegex = /^\/api\/projects\/([a-zA-Z0-9_-]+)\/settings$/;

    // ------------------------------------------------
    // API: PROJETO STATE (GET / POST)
    // ------------------------------------------------
    const stateMatch = urlPath.match(projectStateRegex);
    if (stateMatch) {
        const projectId = stateMatch[1];
        if (!session) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Não autenticado' }));
        }
        if (!hasProjectAccess(session, projectId)) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Acesso negado a este projeto' }));
        }

        const projectPath = path.join(projectsDir, projectId);
        const dataPath = path.join(projectPath, 'data.json');

        if (req.method === 'GET') {
            if (fs.existsSync(dataPath)) {
                try {
                    const data = fs.readFileSync(dataPath, 'utf8');
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(data);
                } catch (e) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Erro ao ler dados do projeto' }));
                }
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ posts: [], pautas: [] }));
        }

        if (req.method === 'POST') {
            try {
                const body = await readJsonBody(req);
                if (!fs.existsSync(projectPath)) {
                    fs.mkdirSync(projectPath, { recursive: true });
                }
                fs.writeFileSync(dataPath, JSON.stringify(body, null, 2), 'utf8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true }));
            } catch (e) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Erro ao salvar dados do projeto: ' + e.message }));
            }
        }
    }

    // ------------------------------------------------
    // API: PROJETO UPLOAD (POST)
    // ------------------------------------------------
    const uploadMatch = urlPath.match(projectUploadRegex);
    if (req.method === 'POST' && uploadMatch) {
        const projectId = uploadMatch[1];
        if (!session) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Não autenticado' }));
        }
        if (!hasProjectAccess(session, projectId)) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Acesso negado a este projeto' }));
        }

        const projectPath = path.join(projectsDir, projectId);
        const projectMediaDir = path.join(projectPath, 'media');

        if (!fs.existsSync(projectMediaDir)) {
            fs.mkdirSync(projectMediaDir, { recursive: true });
        }

        const contentType = req.headers['content-type'];
        if (!contentType || !contentType.includes('boundary=')) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Mime type inválido' }));
        }

        const boundaryMatch = contentType.match(/boundary=(.+)$/);
        if (!boundaryMatch) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Boundary não encontrada' }));
        }
        const boundary = '--' + boundaryMatch[1];

        let chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
            try {
                const bodyBuffer = Buffer.concat(chunks);
                const boundaryIndex = bodyBuffer.indexOf(boundary);
                if (boundaryIndex === -1) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Form data inválido' }));
                }

                const start = boundaryIndex + boundary.length + 2;
                const headerEndIndex = bodyBuffer.indexOf('\r\n\r\n', start);
                if (headerEndIndex === -1) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Form headers não encontrados' }));
                }

                const headersText = bodyBuffer.slice(start, headerEndIndex).toString('utf8');
                const filenameMatch = headersText.match(/filename="(.+?)"/);
                const contentTypeMatch = headersText.match(/Content-Type:\s*(.+)/i);

                if (!filenameMatch) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Nenhum arquivo enviado no formulário' }));
                }

                const originalFilename = filenameMatch[1];
                const fileMimeType = contentTypeMatch ? contentTypeMatch[1].trim() : 'application/octet-stream';

                const fileDataStart = headerEndIndex + 4;
                const nextBoundaryIndex = bodyBuffer.indexOf('\r\n' + boundary, fileDataStart);
                if (nextBoundaryIndex === -1) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Fim do arquivo não encontrado' }));
                }

                const fileData = bodyBuffer.slice(fileDataStart, nextBoundaryIndex);

                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = path.extname(originalFilename);
                const name = path.basename(originalFilename, ext).replace(/\s+/g, '_');
                const filename = `${name}_${uniqueSuffix}${ext}`;
                const filePath = path.join(projectMediaDir, filename);

                fs.writeFileSync(filePath, fileData);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    url: `projects/${projectId}/media/${filename}`,
                    filename: filename,
                    type: fileMimeType.startsWith('video/') ? 'video' : 'image'
                }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Erro interno ao salvar arquivo: ' + err.message }));
            }
        });
        return;
    }

    // ------------------------------------------------
    // API: PROJETO SETTINGS (GET / POST)
    // ------------------------------------------------
    const settingsMatch = urlPath.match(projectSettingsRegex);
    if (settingsMatch) {
        const projectId = settingsMatch[1];
        if (!session) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Não autenticado' }));
        }
        if (!hasProjectAccess(session, projectId)) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Acesso negado a este projeto' }));
        }

        if (req.method === 'GET') {
            if (!fs.existsSync(usersFilePath)) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Banco de dados de usuários ausente' }));
            }
            const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
            const proj = usersData.projects.find(p => p.id === projectId);
            if (!proj) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Projeto não encontrado' }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ project: proj }));
        }

        if (req.method === 'POST') {
            try {
                const { name, description, icon, color, logoUrl } = await readJsonBody(req);
                if (!name) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Nome do projeto é obrigatório' }));
                }

                if (!fs.existsSync(usersFilePath)) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Banco de dados de usuários ausente' }));
                }

                const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
                const projIndex = usersData.projects.findIndex(p => p.id === projectId);
                if (projIndex === -1) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Projeto não encontrado' }));
                }

                const proj = usersData.projects[projIndex];
                proj.name = name;
                proj.description = description || '';
                proj.icon = icon || 'fa-solid fa-cube';
                proj.color = color || '#dc2626';
                if (logoUrl !== undefined) {
                    proj.logoUrl = logoUrl;
                }

                fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, project: proj }));
            } catch (e) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Erro ao salvar configurações do projeto: ' + e.message }));
            }
        }
        return;
    }

    // ------------------------------------------------
    // API: ADMIN ENDPOINTS
    // ------------------------------------------------
    if (urlPath.startsWith('/api/admin/')) {
        if (!session) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Não autenticado' }));
        }
        if (session.role !== 'admin') {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Acesso restrito a administradores' }));
        }

        // GET /api/admin/projects
        if (req.method === 'GET' && urlPath === '/api/admin/projects') {
            const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ projects: usersData.projects || [] }));
        }

        // POST /api/admin/projects
        if (req.method === 'POST' && urlPath === '/api/admin/projects') {
            try {
                const project = await readJsonBody(req);
                if (!project.id || !project.name) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'ID e Nome do projeto são obrigatórios' }));
                }

                const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
                if (usersData.projects.some(p => p.id === project.id)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Projeto com este ID já existe' }));
                }

                project.createdAt = new Date().toISOString().split('T')[0];
                usersData.projects.push(project);
                fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');

                // Inicializar diretórios do novo projeto
                const projectPath = path.join(projectsDir, project.id);
                const projectMedia = path.join(projectPath, 'media');
                if (!fs.existsSync(projectMedia)) {
                    fs.mkdirSync(projectMedia, { recursive: true });
                }
                const dataPath = path.join(projectPath, 'data.json');
                if (!fs.existsSync(dataPath)) {
                    fs.writeFileSync(dataPath, JSON.stringify({ posts: [], pautas: [] }, null, 2), 'utf8');
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, project }));
            } catch (e) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Erro ao criar projeto: ' + e.message }));
            }
        }

        // DELETE /api/admin/projects/:id
        if (req.method === 'DELETE' && urlPath.startsWith('/api/admin/projects/')) {
            const projectId = urlPath.substring('/api/admin/projects/'.length);
            if (!projectId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'ID do projeto não informado' }));
            }

            const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
            const initialLen = usersData.projects.length;
            usersData.projects = usersData.projects.filter(p => p.id !== projectId);

            if (usersData.projects.length === initialLen) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Projeto não encontrado' }));
            }

            fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: true }));
        }

        // GET /api/admin/users
        if (req.method === 'GET' && urlPath === '/api/admin/users') {
            const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
            // Remove hashes de senha antes de retornar
            const sanitizedUsers = usersData.users.map(u => {
                const { passwordHash, ...rest } = u;
                return rest;
            });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ users: sanitizedUsers }));
        }

        // POST /api/admin/users
        if (req.method === 'POST' && urlPath === '/api/admin/users') {
            try {
                const newUser = await readJsonBody(req);
                if (!newUser.username || !newUser.password || !newUser.displayName || !newUser.role) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Username, password, displayName e role são obrigatórios' }));
                }

                const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
                if (usersData.users.some(u => u.username === newUser.username)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Usuário já existe' }));
                }

                const hash = await hashPassword(newUser.password);
                const userObj = {
                    id: 'user-' + Date.now(),
                    username: newUser.username,
                    displayName: newUser.displayName,
                    passwordHash: hash,
                    role: newUser.role,
                    projects: newUser.projects || []
                };

                usersData.users.push(userObj);
                fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');

                const { passwordHash, ...sanitized } = userObj;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, user: sanitized }));
            } catch (e) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Erro ao criar usuário: ' + e.message }));
            }
        }

        // DELETE /api/admin/users/:id
        if (req.method === 'DELETE' && urlPath.startsWith('/api/admin/users/')) {
            const userId = urlPath.substring('/api/admin/users/'.length);
            if (!userId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'ID do usuário não informado' }));
            }

            const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
            const initialLen = usersData.users.length;
            usersData.users = usersData.users.filter(u => u.id !== userId);

            if (usersData.users.length === initialLen) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Usuário não encontrado' }));
            }

            fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ success: true }));
        }

        // POST /api/admin/users/update/:id
        if (req.method === 'POST' && urlPath.startsWith('/api/admin/users/update/')) {
            const userId = urlPath.substring('/api/admin/users/update/'.length);
            if (!userId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'ID do usuário não informado' }));
            }

            try {
                const { username, password, displayName, role, projects } = await readJsonBody(req);
                if (!username || !displayName || !role) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Username, displayName e role são obrigatórios' }));
                }

                const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
                const userIndex = usersData.users.findIndex(u => u.id === userId);

                if (userIndex === -1) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Usuário não encontrado' }));
                }

                const user = usersData.users[userIndex];
                
                // Valida se o username mudou e se já existe outro com o mesmo
                if (user.username !== username && usersData.users.some(u => u.username === username && u.id !== userId)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Username já está em uso por outro usuário' }));
                }

                user.username = username;
                user.displayName = displayName;
                user.role = role;
                user.projects = projects || [];

                if (password) {
                    if (password.length < 6) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ error: 'A nova senha deve ter no mínimo 6 caracteres' }));
                    }
                    user.passwordHash = await hashPassword(password);
                }

                fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');

                const { passwordHash, ...sanitized } = user;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: true, user: sanitized }));
            } catch (e) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Erro ao editar usuário: ' + e.message }));
            }
        }
    }

    // Roteamento dinâmico para supabase-config.js (injetando variáveis de ambiente se configuradas)
    if (urlPath === '/supabase-config.js') {
        const supabaseUrl = process.env.SUPABASE_URL || '';
        const supabaseKey = process.env.SUPABASE_KEY || '';
        const supabaseBucket = process.env.SUPABASE_BUCKET || 'media';
        const configContent = `
// supabase-config.js gerado dinamicamente pelo servidor
window.SUPABASE_CONFIG = {
    supabaseUrl: "${supabaseUrl}" || localStorage.getItem('hub_supabase_url') || "",
    supabaseKey: "${supabaseKey}" || localStorage.getItem('hub_supabase_key') || "",
    supabaseBucket: "${supabaseBucket}" || localStorage.getItem('hub_supabase_bucket') || "media"
};
`;
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        return res.end(configContent);
    }

    // ------------------------------------------------
    // SERVIDOR DE ARQUIVOS ESTÁTICOS
    // ------------------------------------------------
    let reqPath = req.url === '/' ? '/index.html' : req.url;
    reqPath = reqPath.split('?')[0].split('#')[0];

    const isHtmlFile = reqPath.endsWith('.html') || req.url === '/';

    // Roteamento especial de páginas com login check
    if (isHtmlFile) {
        if (reqPath === '/login.html') {
            // Se já estiver logado, redireciona para dashboard/hub
            if (session) {
                if (session.role === 'admin') {
                    res.writeHead(302, { 'Location': '/admin.html' });
                } else {
                    const firstProj = session.projects && session.projects[0];
                    res.writeHead(302, { 'Location': `/index.html${firstProj ? '?project=' + firstProj : ''}` });
                }
                return res.end();
            }
        } else {
            // Se NÃO estiver logado, manda para /login.html
            if (!session) {
                res.writeHead(302, { 'Location': '/login.html' });
                return res.end();
            }

            // Se for admin.html e não for admin, volta para index.html
            if (reqPath === '/admin.html' && session.role !== 'admin') {
                const firstProj = session.projects && session.projects[0];
                res.writeHead(302, { 'Location': `/index.html${firstProj ? '?project=' + firstProj : ''}` });
                return res.end();
            }
        }
    }

    // Resolve o caminho absoluto do arquivo
    const filePath = path.join(process.cwd(), reqPath);

    // Validação básica de segurança de path traversal
    if (!filePath.startsWith(process.cwd())) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Acesso proibido');
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('Página não encontrada');
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
    });
});

if (process.env.VERCEL) {
    module.exports = server;
} else {
    server.listen(PORT, '0.0.0.0', () => {
        console.log(`===================================================`);
        console.log(` Solto Studio Marketing Hub Server Active (No-Dep) `);
        console.log(`---------------------------------------------------`);
        console.log(` Running locally:   http://localhost:${PORT}        `);
        console.log(` Exposing on IP:    http://0.0.0.0:${PORT}          `);
        console.log(`===================================================`);
    });
}
