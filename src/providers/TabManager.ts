import * as vscode from "vscode";
import { AppIconPanel } from "./AppIconPanel";
import { RenamePanel } from "./RenamePanel";
import { renameFlutterProject } from "../utils/RenameUtils";
import { updateAppIcon } from "../utils/AppIconUtils";

export class TabManager {
  private static currentTabs: Map<string, vscode.WebviewPanel> = new Map();

  public static show(projectPath: string, action: "rename" | "icon") {
    const projectName = projectPath.split("/").pop() || "Flutter Project";
    const tabId = `flutter-build-${action}-${projectPath}`;

    if (this.currentTabs.has(tabId)) {
      this.currentTabs.get(tabId)?.reveal();
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      "flutterBuildTab",
      `${projectName} - ${
        action === "rename" ? "Rename App" : "Change App Icon"
      }`,
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    panel.webview.html = this.getTabHtml(projectPath, action);

    // Set up message handling
    panel.webview.onDidReceiveMessage(async (message) => {
      if (message.command === "rename") {
        try {
          renameFlutterProject(
            projectPath,
            message.newAppName,
            message.newPackageName,
            message.platforms
          );

          // Refresh the panel content after successful rename
          panel.webview.html = this.getTabHtml(projectPath, action);

          // Send a success message to the webview with autoHide flag
          panel.webview.postMessage({
            command: "renameSuccess",
            message: "Project renamed successfully!",
            autoHide: true,
            hideAfter: 3000, // hide after 5 seconds
          });
        } catch (error) {
          // Send error message to webview if rename fails
          panel.webview.postMessage({
            command: "renameError",
            message: `Error: ${error}`,
            autoHide: true,
            hideAfter: 3000, // hide after 5 seconds
          });
        }
      } else if (message.command === "updateIcon") {
        try {
          await updateAppIcon(
            message.projectPath,
            message.iconData,
            message.platforms
          );

          // Send success message to webview
          panel.webview.postMessage({
            command: "iconUpdateSuccess",
            message: "App icon updated successfully!",
            autoHide: true,
            hideAfter: 3000,
          });
        } catch (error) {
          // Send error message to webview
          panel.webview.postMessage({
            command: "iconUpdateError",
            message: `Error updating app icon: ${error}`,
            autoHide: true,
            hideAfter: 3000,
          });
        }
      }
    });

    panel.onDidDispose(() => {
      this.currentTabs.delete(tabId);
    });

    this.currentTabs.set(tabId, panel);
    panel.reveal();
  }

  private static getTabHtml(
    projectPath: string,
    action: "rename" | "icon"
  ): string {
    // Get content based on action
    const content =
      action === "rename"
        ? RenamePanel.getTabContent(projectPath)
        : AppIconPanel.getTabContent(projectPath);

    return content;
  }
}
