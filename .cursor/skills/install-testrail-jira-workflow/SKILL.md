---
name: install-testrail-jira-workflow
description: Installs the TestRail + Jira automation workflow: clones the forked mcp-testrail, configures TestRail and Atlassian MCPs, and creates the testrail-linker subagent with domain knowledge. Use when setting up the Jira-to-TestRail linking automation or onboarding team members to the workflow.
---

# Install TestRail + Jira Workflow

This skill installs the complete stack for linking Jira tickets to TestRail test cases.
This repo is self-contained: clone it and you get the MCP code, subagent, and domain knowledge.

1. **TestRail MCP** — built from this repo
2. **Atlassian MCP** (Jira) — added if not already configured
3. **testrail-linker subagent** and **testrail-knowledge.md** — already in `.cursor/agents/`

## Prerequisites

- Node.js >= 20.18.1 (or Bun)
- Git
- TestRail API key (Settings > My Settings > API Keys in TestRail)
- For Atlassian MCP: either OAuth (remote) or API token (sooperset)

---

## Installation Workflow

### Step 1: Clone and Build TestRail MCP

```bash
git clone https://github.com/jackmazac/mcp-testrail.git
cd mcp-testrail
```

Install and build (use Bun if available, else npm):

```bash
bun install   # or: npm install
bun run build # or: npm run build
```

Verify: `dist/stdio.js` exists.

### Step 2: Configure MCP Servers

Copy the example config and add your credentials:

```bash
cp .cursor/mcp.json.example .cursor/mcp.json
```

Edit `.cursor/mcp.json` and replace `YOUR_EMAIL@company.com` and `YOUR_API_KEY` with your TestRail credentials.
The `args` use `dist/stdio.js` (relative to repo root). Never commit `mcp.json` — it's in `.gitignore`.

**Atlassian MCP** (add only if not already present):

**Option A — Remote (OAuth):** User connects via browser. Add to config:

```json
"atlassian": {
  "url": "https://mcp.atlassian.com/v1/sse"
}
```

**Option B — Local (API token):** Use [sooperset/mcp-atlassian](https://github.com/sooperset/mcp-atlassian):

```json
"mcp-atlassian": {
  "command": "uvx",
  "args": ["mcp-atlassian"],
  "env": {
    "JIRA_URL": "https://your-company.atlassian.net",
    "JIRA_USERNAME": "your.email@company.com",
    "JIRA_API_TOKEN": "your_api_token"
  }
}
```

Check existing config before adding to avoid duplicates.

### Step 3: Subagent and Knowledge

The repo already includes `.cursor/agents/testrail-linker.md` and `testrail-knowledge.md`.
To reset or repair, copy from `.cursor/skills/install-testrail-jira-workflow/` templates.

### Step 4: Post-Install Configuration

If using a **different TestRail instance** than myfox.testrail.io:
1. Update `TESTRAIL_URL`, `TESTRAIL_USERNAME`, `TESTRAIL_API_KEY` in `.cursor/mcp.json`
2. Run `getProjects` and `getSuites`/`getSections` to get your project/suite/section IDs
3. Update the project ID, suite ID, and section IDs in `.cursor/agents/testrail-knowledge.md`

---

## Verification

1. Restart Cursor (or reload MCP servers)
2. Confirm TestRail MCP: ask to "list TestRail projects"
3. Confirm testrail-linker: say "Use testrail-linker to link PROJ-123 to TestRail" (with a real Jira key when Atlassian MCP is active)

---

## Troubleshooting

- **401 from TestRail**: Regenerate API key; ensure API is enabled (admin); use exact email casing
- **MCP not found**: Ensure `mcp.json` path is correct; `args` must point to built `dist/stdio.js`
- **Subagent not found**: File must be at `.cursor/agents/testrail-linker.md` with valid YAML frontmatter

---

## Sharing via Deeplink

To share this skill with teammates, use a [Cursor skill deeplink](https://cursor.com/docs/integrations/deeplinks):

**Desktop:** `cursor://anysphere.cursor-deeplink/skill?name=install-testrail-jira-workflow&text=...`
**Web:** `https://cursor.com/link/skill?name=install-testrail-jira-workflow&text=...`

The `text` param should be the URL-encoded contents of this SKILL.md. Recipients will need the template files (`testrail-linker.md`, `testrail-knowledge.md`) — share the full `.cursor/skills/install-testrail-jira-workflow/` folder from the repo, or ensure they clone the project.
