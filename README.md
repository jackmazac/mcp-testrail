# TestRail MCP Server — Fox Corporation

Model Context Protocol (MCP) server for Fox’s TestRail instance ([myfox.testrail.io](https://myfox.testrail.io/)). Use it from Cursor or other MCP clients to manage test cases, projects, suites, and runs from the chat.

## Jira-to-TestRail Workflow

This fork automates linking Jira tickets to TestRail test cases for the **FOX_MC_UNIFIEDAPP** project (CMS + MAM). It reduces the per-ticket time from about 30–60 minutes to a few minutes, with human approval at each step.

**Flow**: Get Jira ticket → Find test suite in TestRail → Create test in the correct suite → Link to Jira ticket

**Includes**:
- **Subagent** (`.cursor/agents/testrail-linker.md`) — Runs the workflow with human-in-the-loop approval
- **Domain knowledge** (`.cursor/agents/testrail-knowledge.md`) — CMS and MAM section mapping for FOX_MC_UNIFIEDAPP
- **Install skill** (`.cursor/skills/install-testrail-jira-workflow/`) — Setup instructions for new team members

**Quick setup**: Clone, run `npm install && npm run build`, copy `.cursor/mcp.json.example` to `.cursor/mcp.json`, add your TestRail credentials. Ensure the Atlassian MCP is configured for Jira access.

## Share with teammates (prompt deeplink)

Send this link to teammates. When opened, it pre-fills a prompt that instructs the Cursor agent to perform the full setup (clone, build, configure MCPs, verify subagent and knowledge files):

**[Open install prompt in Cursor](https://cursor.com/link/prompt?text=Set%20up%20the%20TestRail%20%2B%20Jira%20workflow%20for%20Fox%20Corporation.%20Execute%20these%20steps%3A%0A%0A1.%20Clone%20https%3A%2F%2Fgithub.com%2Fjackmazac%2Fmcp-testrail%20into%20the%20workspace%20if%20not%20present.%20Open%20the%20mcp-testrail%20folder.%0A%0A2.%20Run%3A%20npm%20install%20%26%26%20npm%20run%20build.%20Verify%20dist%2Fstdio.js%20exists.%0A%0A3.%20Install%20TestRail%20MCP%3A%20Copy%20.cursor%2Fmcp.json.example%20to%20.cursor%2Fmcp.json.%20This%20configures%20the%20TestRail%20MCP%20with%20command%20%22node%22%20and%20args%20%5B%22dist%2Fstdio.js%22%5D.%0A%0A4.%20Install%20Atlassian%20MCP%3A%20Add%20%22atlassian%22%3A%20%7B%22url%22%3A%20%22https%3A%2F%2Fmcp.atlassian.com%2Fv1%2Fsse%22%7D%20to%20mcpServers%20in%20.cursor%2Fmcp.json%20if%20not%20already%20configured.%20Atlassian%20uses%20remote%20OAuth%20for%20Jira%20access.%0A%0A5.%20Ask%20for%20my%20TestRail%20API%20key%20and%20email.%20Update%20.cursor%2Fmcp.json%20with%20TESTRAIL_URL%3Dhttps%3A%2F%2Fmyfox.testrail.io%2F%2C%20TESTRAIL_USERNAME%2C%20TESTRAIL_API_KEY.%0A%0A6.%20Verify%20.cursor%2Fagents%2Ftestrail-linker.md%20and%20testrail-knowledge.md%20exist.%0A%0A7.%20Tell%20me%20to%20restart%20Cursor%20and%20test%20with%20%22list%20TestRail%20projects%22.%0A%0AGuide%20me%20through%20each%20step.)**

User must confirm the prompt before the agent runs. Desktop users: use `cursor://anysphere.cursor-deeplink/prompt?text=...` with the same `text` value.

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
- **`spawn node ENOENT`**: Ensure Node.js (≥20.18.1) is installed and in your PATH.
- **Connection issues**: Verify the MCP server starts and that `dist/stdio.js` exists after `npm run build`.
- **Long conversations**: Use `limit` and `offset` when fetching test cases.

## Acknowledgements

- [TestRail API](https://docs.testrail.techmatrix.jp/testrail/docs/702/api/)
- [Model Context Protocol SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- Forked from [bun913/mcp-testrail](https://github.com/bun913/mcp-testrail)

