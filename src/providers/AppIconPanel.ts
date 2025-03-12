export class AppIconPanel {
  public static getTabContent(projectPath: string): string {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        padding: 32px;
                        font-family: var(--vscode-font-family);
                        color: var(--vscode-foreground);
                        margin: 0 auto;
                        max-width: 800px;
                    }
                    h2 {
                        margin-bottom: 24px;
                        font-size: 24px;
                        font-weight: 500;
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
                    .icon-section {
                        border: 2px dashed var(--vscode-input-border);
                        border-radius: 8px;
                        padding: 32px;
                        text-align: center;
                        margin-bottom: 24px;
                    }
                    .icon-preview {
                        max-width: 200px;
                        max-height: 200px;
                        margin-bottom: 16px;
                        background: var(--vscode-editor-background);
                        border-radius: 8px;
                        padding: 8px;
                    }
                    .upload-button {
                        background: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        margin-right: 8px;
                    }
                    .description {
                        font-size: 13px;
                        color: var(--vscode-descriptionForeground);
                        margin-top: 16px;
                    }
                    .platform-selection {
                        margin-top: 24px;
                        padding: 16px;
                        background: var(--vscode-editor-background);
                        border-radius: 8px;
                    }
                    .checkbox-group {
                        display: flex;
                        gap: 24px;
                        margin-top: 12px;
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
                    }
                    .apply-button {
                        background: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        margin-top: 24px;
                        min-width: 200px;
                    }
                    .apply-button:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                    }
                    .status-message {
                        margin-top: 16px;
                        padding: 12px;
                        border-radius: 6px;
                        display: none;
                    }
                    .success-message {
                        background: var(--vscode-terminal-ansiGreen);
                        color: var(--vscode-editor-background);
                    }
                    .error-message {
                        background: var(--vscode-terminal-ansiRed);
                        color: var(--vscode-editor-background);
                    }
                </style>
            </head>
            <body>
                <h2>Change App Icon</h2>
                
                <div class="project-info">
                    <h3>Current Project</h3>
                    <div class="project-path">${projectPath}</div>
                </div>
                
                <div class="icon-section">
                    <img id="iconPreview" class="icon-preview" src="" style="display: none;">
                    <div id="uploadPrompt">
                        <p>Click the button below to select an image</p>
                    </div>
                    <div>
                        <input type="file" id="iconInput" accept="image/png" style="display: none;">
                        <button class="upload-button" onclick="document.getElementById('iconInput').click()">Select Icon</button>
                        <button class="upload-button" id="clearButton" style="display: none;" onclick="clearIcon()">Clear</button>
                    </div>
                    <div class="description">
                        Recommended size: 1024x1024 pixels<br>
                        Supported formats: PNG
                    </div>
                </div>

                <div class="platform-selection">
                    <h3>Select platforms to update:</h3>
                    <div class="checkbox-group">
                        <div class="checkbox-wrapper">
                            <input type="checkbox" id="androidPlatform" checked>
                            <label for="androidPlatform">Android</label>
                        </div>
                        <div class="checkbox-wrapper">
                            <input type="checkbox" id="iosPlatform" checked>
                            <label for="iosPlatform">iOS</label>
                        </div>
                    </div>
                </div>

                <div style="text-align: center;">
                    <button id="applyButton" class="apply-button" disabled onclick="applyIcon()">Update App Icon</button>
                </div>

                <script>
                    const vscode = acquireVsCodeApi();
                    let iconData = null;
                    
                    // Set up file input listener
                    document.getElementById('iconInput').addEventListener('change', handleFileSelect);
                    
                    function handleFileSelect(event) {
                        const file = event.target.files[0];
                        if (file) {
                            if (file.type === 'image/png') {
                                handleFile(file);
                            } else {
                                showMessage('Please select a PNG image', 'error');
                            }
                        }
                    }
                    
                    function handleFile(file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const img = document.getElementById('iconPreview');
                            img.src = e.target.result;
                            img.style.display = 'inline-block';
                            document.getElementById('uploadPrompt').style.display = 'none';
                            document.getElementById('clearButton').style.display = 'inline-block';
                            document.getElementById('applyButton').disabled = false;
                            
                            iconData = e.target.result.split(',')[1];
                        };
                        reader.readAsDataURL(file);
                    }
                    
                    function clearIcon() {
                        const img = document.getElementById('iconPreview');
                        img.src = '';
                        img.style.display = 'none';
                        document.getElementById('uploadPrompt').style.display = 'block';
                        document.getElementById('clearButton').style.display = 'none';
                        document.getElementById('iconInput').value = '';
                        document.getElementById('applyButton').disabled = true;
                        iconData = null;
                    }
                    
                    function applyIcon() {
                        if (!iconData) {
                            showMessage('Please select an icon image first', 'error');
                            return;
                        }
                        
                        const platforms = {
                            android: document.getElementById('androidPlatform').checked,
                            ios: document.getElementById('iosPlatform').checked
                        };
                        
                        if (!platforms.android && !platforms.ios) {
                            showMessage('Please select at least one platform', 'error');
                            return;
                        }
                        
                        const applyButton = document.getElementById('applyButton');
                        applyButton.disabled = true;
                        applyButton.textContent = 'Updating...';
                        
                        vscode.postMessage({
                            command: 'updateIcon',
                            projectPath: '${projectPath}',
                            iconData: iconData,
                            platforms: platforms
                        });
                    }
                    
                    function showMessage(message, type) {
                        const statusElement = document.getElementById('statusMessage');
                        statusElement.textContent = message;
                        statusElement.className = 'status-message ' + (type === 'error' ? 'error-message' : 'success-message');
                        statusElement.style.display = 'block';
                        
                        // Auto-hide after 5 seconds
                        setTimeout(() => {
                            statusElement.style.display = 'none';
                        }, 5000);
                    }
                    
                    // Listen for messages from the extension
                    window.addEventListener('message', event => {
                        const message = event.data;
                        
                        if (message.command === 'iconUpdateSuccess') {   
                            // Reset UI state
                            const img = document.getElementById('iconPreview');
                            img.src = '';
                            img.style.display = 'none';
                            document.getElementById('uploadPrompt').style.display = 'block';
                            document.getElementById('clearButton').style.display = 'none';
                            document.getElementById('iconInput').value = '';
                            iconData = null;
                            
                            // Reset button state
                            const applyButton = document.getElementById('applyButton');
                            applyButton.disabled = true;
                            applyButton.textContent = 'Update App Icon';
                            
                            showMessage(message.message || 'App icon updated successfully!', 'success');
                        } else if (message.command === 'iconUpdateError') {
                            showMessage(message.message || 'Error updating icon', 'error');
                            const applyButton = document.getElementById('applyButton');
                            applyButton.disabled = false;
                            applyButton.textContent = 'Update App Icon';
                        }
                    });
                </script>
            </body>
            </html>
        `;
  }
}
