import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

// Store projects in extension's global state
const FLUTTER_PROJECTS_KEY = "flutterProjects";

// Initialize global state reference
let globalState: vscode.Memento | undefined;

export function initializeFileUtils(context: vscode.ExtensionContext) {
  globalState = context.globalState;
}

export function getFlutterProjects(): string[] {
  const context = globalState?.get(FLUTTER_PROJECTS_KEY) || [];
  return context as string[];
}

export async function addFlutterProject(): Promise<void> {
  const result = await vscode.window.showOpenDialog({
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
    title: "Select Flutter Project Folder",
  });

  if (result && result[0]) {
    const folderPath = result[0].fsPath;

    try {
      const pubspecPath = path.join(folderPath, "pubspec.yaml");
      if (fs.existsSync(pubspecPath)) {
        const content = fs.readFileSync(pubspecPath, "utf8");
        if (content.includes("flutter:") || content.includes("sdk: flutter")) {
          // Add to local history instead of workspace
          const existingProjects = getFlutterProjects();
          if (!existingProjects.includes(folderPath)) {
            existingProjects.push(folderPath);
            await globalState?.update(FLUTTER_PROJECTS_KEY, existingProjects);
            vscode.window.showInformationMessage("Flutter project added!");
          }
          return;
        }
      }
      vscode.window.showErrorMessage(
        "Selected folder is not a Flutter project"
      );
    } catch (error) {
      vscode.window.showErrorMessage(`Error adding project: ${error}`);
    }
  }
}

export function getCurrentAppDetails(projectPath: string) {
  try {
    let appName = "Unknown";

    // Get app name from AndroidManifest.xml instead of pubspec.yaml
    const manifestPath = path.join(
      projectPath,
      "android",
      "app",
      "src",
      "main",
      "AndroidManifest.xml"
    );

    if (fs.existsSync(manifestPath)) {
      const manifestContent = fs.readFileSync(manifestPath, "utf8");
      const labelMatch = manifestContent.match(
        /android:label=["']([^"']+)["']/
      );
      if (labelMatch?.[1]) {
        appName = labelMatch[1];
      }
    }

    // If app name not found in manifest, fallback to pubspec.yaml
    if (appName === "Unknown") {
      const pubspecPath = path.join(projectPath, "pubspec.yaml");
      if (fs.existsSync(pubspecPath)) {
        const pubspecContent = fs.readFileSync(pubspecPath, "utf8");
        appName =
          pubspecContent.match(/name:\s*(.*)/)?.[1]?.trim() || "Unknown";
      }
    }

    // Get Android package name from build.gradle or build.gradle.kts
    let packageName = "";
    const gradlePath = path.join(projectPath, "android", "app");
    const buildGradlePath = path.join(gradlePath, "build.gradle");
    const buildGradleKtsPath = path.join(gradlePath, "build.gradle.kts");

    if (fs.existsSync(buildGradleKtsPath)) {
      // Handle Kotlin DSL build file
      const buildGradleContent = fs.readFileSync(buildGradleKtsPath, "utf8");
      const applicationIdMatch = buildGradleContent.match(
        /applicationId\s*=\s*"([\w.]+)"/
      );
      if (applicationIdMatch?.[1]) {
        packageName = applicationIdMatch[1];
        console.log("Found package name from build.gradle.kts:", packageName);
      }
    } else if (fs.existsSync(buildGradlePath)) {
      // Handle Groovy build file
      const buildGradleContent = fs.readFileSync(buildGradlePath, "utf8");
      const applicationIdMatch = buildGradleContent.match(
        /applicationId\s*=?\s*['"]([\w.]+)['"]/
      );
      if (applicationIdMatch?.[1]) {
        packageName = applicationIdMatch[1];
        console.log("Found package name from build.gradle:", packageName);
      }
    }

    // If Android package not found, try iOS bundle identifier
    if (!packageName) {
      const iosPlistPath = path.join(
        projectPath,
        "ios",
        "Runner",
        "Info.plist"
      );
      if (fs.existsSync(iosPlistPath)) {
        const plistContent = fs.readFileSync(iosPlistPath, "utf8");
        const bundleIdMatch = plistContent.match(
          /<key>CFBundleIdentifier<\/key>\s*<string>([^<]+)<\/string>/
        );
        if (bundleIdMatch?.[1]) {
          let iosBundleId = bundleIdMatch[1];

          // Handle $(PRODUCT_BUNDLE_IDENTIFIER)
          if (iosBundleId === "$(PRODUCT_BUNDLE_IDENTIFIER)") {
            // Try to get the actual bundle ID from project.pbxproj
            const pbxprojPath = path.join(
              projectPath,
              "ios",
              "Runner.xcodeproj",
              "project.pbxproj"
            );
            if (fs.existsSync(pbxprojPath)) {
              const pbxprojContent = fs.readFileSync(pbxprojPath, "utf8");
              // Look for PRODUCT_BUNDLE_IDENTIFIER setting
              const pbxprojBundleMatch = pbxprojContent.match(
                /PRODUCT_BUNDLE_IDENTIFIER\s*=\s*"([^"]+)"/
              );
              if (pbxprojBundleMatch?.[1]) {
                iosBundleId = pbxprojBundleMatch[1];
              }
            }
          }

          // Only set packageName if we found a valid bundle ID
          if (iosBundleId && iosBundleId !== "$(PRODUCT_BUNDLE_IDENTIFIER)") {
            packageName = iosBundleId;
          }
        }
      }
    }

    // Fallback to default if no package name found
    if (!packageName) {
      packageName = `com.example.${appName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")}`;
    }

    return {
      appName,
      packageName,
      // Add additional details that might be useful
      paths: {
        android: fs.existsSync(path.join(projectPath, "android")),
        ios: fs.existsSync(path.join(projectPath, "ios")),
      },
    };
  } catch (error) {
    vscode.window.showErrorMessage(`Error getting project details: ${error}`);
    return {
      appName: "Unknown",
      packageName: "com.example.app",
      paths: {
        android: false,
        ios: false,
      },
    };
  }
}

// Add function to remove project from history
export async function removeFlutterProject(projectPath: string): Promise<void> {
  const projects = getFlutterProjects();
  const updatedProjects = projects.filter((p) => p !== projectPath);
  await globalState?.update(FLUTTER_PROJECTS_KEY, updatedProjects);
}
