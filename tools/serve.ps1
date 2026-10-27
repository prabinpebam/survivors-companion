# Keeps the two local servers running: the documentation reader on http://127.0.0.1:8080/ and the
# prototype app (Vite, hot reload) on http://127.0.0.1:5173/. A server that is already answering is
# left alone. With -Watch it checks every 30 seconds and restarts whichever has stopped.
#
#   pwsh -File tools/serve.ps1            start what is missing, then exit
#   pwsh -File tools/serve.ps1 -Watch     keep both running (used by the sign-in entry)
param([switch]$Watch)

$root = Split-Path -Parent $PSScriptRoot
$logs = Join-Path $env:TEMP 'survivors-companion'
New-Item -ItemType Directory -Force -Path $logs | Out-Null

function Test-Port([int]$port) {
  $c = New-Object Net.Sockets.TcpClient
  try { $c.ConnectAsync('127.0.0.1', $port).Wait(1000) -and $c.Connected } catch { $false } finally { $c.Dispose() }
}

function Start-Missing {
  if (-not (Test-Port 8080)) {
    Start-Process -WindowStyle Hidden -WorkingDirectory $root -FilePath 'python' `
      -ArgumentList '-m', 'http.server', '8080', '--bind', '127.0.0.1', '--directory', 'docs' `
      -RedirectStandardOutput (Join-Path $logs 'docs.out.log') -RedirectStandardError (Join-Path $logs 'docs.err.log')
    "$(Get-Date -Format s) started the documentation reader on 8080"
  }
  if (-not (Test-Port 5173)) {
    Start-Process -WindowStyle Hidden -WorkingDirectory (Join-Path $root 'app') -FilePath 'cmd.exe' `
      -ArgumentList '/c', 'npm run dev' `
      -RedirectStandardOutput (Join-Path $logs 'app.out.log') -RedirectStandardError (Join-Path $logs 'app.err.log')
    "$(Get-Date -Format s) started the prototype app on 5173"
  }
}

Start-Missing
while ($Watch) {
  Start-Sleep -Seconds 30
  Start-Missing
}
