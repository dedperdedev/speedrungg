# Push to GitHub — One-Page Guide

You have a complete `speedrungg` folder. Here's how to get it on your GitHub.

## Option A — GitHub CLI (fastest, ~30 seconds)

If you have [`gh`](https://cli.github.com) installed and authenticated:

```bash
cd speedrungg

git init
git add .
git commit -m "feat: initial Speedrungg template (32 agents, 18 skills, 6 hooks, 8 rules)"

# Create the repo and push in one step. Replace <repo-name> with what you want.
gh repo create <repo-name> --public --source=. --remote=origin --push

# Or, if you want a private repo:
gh repo create <repo-name> --private --source=. --remote=origin --push
```

That's it. URL printed at the end.

---

## Option B — Plain git + manual repo creation (~2 minutes)

### 1. Create the empty repo on GitHub

Open https://github.com/new and:
- Name: e.g. `speedrungg`
- Visibility: your choice
- **Do NOT** check "Initialize with README" or add `.gitignore` / license — your local copy already has them
- Click **Create repository**

### 2. Push from local

```bash
cd speedrungg

git init
git add .
git commit -m "feat: initial Speedrungg template (32 agents, 18 skills, 6 hooks, 8 rules)"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If GitHub asks for auth: use a [Personal Access Token](https://github.com/settings/tokens) as the password, or set up [SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) once and use the SSH URL (`git@github.com:user/repo.git`).

---

## After pushing

### First sanity check

```bash
git log --oneline       # one commit visible
gh repo view --web      # opens repo in browser (if using gh)
```

### Try the template

```bash
npm install
npm test                # 7 tests should pass
npm run dev             # opens http://localhost:5173 — placeholder canvas
```

### Open Claude Code in the repo

```bash
claude
```

Then type:

```
/start
```

The studio will read `CLAUDE.md`, `AGENTS.md`, `ARCHITECTURE.md`, `DESIGN_RULES.md`, ask where you are in the lifecycle, and route you to the right workflow.

---

## What you'll see in the repo

```
.
├── CLAUDE.md                    Master config — read this first
├── README.md                    Public-facing intro
├── AGENTS.md                    Agent workflow contract
├── ARCHITECTURE.md              Code architecture rules
├── DESIGN_RULES.md              Game design principles
├── FIRST_PROMPT.md              Template for new game session
├── NEXT_ITERATION_PROMPT.md     Template for iteration session
├── LICENSE                      MIT
├── package.json
├── vite.config.js
├── .gitignore
├── .claude/
│   ├── settings.json            Hooks, permissions, budgets
│   ├── agents/                  32 agent definitions
│   │   ├── directors/           Tier 1 (3): creative-director, product-owner, project-manager
│   │   ├── leads/               Tier 2 (7): incl. security-engineer, technical-director
│   │   ├── specialists/         Tier 3 (16): incl. research-analyst, build-engineer
│   │   └── engines/             6 engine experts
│   ├── skills/                  18 slash commands
│   ├── hooks/                   6 shell hooks (executable)
│   └── rules/                   8 path-scoped rules
├── src/                         Working starter code
│   ├── core/                    Store, game-loop, RNG, clock, tunables (deterministic)
│   ├── rendering/adapter.js     Plug-in interface for engines
│   ├── index.html
│   └── main.js
├── public/
│   └── manifest.webmanifest     PWA manifest
├── tests/                       Unit + smoke tests (7 passing)
├── docs/                        Templates, security, privacy, ADRs, analytics catalog
├── design/                      For your GDD (empty, agent fills as you build)
├── assets/                      For your sprites, audio, data
├── tools/                       For build/deploy scripts
├── prototypes/                  Throwaway experiments
└── production/                  backlog, roadmap, sprints, risks, budgets, session-state
```

---

## Recommended next steps

1. **Set repo description** on GitHub: "AI game studio for web games — 32 specialized agents in one Claude Code session"
2. **Add topics** for discovery: `claude-code`, `web-games`, `html5-games`, `game-dev`, `agents`, `phaser`, `pixijs`, `threejs`, `babylonjs`
3. **Star the original projects** that inspired this synthesis — credits live in `README.md`
4. **Open an issue** for your first game idea so you have a thread to track decisions in
5. **Branch** for actual game work — `main` stays the clean template; `game/<name>` is where you build

---

## If something breaks

- Hooks not running → check they're executable: `chmod +x .claude/hooks/*.sh`
- `npm install` fails → ensure Node ≥ 20: `node --version`
- Tests fail → run individually: `node --test tests/unit/store.test.js`
- Vite won't start → check port 5173 isn't in use, or change in `vite.config.js`

Open an issue in your own repo so future-you (and contributors) have a paper trail.
