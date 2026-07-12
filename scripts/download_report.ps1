<#
Download Report Script

Usage:
  powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\download_report.ps1

This script builds a JSON payload using PowerShell objects (avoiding manual escaping),
posts it to the backend `/generate-report` endpoint, and saves the returned PDF to
`backend/generated_report.pdf`.
#>

$payload = @{
    title    = 'Demo Title'
    abstract = 'Demo Abstract'
    score    = 80
    decision = 'Minor Revision'
}

$json = $payload | ConvertTo-Json -Compress
$uri = 'http://127.0.0.1:8000/generate-report'
$outPath = 'backend/generated_report.pdf'

# Use HttpClient to avoid Invoke-WebRequest stream/encoding quirks
$bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
$client = New-Object System.Net.Http.HttpClient
$content = New-Object System.Net.Http.ByteArrayContent($bytes)
$content.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::Parse('application/json')

try {
    $response = $client.PostAsync($uri, $content).Result
    if ($response.IsSuccessStatusCode) {
        $bytes = $response.Content.ReadAsByteArrayAsync().Result
        [System.IO.File]::WriteAllBytes($outPath, $bytes)
        Write-Output "Saved PDF to $outPath (status $($response.StatusCode), bytes=$($bytes.Length))"
    } else {
        $bodyText = $response.Content.ReadAsStringAsync().Result
        Write-Error "Request failed: $($response.StatusCode) - $bodyText"
        exit 1
    }
} catch {
    Write-Error "Request failed: $_"
    exit 1
} finally {
    $client.Dispose()
}
