import { getCurrentAppDetails } from "../utils/FileUtils";
import { renameFlutterProject } from "../utils/RenameUtils";

export class RenamePanel {
  public static getTabContent(projectPath: string): string {
    const { appName, packageName } = getCurrentAppDetails(projectPath);

    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        padding: 0;
                        margin: 0;
                        font-family: var(--vscode-font-family);
                        color: var(--vscode-foreground);
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 40px;
                    }
                    .header {
                        margin-bottom: 32px;
                    }
                    .header h2 {
                        margin: 0 0 8px 0;
                        font-size: 24px;
                        font-weight: 500;
                        color: var(--vscode-foreground);
                    }
                    .header p {
                        margin: 0;
                        color: var(--vscode-descriptionForeground);
                        font-size: 14px;
                        line-height: 1.5;
                    }
                    .project-info {
                        background: var(--vscode-textBlockQuote-background);
                        border-left: 4px solid var(--vscode-textBlockQuote-border);
                        padding: 16px;
                        margin-bottom: 32px;
                        border-radius: 6px;
                    }
                    .project-info h3 {
                        margin: 0 0 8px 0;
                        font-size: 14px;
                        font-weight: 600;
                    }
                    .project-path {
                        font-family: var(--vscode-editor-font-family);
                        font-size: 13px;
                        color: var(--vscode-textPreformat-foreground);
                        word-break: break-all;
                        padding: 4px 8px;
                        border-radius: 4px;
                    }
                    .form-section {
                        background: var(--vscode-editor-background);
                        border-radius: 8px;
                        padding: 24px;
                        margin-bottom: 24px;
                    }
                    .form-group {
                        margin-bottom: 24px;
                        position: relative;
                    }
                    .form-group:last-child {
                        margin-bottom: 0;
                    }
                    label {
                        display: block;
                        margin-bottom: 8px;
                        font-size: 14px;
                        font-weight: 500;
                    }
                    .input-wrapper {
                        position: relative;
                    }
                    input {
                        width: 100%;
                        padding: 10px 12px;
                        background: var(--vscode-input-background);
                        color: var(--vscode-input-foreground);
                        border: 1px solid var(--vscode-input-border);
                        border-radius: 6px;
                        font-size: 14px;
                        transition: border-color 0.2s;
                    }
                    input:focus {
                        outline: none;
                        border-color: var(--vscode-focusBorder);
                    }
                    .error-message {
                        color: var(--vscode-errorForeground);
                        font-size: 12px;
                        margin-top: 4px;
                        display: none;
                    }
                    .form-group.error input {
                        border-color: var(--vscode-errorForeground);
                    }
                    .form-group.error .error-message {
                        display: block;
                    }
                    .form-group.error input:focus {
                        border-color: var(--vscode-errorForeground);
                        box-shadow: 0 0 0 1px var(--vscode-errorForeground);
                    }
                    .actions {
                        margin-top: 32px;
                        display: flex;
                        gap: 12px;
                        justify-content: center;
                    }

                    .primary-button {
                        background: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        min-width: 200px;
                    }
                        font-size: 13px;
                        font-weight: 500;
                        min-width: 200px;
                        transition: background-color 0.2s;
                    }
                    .primary-button:hover {
                        background: var(--vscode-button-hoverBackground);
                    }
                    .primary-button:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                    }
                    .loading {
                        pointer-events: none;
                        opacity: 0.7;
                    }
                    .platform-selection {
                        margin-top: 24px;
                        padding-top: 24px;
                    }
                    
                    .platform-selection h3 {
                        margin: 0 0 16px 0;
                        font-size: 14px;
                        font-weight: 500;
                    }
                    
                    .checkbox-group {
                        display: flex;
                        gap: 24px;
                    }
                    
                    .checkbox-wrapper {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    
                    .checkbox-wrapper input[type="checkbox"] {
                        width: 16px;
                        height: 16px;
                        margin: 0;
                        cursor: pointer;
                    }
                    
                    .checkbox-wrapper label {
                        margin: 0;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    
                    .platform-icon {
                        width: 16px;
                        height: 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .checkbox-wrapper.disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                    
                    .checkbox-wrapper.disabled * {
                        cursor: not-allowed;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Rename Flutter Project</h2>
                        <p>Update your app's display name and package identifier</p>
                    </div>

                    <div class="project-info">
                        <h3>Current Project</h3>
                        <div class="project-path">${projectPath}</div>
                    </div>

                    <form id="renameForm" class="form-section">
                        <div class="form-group" id="appNameGroup">
                            <label for="appName">App Name</label>
                            <div class="input-wrapper">
                                <input 
                                    type="text"
                                    id="appName" 
                                    value="${appName}" 
                                    placeholder="My Awesome App"
                                    onInput="validateInputs()"
                                >
                            </div>
                            <div class="error-message" id="appNameError"></div>
                        </div>

                        <div class="form-group" id="packageNameGroup">
                            <label for="packageName">Package Name</label>
                            <div class="input-wrapper">
                                <input 
                                    type="text"
                                    id="packageName" 
                                    value="${packageName}" 
                                    placeholder="com.example.myapp"
                                    onInput="validateInputs()"
                                >
                            </div>
                            <div class="error-message" id="packageNameError"></div>
                        </div>

                        <div class="platform-selection">
                            <h3>Select Platforms to Rename</h3>
                            <div class="checkbox-group">
                                <div class="checkbox-wrapper">
                                    <input 
                                        type="checkbox" 
                                        id="androidPlatform"
                                        checked 
                                        onChange="validateInputs()"
                                    >
                                    <label for="androidPlatform">Android</label>
                                </div>
                                <div class="checkbox-wrapper">
                                    <input 
                                        type="checkbox" 
                                        id="iosPlatform"
                                        checked 
                                        onChange="validateInputs()"
                                    >
                                    <label for="iosPlatform">iOS</label>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div class="actions">
                        <button id="renameButton" class="primary-button" onclick="submitForm()" disabled>
                            Update Project
                        </button>
                    </div>
                </div>

                <script>
                    const vscode = acquireVsCodeApi();

                    function showError(elementId, errorMessage) {
                        const group = document.getElementById(elementId + 'Group');
                        const errorElement = document.getElementById(elementId + 'Error');
                        
                        if (errorMessage) {
                            group.classList.add('error');
                            errorElement.textContent = errorMessage;
                        } else {
                            group.classList.remove('error');
                            errorElement.textContent = '';
                        }
                    }

                    function validateInputs() {
                        const appName = document.getElementById('appName').value.trim();
                        const packageName = document.getElementById('packageName').value.trim();
                        const android = document.getElementById('androidPlatform').checked;
                        const ios = document.getElementById('iosPlatform').checked;
                        const button = document.getElementById('renameButton');

                        let isValid = true;

                        // Validate app name
                        if (!appName) {
                            showError('appName', 'App name is required');
                            isValid = false;
                        } else if (appName.length < 2) {
                            showError('appName', 'App name must be at least 2 characters');
                            isValid = false;
                        } else {
                            showError('appName', '');
                        }

                        // Validate package name
                        if (!packageName) {
                            showError('packageName', 'Package name is required');
                            isValid = false;
                        } else if (!/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/.test(packageName)) {
                            showError('packageName', 'Invalid package name format (e.g., com.example.myapp)');
                            isValid = false;
                        } else {
                            showError('packageName', '');
                        }

                        // Validate platforms
                        if (!android && !ios) {
                            isValid = false;
                        }

                        // Enable/disable button
                        button.disabled = !isValid;
                    }

                    function submitForm() {
                        const appName = document.getElementById('appName').value.trim();
                        const packageName = document.getElementById('packageName').value.trim();
                        const android = document.getElementById('androidPlatform').checked;
                        const ios = document.getElementById('iosPlatform').checked;

                        vscode.postMessage({
                            command: 'rename',
                            newAppName: appName,
                            newPackageName: packageName,
                            platforms: {
                                android,
                                ios
                            }
                        });

                        document.getElementById('renameButton').disabled = true;
                        document.body.classList.add('loading');
                    }

                    // Run initial validation
                    validateInputs();
                </script>
            </body>
            </html>
        `;
  }

  public static handleRenameMessage(projectPath: string, message: any): void {
    if (message.command === "rename") {
      renameFlutterProject(
        projectPath,
        message.newAppName,
        message.newPackageName,
        message.platforms
      );
    }
  }
}
