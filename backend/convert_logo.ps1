Add-Type -AssemblyName System.Drawing

$options = @(
    @{
        Src = "C:\Users\Shakir\.gemini\antigravity\brain\553e02d9-2cc3-40b8-91c3-6dbc19dcbd0d\taqreeb_logo_1791567860386.jpg"
        Dsts = @(
            "c:\Users\Shakir\Desktop\Taqreeb\logo.png",
            "c:\Users\Shakir\Desktop\Taqreeb\logo-option1.png",
            "c:\Users\Shakir\Desktop\Taqreeb\frontend\public\logo.png",
            "c:\Users\Shakir\Desktop\Taqreeb\frontend\public\logo-option1.png"
        )
    },
    @{
        Src = "C:\Users\Shakir\.gemini\antigravity\brain\553e02d9-2cc3-40b8-91c3-6dbc19dcbd0d\taqreeb_logo_opt2_1791567981396.jpg"
        Dsts = @(
            "c:\Users\Shakir\Desktop\Taqreeb\logo-option2.png",
            "c:\Users\Shakir\Desktop\Taqreeb\frontend\public\logo-option2.png"
        )
    },
    @{
        Src = "C:\Users\Shakir\.gemini\antigravity\brain\553e02d9-2cc3-40b8-91c3-6dbc19dcbd0d\taqreeb_logo_opt3_1791568003215.jpg"
        Dsts = @(
            "c:\Users\Shakir\Desktop\Taqreeb\logo-option3.png",
            "c:\Users\Shakir\Desktop\Taqreeb\frontend\public\logo-option3.png"
        )
    }
)

foreach ($item in $options) {
    if (Test-Path $item.Src) {
        $img = [System.Drawing.Image]::FromFile($item.Src)
        foreach ($dst in $item.Dsts) {
            $parent = Split-Path -Path $dst -Parent
            if (-not (Test-Path $parent)) {
                New-Item -ItemType Directory -Path $parent -Force | Out-Null
            }
            $img.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
            Write-Host "Exported PNG: $dst"
        }
        $img.Dispose()
    } else {
        Write-Warning "Source not found: $($item.Src)"
    }
}
Write-Host "All logo PNG options converted successfully!"
