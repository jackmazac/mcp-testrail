# TestRail MCP Server — Fox Corporation

Model Context Protocol (MCP) server for Fox’s TestRail instance ([myfox.testrail.io](https://myfox.testrail.io/)). Use it from Cursor or other MCP clients to manage test cases, projects, suites, and runs from the chat.

## Jira-to-TestRail Workflow

This fork automates linking Jira tickets to TestRail test cases for the **FOX_MC_UNIFIEDAPP** project (CMS + MAM). It reduces the per-ticket time from about 30–60 minutes to a few minutes, with human approval at each step.

**Flow**: Get Jira ticket → Find test suite in TestRail → Create test in the correct suite → Link to Jira ticket

**Includes**:
- **Subagent** (`.cursor/agents/testrail-linker.md`) — Runs the workflow with human-in-the-loop approval
- **Domain knowledge** (`.cursor/agents/testrail-knowledge.md`) — CMS and MAM section mapping for FOX_MC_UNIFIEDAPP
- **Install skill** (`.cursor/skills/install-testrail-jira-workflow/`) — Setup instructions for new team members

**Quick setup**: Clone, run `bun install && bun run build`, copy `.cursor/mcp.json.example` to `.cursor/mcp.json`, add your TestRail credentials. Ensure the Atlassian MCP is configured for Jira access.

## Fox Configuration

For Fox’s TestRail instance, use:

```json
{
  "mcpServers": {
    "testrail": {
      "command": "node",
      "args": ["dist/stdio.js"],
      "env": {
        "TESTRAIL_URL": "https://myfox.testrail.io/",
        "TESTRAIL_USERNAME": "your.email@fox.com",
        "TESTRAIL_API_KEY": "your-api-key"
      }
    }
  }
}
```

Get your API key: TestRail → **Settings** → **My Settings** → **API Keys**.

## Available Tools

| Category | Tools |
|----------|-------|
| **Projects** | `getProjects`, `getProject` |
| **Suites** | `getSuites`, `getSuite`, `addSuite`, `updateSuite` |
| **Cases** | `getCase`, `getCases`, `addCase`, `updateCase`, `deleteCase`, `getCaseTypes`, `getCaseFields`, `copyToSection`, `moveToSection`, `getCaseHistory`, `updateCases` |
| **Sections** | `getSection`, `getSections`, `addSection`, `moveSection`, `updateSection`, `deleteSection` |
| **Runs** | `getRuns`, `getRun`, `addRun`, `updateRun` |
| **Tests** | `getTests`, `getTest` |
| **Results** | `getResults`, `getResultsForCase`, `getResultsForRun`, `addResultForCase`, `addResultsForCases` |
| **Plans** | `getPlans` |
| **Milestones** | `getMilestones` |
| **Shared Steps** | `getSharedSteps` |

## Troubleshooting

- **401 Authentication**: Regenerate your API key; use the exact email casing from your TestRail profile. Ensure the API is enabled (ask your admin if unsure).
- **`spawn node ENOENT`**: Ensure Node.js (≥20.18.1) or Bun is installed and in your PATH.
- **Connection issues**: Verify the MCP server starts and that `dist/stdio.js` exists after `bun run build`.
- **Long conversations**: Use `limit` and `offset` when fetching test cases.

## Acknowledgements

- [TestRail API](https://docs.testrail.techmatrix.jp/testrail/docs/702/api/)
- [Model Context Protocol SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- Forked from [bun913/mcp-testrail](https://github.com/bun913/mcp-testrail)

