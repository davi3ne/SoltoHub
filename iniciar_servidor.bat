@echo off
title Solto Studio Marketing Hub - Inicializador
color 05
echo ===================================================
echo  Solto Studio Marketing Hub - Inicializando...
echo ===================================================
echo.
cd /d "H:\Meu Drive\Solto Studio\2.Clientes\3.CelineLopes\marketing-hub"

echo [+] Iniciando Servidor Local Node.js...
start "Marketing Hub Server" cmd /k "node server.js"

echo [+] Aguardando 2 segundos para inicializacao do servidor...
timeout /t 2 /nobreak > nul

echo [+] Iniciando Tunel Web (localtunnel com auto-retry)...
start "Localtunnel celine-lopes-hub" cmd /k "node tunnel.js"

echo.
echo ===================================================
echo  Servidores iniciados em janelas separadas!
echo  Acesse localmente em: http://localhost:3000
echo  URL Publica esperada: https://celine-lopes-hub.loca.lt
echo ===================================================
timeout /t 5
