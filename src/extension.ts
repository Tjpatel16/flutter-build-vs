import * as vscode from "vscode";
import { SidebarProvider } from "./providers/SidebarProvider";
import { TabManager } from "./providers/TabManager";
import { initializeFileUtils } from "./utils/FileUtils";

export function activate(context: vscode.ExtensionContext) {
  initializeFileUtils(context);
  const sidebarProvider = new SidebarProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      SidebarProvider.viewType,
      sidebarProvider,
      {
        webviewOptions: {
          retainContextWhenHidden: true,
        },
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("flutter-build.start", (projectPath) => {
      TabManager.show(projectPath, "rename");
    })
  );
}

export function deactivate() {}
