import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export async function updateAppIcon(
  projectPath: string,
  logoData: string,
  platforms: { android: boolean; ios: boolean }
): Promise<void> {
  try {
    // Create a temporary directory to store the original image
    const tempDir = path.join(projectPath, ".flutter-build-temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Save the base64 image to a file
    const originalImagePath = path.join(tempDir, "original_icon.png");
    fs.writeFileSync(originalImagePath, Buffer.from(logoData, "base64"));

    // Process for Android if selected
    if (platforms.android) {
      await updateAndroidIcons(projectPath, originalImagePath);
    }

    // Process for iOS if selected
    if (platforms.ios) {
      await updateIOSIcons(projectPath, originalImagePath);
    }

    // Clean up temp directory
    fs.unlinkSync(originalImagePath);
    fs.rmdirSync(tempDir);

    // Create a message that includes which platforms were updated
    const platformsUpdated = [];
    if (platforms.android) {
      platformsUpdated.push("Android");
    }
    if (platforms.ios) {
      platformsUpdated.push("iOS");
    }

    vscode.window.showInformationMessage(
      `App icon updated successfully for ${platformsUpdated.join(", ")}!`
    );
  } catch (error) {
    vscode.window.showErrorMessage(`Error updating app icon: ${error}`);
    throw error;
  }
}

async function updateAndroidIcons(
  projectPath: string,
  originalImagePath: string
): Promise<void> {
  // Define Android mipmap directories and sizes
  const mipmapDirs = [
    { dir: "mipmap-mdpi", size: 48 },
    { dir: "mipmap-hdpi", size: 72 },
    { dir: "mipmap-xhdpi", size: 96 },
    { dir: "mipmap-xxhdpi", size: 144 },
    { dir: "mipmap-xxxhdpi", size: 192 },
  ];

  // Import required modules for image processing
  const sharp = await import("sharp");

  // Process each mipmap directory
  for (const { dir, size } of mipmapDirs) {
    const mipmapPath = path.join(
      projectPath,
      "android",
      "app",
      "src",
      "main",
      "res",
      dir
    );

    // Ensure directory exists
    if (!fs.existsSync(mipmapPath)) {
      fs.mkdirSync(mipmapPath, { recursive: true });
    }

    // Resize and save the icon
    await sharp
      .default(originalImagePath)
      .resize(size, size)
      .toFile(path.join(mipmapPath, "ic_launcher.png"));

    // Also create a round version for Android adaptive icons
    await sharp
      .default(originalImagePath)
      .resize(size, size)
      .toFile(path.join(mipmapPath, "ic_launcher_round.png"));
  }

  // Create adaptive icon background and foreground (Android 8.0+)
  const adaptiveIconPath = path.join(
    projectPath,
    "android",
    "app",
    "src",
    "main",
    "res",
    "mipmap-anydpi-v26"
  );

  if (!fs.existsSync(adaptiveIconPath)) {
    fs.mkdirSync(adaptiveIconPath, { recursive: true });
  }

  // Create XML files for adaptive icons
  const adaptiveIconXml = `<?xml version="1.0" encoding="utf-8"?>
  <adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
      <background android:drawable="@color/ic_launcher_background"/>
      <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
  </adaptive-icon>`;

  fs.writeFileSync(
    path.join(adaptiveIconPath, "ic_launcher.xml"),
    adaptiveIconXml
  );
  fs.writeFileSync(
    path.join(adaptiveIconPath, "ic_launcher_round.xml"),
    adaptiveIconXml
  );

  // Create a foreground image (usually the logo with transparent padding)
  const foregroundPath = path.join(
    projectPath,
    "android",
    "app",
    "src",
    "main",
    "res",
    "mipmap-xxxhdpi"
  );

  // Create foreground with padding (108dp format with 24dp padding)
  await sharp
    .default(originalImagePath)
    .resize(192, 192)
    .extend({
      top: 48,
      bottom: 48,
      left: 48,
      right: 48,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(path.join(foregroundPath, "ic_launcher_foreground.png"));

  // Create a color resource for the background
  const colorPath = path.join(
    projectPath,
    "android",
    "app",
    "src",
    "main",
    "res",
    "values"
  );

  if (!fs.existsSync(colorPath)) {
    fs.mkdirSync(colorPath, { recursive: true });
  }

  const colorXml = `<?xml version="1.0" encoding="utf-8"?>
  <resources>
      <color name="ic_launcher_background">#FFFFFF</color>
  </resources>`;

  fs.writeFileSync(
    path.join(colorPath, "ic_launcher_background.xml"),
    colorXml
  );
}

async function updateIOSIcons(
  projectPath: string,
  originalImagePath: string
): Promise<void> {
  // Define iOS icon sizes
  const iosIconSizes = [
    { size: 20, scales: [1, 2, 3] },
    { size: 29, scales: [1, 2, 3] },
    { size: 40, scales: [1, 2, 3] },
    { size: 60, scales: [2, 3] },
    { size: 76, scales: [1, 2] },
    { size: 83.5, scales: [2] },
    { size: 1024, scales: [1] }, // App Store
  ];

  // Import required modules for image processing
  const sharp = await import("sharp");

  // Create Assets.xcassets/AppIcon.appiconset directory if it doesn't exist
  const appIconPath = path.join(
    projectPath,
    "ios",
    "Runner",
    "Assets.xcassets",
    "AppIcon.appiconset"
  );

  if (!fs.existsSync(appIconPath)) {
    fs.mkdirSync(appIconPath, { recursive: true });
  }

  // Generate Contents.json file
  const contentsJson = {
    images: [],
    info: {
      version: 1,
      author: "flutter-build",
    },
  };

  // Generate all icon sizes
  for (const { size, scales } of iosIconSizes) {
    for (const scale of scales) {
      const pixelSize = Math.floor(size * scale);
      const filename = `Icon-App-${size}x${size}@${scale}x.png`;

      // Add to Contents.json
      (contentsJson.images as any[]).push({
        size: `${size}x${size}`,
        idiom: size === 1024 ? "ios-marketing" : "iphone",
        filename,
        scale: `${scale}x`,
      });

      // Generate the resized image
      await sharp
        .default(originalImagePath)
        .resize(pixelSize, pixelSize)
        .toFile(path.join(appIconPath, filename));
    }
  }

  // Write Contents.json
  fs.writeFileSync(
    path.join(appIconPath, "Contents.json"),
    JSON.stringify(contentsJson, null, 2)
  );
}
