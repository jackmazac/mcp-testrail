import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TestRailClient } from "../../client/api/index.js";
import { createSuccessResponse, createErrorResponse } from "./utils.js";
import {
	getSectionSchema,
	getSectionsSchema,
	discoverSectionsSchema,
	addSectionSchema,
	moveSectionSchema,
	updateSectionSchema,
	deleteSectionSchema,
	TestRailSection,
} from "../../shared/schemas/sections.js";

interface TreeNode {
	id: number;
	name: string;
	depth: number;
	parent_id: number | null;
	path: string;
	children: TreeNode[];
}

function buildSectionTree(sections: TestRailSection[]): TreeNode[] {
	const byId = new Map<number, TreeNode>();
	const roots: TreeNode[] = [];

	for (const s of sections) {
		byId.set(s.id, {
			id: s.id,
			name: s.name,
			depth: s.depth,
			parent_id: s.parent_id ?? null,
			path: s.name,
			children: [],
		});
	}

	for (const node of byId.values()) {
		const parent = node.parent_id ? byId.get(node.parent_id) : undefined;
		if (parent) {
			node.path = `${parent.path} > ${node.name}`;
			parent.children.push(node);
		} else {
			roots.push(node);
		}
	}

	return roots;
}

function renderAsciiTree(
	nodes: TreeNode[],
	prefix = "",
	isRoot = true,
): string {
	const lines: string[] = [];
	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		const last = i === nodes.length - 1;
		if (isRoot) {
			lines.push(`${node.name} (${node.id})`);
		} else {
			const connector = last ? "└── " : "├── ";
			lines.push(`${prefix}${connector}${node.name} (${node.id})`);
		}
		if (node.children.length > 0) {
			const childPrefix = isRoot
				? ""
				: prefix + (last ? "    " : "│   ");
			lines.push(
				renderAsciiTree(node.children, childPrefix, false),
			);
		}
	}
	return lines.join("\n");
}

function flattenTree(nodes: TreeNode[]): Omit<TreeNode, "children">[] {
	const result: Omit<TreeNode, "children">[] = [];
	function walk(list: TreeNode[]) {
		for (const node of list) {
			const { children, ...rest } = node;
			result.push(rest);
			walk(children);
		}
	}
	walk(nodes);
	return result;
}

/**
 * Function to register section-related API tools
 * @param server McpServer instance
 * @param testRailClient TestRail client instance
 */
export function registerSectionTools(
	server: McpServer,
	testRailClient: TestRailClient,
): void {
	// Get a specific section
	server.tool(
		"getSection",
		"Retrieves details of a specific section by ID / 特定のセクションの詳細をIDで取得します",
		getSectionSchema,
		async ({ sectionId }) => {
			try {
				const section = await testRailClient.sections.getSection(sectionId);
				const successResponse = createSuccessResponse(
					"Section retrieved successfully",
					{
						section,
					},
				);
				return {
					content: [{ type: "text", text: JSON.stringify(successResponse) }],
				};
			} catch (error) {
				const errorResponse = createErrorResponse(
					`Error fetching section ${sectionId}`,
					error,
				);
				return {
					content: [{ type: "text", text: JSON.stringify(errorResponse) }],
					isError: true,
				};
			}
		},
	);

	// Get sections for a project or suite (paginated)
	server.tool(
		"getSections",
		"Retrieves sections for a project/suite with pagination. REQUIRED: projectId. OPTIONAL: suiteId, limit (default 250, max 250), offset (default 0). Returns sections array and pagination metadata.",
		getSectionsSchema,
		async ({ projectId, suiteId, limit = 250, offset = 0 }) => {
			try {
				const result = await testRailClient.sections.getSections(
					projectId,
					suiteId,
					{ limit, offset },
				);
				const successResponse = createSuccessResponse(
					"Sections retrieved successfully",
					{
						sections: result.sections,
						pagination: {
							limit,
							offset,
							total: result.size,
							hasMore: result._links.next !== null,
						},
					},
				);
				return {
					content: [{ type: "text", text: JSON.stringify(successResponse) }],
				};
			} catch (error) {
				const errorResponse = createErrorResponse(
					`Error fetching sections for project ${projectId}`,
					error,
				);
				return {
					content: [{ type: "text", text: JSON.stringify(errorResponse) }],
					isError: true,
				};
			}
		},
	);

	// Create a new section
	server.tool(
		"addSection",
		"Creates a new section in a TestRail project / TestRailプロジェクトに新しいセクションを作成します",
		addSectionSchema,
		async ({ projectId, name, description, suiteId, parentId }) => {
			try {
				const data = {
					name,
					description,
					suite_id: suiteId,
					parent_id: parentId,
				};

				const section = await testRailClient.sections.addSection(
					projectId,
					data,
				);
				const successResponse = createSuccessResponse(
					"Section created successfully",
					{
						section,
					},
				);
				return {
					content: [{ type: "text", text: JSON.stringify(successResponse) }],
				};
			} catch (error) {
				const errorResponse = createErrorResponse(
					"Error creating section",
					error,
				);
				return {
					content: [{ type: "text", text: JSON.stringify(errorResponse) }],
					isError: true,
				};
			}
		},
	);

	// Move a section
	server.tool(
		"moveSection",
		"Moves a section to a new position in the test hierarchy / テスト階層内の新しい位置にセクションを移動します",
		moveSectionSchema,
		async ({ sectionId, parentId, afterId }) => {
			try {
				const moveData: {
					parent_id?: number | null;
					after_id?: number | null;
				} = {};

				if (parentId !== undefined) moveData.parent_id = parentId;
				if (afterId !== undefined) moveData.after_id = afterId;

				const section = await testRailClient.sections.moveSection(
					sectionId,
					moveData,
				);
				const successResponse = createSuccessResponse(
					"Section moved successfully",
					{
						section,
					},
				);
				return {
					content: [{ type: "text", text: JSON.stringify(successResponse) }],
				};
			} catch (error) {
				const errorResponse = createErrorResponse(
					`Error moving section ${sectionId}`,
					error,
				);
				return {
					content: [{ type: "text", text: JSON.stringify(errorResponse) }],
					isError: true,
				};
			}
		},
	);

	// Update a section
	server.tool(
		"updateSection",
		"Updates an existing section / 既存のセクションを更新します",
		updateSectionSchema,
		async ({ sectionId, name, description }) => {
			try {
				const updateData: { name?: string; description?: string } = {};
				if (name) updateData.name = name;
				if (description) updateData.description = description;

				const section = await testRailClient.sections.updateSection(
					sectionId,
					updateData,
				);
				const successResponse = createSuccessResponse(
					"Section updated successfully",
					{
						section,
					},
				);
				return {
					content: [{ type: "text", text: JSON.stringify(successResponse) }],
				};
			} catch (error) {
				const errorResponse = createErrorResponse(
					`Error updating section ${sectionId}`,
					error,
				);
				return {
					content: [{ type: "text", text: JSON.stringify(errorResponse) }],
					isError: true,
				};
			}
		},
	);

	// Delete a section
	server.tool(
		"deleteSection",
		"Deletes a section / セクションを削除します",
		deleteSectionSchema,
		async ({ sectionId, soft }) => {
			try {
				await testRailClient.sections.deleteSection(sectionId, soft);
				const successResponse = createSuccessResponse(
					`Section ${sectionId} deleted successfully`,
				);
				return {
					content: [{ type: "text", text: JSON.stringify(successResponse) }],
				};
			} catch (error) {
				const errorResponse = createErrorResponse(
					`Error deleting section ${sectionId}`,
					error,
				);
				return {
					content: [{ type: "text", text: JSON.stringify(errorResponse) }],
					isError: true,
				};
			}
		},
	);

	// Discover all sections for a project (auto-paginates, builds tree)
	server.tool(
		"discoverSections",
		"Fetches ALL sections for a project by auto-paginating, then returns a structured tree with ASCII visualization and flat section list with paths. Use this to generate a knowledge file for a new project.",
		discoverSectionsSchema,
		async ({ projectId, suiteId }) => {
			try {
				const project =
					await testRailClient.projects.getProject(projectId);

				let resolvedSuiteId = suiteId;
				let suiteName = "";

				if (!resolvedSuiteId) {
					// getSuites returns TestRailSuite[] at the type level, but
					// the API actually returns a paginated envelope at runtime.
					const suitesRaw =
						await testRailClient.suites.getSuites(projectId);
					const suitesList = Array.isArray(suitesRaw)
						? suitesRaw
						: (
								suitesRaw as unknown as {
									suites: typeof suitesRaw;
								}
							).suites;

					if (
						project.suite_mode === 3 &&
						suitesList.length > 1
					) {
						const suiteList = suitesList
							.map((s) => `  - ${s.name} (ID: ${s.id})`)
							.join("\n");
						const msg = `Multi-suite project. Specify suiteId. Available suites:\n${suiteList}`;
						return {
							content: [
								{
									type: "text",
									text: JSON.stringify(
										createErrorResponse(msg, new Error(msg)),
									),
								},
							],
							isError: true,
						};
					}

					if (suitesList.length > 0) {
						resolvedSuiteId = suitesList[0].id;
						suiteName = suitesList[0].name;
					}
				} else {
					const suite =
						await testRailClient.suites.getSuite(resolvedSuiteId);
					suiteName = suite.name;
				}

				const allSections =
					await testRailClient.sections.getAllSections(
						projectId,
						resolvedSuiteId,
					);

				const tree = buildSectionTree(allSections);
				const asciiTree = renderAsciiTree(tree);
				const flatSections = flattenTree(tree);

				const successResponse = createSuccessResponse(
					`Discovered ${allSections.length} sections`,
					{
						project: {
							id: project.id,
							name: project.name,
							suite_mode: project.suite_mode,
						},
						suite: {
							id: resolvedSuiteId,
							name: suiteName,
						},
						totalSections: allSections.length,
						tree: asciiTree,
						sections: flatSections,
					},
				);

				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(successResponse),
						},
					],
				};
			} catch (error) {
				const errorResponse = createErrorResponse(
					`Error discovering sections for project ${projectId}`,
					error,
				);
				return {
					content: [{ type: "text", text: JSON.stringify(errorResponse) }],
					isError: true,
				};
			}
		},
	);
}
