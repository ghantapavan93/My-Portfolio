$file = "src\components\HeroSection.jsx"
$content = Get-Content $file -Raw

# Find capability box start and end markers
$startMarker = "      {/* Capabilities Box - Centered Below Grid */}"
$endMarker = "      </div>`r`n`r`n      {/* Stats - Centered Row */}"

# New capabilities snapshot content
$newCapabilities = @"
      {/* Capabilities Box - Centered Below Grid */}
      <div className="max-w-5xl mx-auto mb-10 animate-fade-up animation-delay-400">
        <div className="bg-white/5 dark:bg-black/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:border-primary/40 transition-all duration-500">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xs">
                ⚙️
              </span>
              <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                Capabilities snapshot
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              12 domains · 7 system patterns · 6 ways of working
            </p>
          </div>

          {/* 3-column grid of pillars */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Building Across */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-2.5 tracking-wide uppercase flex items-center gap-1">
                <span className="inline-block h-4 w-1 rounded-full bg-gradient-to-b from-blue-500 to-cyan-400" />
                Building across
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {buildingAcrossChips.map((chip) => (
                  <span
                    key={chip.id}
                    className={``px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 dark:bg-black/10 backdrop-blur-sm border transition-all duration-300 cursor-default ``${
                      activeEmoji === chip.id
                        ? 'border-primary bg-primary/20 shadow-lg shadow-primary/30 scale-105'
                        : 'border-white/10 hover:border-primary/50 hover:bg-white/10'
                    }``}
                  >
                    <span className="mr-1">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            {/* What I Build */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-2.5 tracking-wide uppercase flex items-center gap-1">
                <span className="inline-block h-4 w-1 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />
                What I build
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {whatIBuildChips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <span className="mr-1">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            {/* How I Work */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-2.5 tracking-wide uppercase flex items-center gap-1">
                <span className="inline-block h-4 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-lime-400" />
                How I work
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {howIWorkChips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 dark:bg-black/10 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <span className="mr-1">{chip.icon}</span>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack band */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2.5 tracking-wide uppercase flex items-center gap-1">
              <span className="inline-block h-4 w-1 rounded-full bg-gradient-to-b from-orange-500 to-red-500" />
              Tech stack
            </h3>
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 shadow-sm shadow-primary/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats - Centered Row */}
"@

# Find start position
$startPos = $content.IndexOf($startMarker)
if ($startPos -lt 0) {
    Write-Host "Error: Start marker not found!"
    exit 1
}

# Find end position
$endPos = $content.IndexOf($endMarker, $startPos)
if ($endPos -lt 0) {
    Write-Host "Error: End marker not found!"
    exit 1
}

# Replace the content
$before = $content.Substring(0, $startPos)
$after = $content.Substring($endPos)
$newContent = $before + $newCapabilities + $after

# Write back
$newContent | Set-Content $file -NoNewline

Write-Host "Successfully replaced capabilities box!"
