# TOS Report Card - Chrome Extension

This folder contains the Chrome extension source code.

## Installation (Development)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select this `extension/` folder
5. The extension icon will appear in your toolbar

## Testing

Navigate to any Terms of Service page, such as:
- https://signal.org/legal/
- https://duckduckgo.com/privacy
- https://www.facebook.com/privacy/policy/

Click the extension icon to analyze the page!

## File Structure

```
extension/
├── manifest.json          # Extension configuration
├── background/
│   └── background.js      # Service worker
├── icons/
│   ├── icon-16.png       # Extension icons
│   ├── icon-48.png
│   └── icon-128.png
└── popup/
    ├── popup.html        # Extension UI
    ├── popup.css         # Styling
    └── popup.js          # Logic
```

## Permissions

This extension requests minimal permissions:
- `activeTab` - Read current page when clicked
- `scripting` - Extract text from page
- `host_permissions` (api.anthropic.com) - Send text to AI

## Making Changes

After editing any files:
1. Go to `chrome://extensions/`
2. Click the refresh icon on the TOS Report Card extension
3. Test your changes

---

For more information, see the main [README](../README.md) in the project root.
