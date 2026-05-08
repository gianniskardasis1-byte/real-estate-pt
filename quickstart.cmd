@echo off
setlocal

set "ROOT=%~dp0"

echo Starting backend and frontend in separate terminals...

start "Backend - npm start" cmd /k "cd /d "%ROOT%" & npm start"
start "Frontend - npm run dev" cmd /k "cd /d "%ROOT%client" & npm run dev"

echo Done. Check the two new terminal windows.
endlocal
