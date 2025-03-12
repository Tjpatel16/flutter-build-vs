import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export function renameFlutterProject(
  projectPath: string,
  newAppName: string,
  newPackageName: string,
  platforms: { android: boolean; ios: boolean }
) {
  try {
    // Update Android configuration - only if Android platform is selected
    if (platforms.android) {
      // Check for both build.gradle and build.gradle.kts
      const gradlePath = path.join(projectPath, "android", "app");
      const buildGradlePath = path.join(gradlePath, "build.gradle");
      const buildGradleKtsPath = path.join(gradlePath, "build.gradle.kts");

      if (fs.existsSync(buildGradleKtsPath)) {
        // Handle Kotlin DSL build file
        let gradleContent = fs.readFileSync(buildGradleKtsPath, "utf8");
        gradleContent = gradleContent.replace(
          /applicationId\s*=\s*"[^"]+"/g,
          `applicationId = "${newPackageName}"`
        );
        fs.writeFileSync(buildGradleKtsPath, gradleContent, "utf8");
      } else if (fs.existsSync(buildGradlePath)) {
        // Handle Groovy build file
        let gradleContent = fs.readFileSync(buildGradlePath, "utf8");
        gradleContent = gradleContent.replace(
          /applicationId\s*=\s*["'][^"']+["']/g,
          `applicationId = "${newPackageName}"`
        );
        fs.writeFileSync(buildGradlePath, gradleContent, "utf8");
      }

      // Rest of the Android manifest update remains the same
      const manifestPath = path.join(
        projectPath,
        "android",
        "app",
        "src",
        "main",
        "AndroidManifest.xml"
      );
      if (fs.existsSync(manifestPath)) {
        let manifestContent = fs.readFileSync(manifestPath, "utf8");
        // Update android:label attribute in the manifest
        manifestContent = manifestContent.replace(
          /android:label=["'][^"']*["']/g,
          `android:label="${newAppName}"`
        );
        fs.writeFileSync(manifestPath, manifestContent, "utf8");
      }
    }

    // Update iOS files - only if iOS platform is selected
    if (platforms.ios) {
      const iosPlistPath = path.join(
        projectPath,
        "ios",
        "Runner",
        "Info.plist"
      );
      if (fs.existsSync(iosPlistPath)) {
        // Update only app name in Info.plist
        let plistContent = fs.readFileSync(iosPlistPath, "utf8");
        plistContent = plistContent.replace(
          /(<key>CFBundleDisplayName<\/key>\s*<string>)[^<]+(<\/string>)/,
          `$1${newAppName}$2`
        );
        fs.writeFileSync(iosPlistPath, plistContent, "utf8");

        // Update package name in project.pbxproj
        const pbxprojPath = path.join(
          projectPath,
          "ios",
          "Runner.xcodeproj",
          "project.pbxproj"
        );
        if (fs.existsSync(pbxprojPath)) {
          let pbxprojContent = fs.readFileSync(pbxprojPath, "utf8");

          // Update the regex to match the exact format found in the file
          pbxprojContent = pbxprojContent.replace(
            /PRODUCT_BUNDLE_IDENTIFIER = [^;]+;/g,
            `PRODUCT_BUNDLE_IDENTIFIER = ${newPackageName};`
          );

          fs.writeFileSync(pbxprojPath, pbxprojContent, "utf8");
        }
      }
    }

    // Create a message that includes which platforms were updated
    const platformsUpdated = [];
    if (platforms.android) {
      platformsUpdated.push("Android");
    }
    if (platforms.ios) {
      platformsUpdated.push("iOS");
    }

    vscode.window.showInformationMessage(`Project updated successfully!
              App Name: ${newAppName}
              Package Name: ${newPackageName}
              Platforms: ${platformsUpdated.join(", ")}`);
  } catch (error) {
    vscode.window.showErrorMessage(`Error updating project: ${error}`);
    throw error;
  }
}
