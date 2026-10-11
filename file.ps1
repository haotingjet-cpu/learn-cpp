# ==================== 自訂參數設定 ====================
$folderPath = "C:\rust\learn_cpp\src\chapter_9"   # 請在這裡替換成您的實際路徑
[int]$c = 1                       # 起始數字
[int]$end = 15                    # 結束數字
# ====================================================

# 如果資料夾不存在，則自動建立
if (!(Test-Path -Path $folderPath)) {
    New-Item -ItemType Directory -Path $folderPath | Out-Null
}

# 1. 額外生成個別的 intro.md 檔案
$introPath = Join-Path -Path $folderPath -ChildPath "intro.md"
New-Item -ItemType File -Path $introPath -Force | Out-Null

$introPath = Join-Path -Path $folderPath -ChildPath "homework.md"
New-Item -ItemType File -Path $introPath -Force | Out-Null

# 2. 利用範圍運算子從起始數字 ($c) 跑迴圈到結束數字 ($end)
$c..$end | ForEach-Object {
    # 組合出檔名，例如：section_1.md, section_2.md ... section_5.md
    $fileName = "section_$_.md"
    
    # 組合完整路徑
    $fullPath = Join-Path -Path $folderPath -ChildPath $fileName
    
    # 建立檔案
    New-Item -ItemType File -Path $fullPath -Force | Out-Null
}

Write-Host "批量建檔完成！已在 $folderPath 生成 intro.md 以及 section_${c}.md 到 section_${end}.md。" -ForegroundColor Green
