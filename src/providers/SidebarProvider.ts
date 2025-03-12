import * as vscode from "vscode";
import {
  addFlutterProject,
  getFlutterProjects,
  removeFlutterProject,
} from "../utils/FileUtils";
import { TabManager } from "./TabManager";

export class SidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "flutter-build-view";

  private _view?: vscode.WebviewView;

  constructor(private readonly _context: vscode.ExtensionContext) {}

  // Add method to update the view
  private updateView() {
    if (this._view) {
      const projects = getFlutterProjects();
      const projectList = projects
        .map(
          (p: string) => `
                <div class="project-item" onclick="showProjectMenu('${p}')">
                    <div class="project-info">
                        <div class="project-icon">
                            <i class="codicon codicon-folder"></i>
                        </div>
                        <div class="project-details">
                            <span class="project-name">${p
                              .split("/")
                              .pop()}</span>
                            <span class="project-path">${p}</span>
                        </div>
                    </div>
                    <div class="project-actions">
                        <button class="action-btn" onclick="event.stopPropagation(); removeProject('${p}')" title="Remove from History">
                            <i class="codicon codicon-trash"></i>
                        </button>
                    </div>
                </div>
            `
        )
        .join("");

      this._view.webview.html = this._getWebviewContent(projectList, projects);
    }
  }

  public resolveWebviewView(webviewView: vscode.WebviewView): void {
    this._view = webviewView;

    // Set webview options
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._context.extensionUri],
    };

    this.updateView();

    // Set up message handler
    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "openProject":
          // TabManager.show(message.projectPath);
          break;
        case "openProjectDialog":
          await addFlutterProject();
          this.updateView(); // Refresh view after adding project
          break;
        case "removeProject":
          await removeFlutterProject(message.projectPath);
          this.updateView(); // Refresh view after removing project
          break;
        case "createNewProject":
          await vscode.commands.executeCommand("flutter.createProject");
          break;
        case "showProjectMenu":
          interface ProjectAction extends vscode.QuickPickItem {
            type: "rename" | "logo";
          }

          const items: ProjectAction[] = [
            {
              label: "Rename App Name & Package",
              description:
                "Rename the app name and package name of the project",
              type: "rename",
            },
            {
              label: "Change App Icon",
              description: "Update the app icon of the project",
              type: "logo",
            },
          ];

          const selection = await vscode.window.showQuickPick(items, {
            placeHolder: "Select an action",
          });

          if (selection) {
            TabManager.show(message.projectPath, selection.type);
          }
          break;
      }
    });
  }

  private _getWebviewContent(projectList: string, projects: string[]): string {
    const codiconsUri = this._view?.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._context.extensionUri,
        "node_modules",
        "@vscode/codicons",
        "dist",
        "codicon.css"
      )
    );

    return /*html*/ `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="${codiconsUri}">
                <style>
                    body {
                        padding: 16px;
                        color: var(--vscode-foreground);
                        font-family: var(--vscode-font-family);
                    }

                    .header {
                        margin-bottom: 20px;
                    }

                    .primary-btn {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        background: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 13px;
                        transition: background-color 0.2s;
                    }

                    .primary-btn:hover {
                        background: var(--vscode-button-hoverBackground);
                    }

                    .project-list {
                        margin-top: 16px;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                    }

                    .project-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px;
                        background: var(--vscode-list-hoverBackground);
                        border-radius: 6px;
                        transition: all 0.2s;
                        position: relative;
                    }

                    .project-item:hover {
                        background: var(--vscode-list-activeSelectionBackground);
                    }

                    .project-info {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        flex: 1;
                        min-width: 0;
                    }

                    .project-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 32px;
                        height: 32px;
                        background: rgba(68, 209, 253, 0.1);
                        border-radius: 8px;
                    }

                    .project-icon i {
                        font-size: 20px;
                        color: #44D1FD;
                    }

                    .project-details {
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                        min-width: 0;
                    }

                    .project-name {
                        font-weight: 500;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .project-path {
                        font-size: 11px;
                        color: var(--vscode-descriptionForeground);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .action-btn {
                        background: transparent;
                        border: none;
                        color: var(--vscode-foreground);
                        cursor: pointer;
                        padding: 6px;
                        border-radius: 4px;
                        display: flex;
                        align-items: center;
                        transition: all 0.2s;
                    }

                    .action-btn:hover {
                        background: var(--vscode-toolbar-hoverBackground);
                        color: #EE4B2B;
                    }

                    .empty-state {
                        text-align: center;
                        padding: 32px 16px;
                    }

                    .empty-icon {
                        font-size: 48px;
                        margin-bottom: 16px;
                        color: #44D1FD;
                        opacity: 0.8;
                    }

                    .empty-title {
                        font-size: 16px;
                        font-weight: 500;
                        margin: 0 0 8px 0;
                    }

                    .empty-subtitle {
                        font-size: 12px;
                        line-height: 1.4;
                        margin: 0 0 24px 0;
                        color: var(--vscode-descriptionForeground);
                    }

                    .action-group {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                    }

                    .secondary-btn {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        background: transparent;
                        color: var(--vscode-foreground);
                        border: 1px solid var(--vscode-widget-border);
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 13px;
                        transition: all 0.2s;
                    }

                    .secondary-btn:hover {
                        background: var(--vscode-toolbar-hoverBackground);
                    }
                </style>
            </head>
            <body>
                ${
                  projects.length > 0
                    ? `
                    <div class="header">
                        <button class="primary-btn" onclick="openProjectDialog()">
                            <i class="codicon codicon-folder-opened"></i>
                            Open Project
                        </button>
                    </div>
                    <div class="project-list">
                        ${projectList}
                    </div>
                `
                    : `
                    <div class="empty-state">
                        <i class="codicon codicon-flutter empty-icon"></i>
                        <h3 class="empty-title">No Flutter Projects Found</h3>
                        <p class="empty-subtitle">Open or create a Flutter project to get started</p>
                        
                        <div class="action-group">
                            <button class="primary-btn" onclick="openProjectDialog()">
                                <i class="codicon codicon-folder-opened"></i>
                                Open Project
                            </button>
                            <button class="secondary-btn" onclick="createNewProject()">
                                <i class="codicon codicon-new-file"></i>
                                Create New Project
                            </button>
                        </div>
                    </div>
                `
                }
                <script>
                    const vscode = acquireVsCodeApi();
                    
                    function showProjectMenu(projectPath) {
                        vscode.postMessage({ 
                            command: "showProjectMenu", 
                            projectPath 
                        });
                    }

                    function openProject(projectPath) {
                        vscode.postMessage({ command: "openProject", projectPath });
                    }

                    function openProjectDialog() {
                        vscode.postMessage({ command: "openProjectDialog" });
                    }

                    function removeProject(projectPath) {
                        vscode.postMessage({ command: "removeProject", projectPath });
                    }

                    function createNewProject() {
                        vscode.postMessage({ command: "createNewProject" });
                    }
                </script>
            </body>
            </html>
        `;
  }
}
