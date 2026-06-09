const { spawn } = require('child_process');

const PORT = 3000;
const SUBDOMAIN = 'celine-lopes-hub';

function startTunnel() {
    console.log(`[Tunnel] Solicitando subdominio: ${SUBDOMAIN}...`);
    
    // Inicia o localtunnel via npx com o subdominio desejado
    const lt = spawn('npx', ['localtunnel', '--port', PORT.toString(), '--subdomain', SUBDOMAIN], {
        shell: true
    });

    let urlDetected = false;
    let killed = false;

    lt.stdout.on('data', (data) => {
        const output = data.toString().trim();
        console.log(output);

        if (output.toLowerCase().includes('your url is:')) {
            urlDetected = true;
            if (output.toLowerCase().includes(SUBDOMAIN)) {
                console.log(`\n===================================================`);
                console.log(` Sucesso! Seu tunel esta ativo e fixado em:`);
                console.log(` https://${SUBDOMAIN}.loca.lt`);
                console.log(`===================================================\n`);
            } else {
                console.log(`\n[Tunnel] O subdominio "${SUBDOMAIN}" ainda esta ocupado no servidor do localtunnel.`);
                console.log(`[Tunnel] O servidor atribuiu uma URL aleatoria temporaria.`);
                console.log(`[Tunnel] Tentando novamente em 6 segundos para obter o subdominio correto...\n`);
                killed = true;
                lt.kill('SIGINT');
                setTimeout(startTunnel, 6000);
            }
        }
    });

    lt.stderr.on('data', (data) => {
        const errText = data.toString().trim();
        if (errText) {
            console.error(`[Tunnel Info/Error] ${errText}`);
        }
    });

    lt.on('close', (code) => {
        if (!urlDetected && !killed) {
            console.log(`[Tunnel] Conexao encerrada (codigo ${code}). Tentando novamente em 6 segundos...`);
            setTimeout(startTunnel, 6000);
        }
    });
}

startTunnel();
