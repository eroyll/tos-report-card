# TOS Report Card

**Instant A-F grades for Terms of Service and Privacy Policies.**

Stop blindly accepting terms you haven't read. TOS Report Card uses AI to analyze any Terms of Service or Privacy Policy in seconds, giving you a clear letter grade, plain-language summary, red flags, and highlights—so you can make informed decisions before clicking "I Accept."

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-brightgreen)](https://tosreportcard.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🎯 Why This Exists

Nobody reads Terms of Service until it's too late. Legal documents filled with jargon protect companies, not users. Rights get waived, data gets sold, and people have no recourse because they "agreed" to something they never understood.

**TOS Report Card brings transparency to the fine print.** Built by someone who advises governments on responsible AI and procurement, this tool applies the same principles of clarity and accountability to the agreements we encounter every day online.

---

## ✨ Features

- **⚡ Instant Analysis** — Get results in 2 seconds
- **🎯 A-F Letter Grades** — Know at a glance if terms are fair or predatory
- **📝 Plain Language Summaries** — No legal jargon, just clear explanations
- **🚨 Red Flags** — Highlights concerning clauses that deserve attention
- **✅ Highlights** — Shows positive terms that protect your rights
- **🔒 100% Private** — Your data never leaves your device (except the TOS text sent to the AI API for analysis)
- **🆓 Free Forever** — No account required, no paywall, no tracking

---

## 🛠️ How It Works

1. **User clicks the extension** on a page with Terms of Service
2. **Extension extracts the text** from the webpage
3. **Text is sent to Claude AI** (Anthropic) for analysis via a secure API
4. **AI returns a grade, summary, red flags, and highlights**
5. **Results display instantly** in the extension popup

### Architecture

```
┌──────────────┐      ┌──────────────────┐      ┌──────────────┐
│   Browser    │ ───> │ Cloudflare Worker│ ───> │ Anthropic AI │
│  Extension   │ <─── │   (API Proxy)    │ <─── │   (Claude)   │
└──────────────┘      └──────────────────┘      └──────────────┘
```

The extension never stores your Anthropic API key. All AI requests are proxied through a secure Cloudflare Worker that handles authentication server-side.

---

## 📦 Installation

### From Chrome Web Store (Recommended)

1. Visit [tosreportcard.com](https://tosreportcard.com)
2. Click "Add to Chrome"
3. Start analyzing!

### From Source (For Developers)

1. Clone this repository:
   ```bash
   git clone https://github.com/eroyll/tos-report-card.git
   cd tos-report-card
   ```

2. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `extension/` folder from this repo

3. Navigate to any Terms of Service page and click the extension icon!

---

## 🔒 Privacy & Security

**Your privacy matters.** Here's exactly what data is collected and how it's used:

- **TOS text is sent to Claude AI** for analysis (required for grading)
- **No browsing history is tracked** — the extension only reads pages when you click it
- **No personal data is collected** — we don't store names, emails, or any identifiable information
- **No analytics or tracking scripts** — zero telemetry
- **API key is never exposed** — stored securely server-side in the Cloudflare Worker

The extension requests only the minimum permissions needed:
- `activeTab` — Read the current page when you click the icon
- `scripting` — Extract text from the page for analysis
- `host_permissions` (api.anthropic.com) — Send text to AI for grading

---

## 🤝 Contributing

Contributions are welcome! Whether you're fixing bugs, adding features, or improving documentation, your help makes this tool better for everyone.

### How to Contribute

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Ideas for Contributions

- Add support for more languages (currently English only)
- Improve text extraction for complex page layouts
- Add dark mode to the popup UI
- Create a Firefox version
- Improve grading criteria and red flag detection

---

## 🏗️ Development Setup

```bash
# Clone the repo
git clone https://github.com/eroyll/tos-report-card.git
cd tos-report-card

# Load extension in Chrome (see Installation section above)

# Make changes to files in extension/

# Reload extension in chrome://extensions/ to test
```

No build process required — this is vanilla JavaScript!

---

## 📄 Tech Stack

- **Frontend:** Vanilla JavaScript, HTML, CSS
- **AI Analysis:** Claude 3.5 Sonnet (Anthropic)
- **API Proxy:** Cloudflare Workers
- **Manifest Version:** Chrome Extension Manifest V3

---

## 🗺️ Roadmap

- [x] Chrome extension v1.0
- [x] A-F grading system
- [x] Red flags and highlights
- [ ] PDF export (coming back in v1.2)
- [ ] Result caching for faster repeated visits
- [ ] Firefox extension
- [ ] Safari extension
- [ ] Comparison view (compare TOS from multiple sites)
- [ ] Historical tracking (see when terms changed)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support & Feedback

- **Website:** [tosreportcard.com](https://tosreportcard.com)
- **Issues:** [GitHub Issues](https://github.com/eroyll/tos-report-card/issues)
- **Email:** [tosreportcard@gmail.com]

---

## 🙏 Acknowledgments

Built by [Emily Royall](https://www.linkedin.com/in/emilybroyall/), a public-sector technology leader passionate about transparency, responsible AI, and digital rights.

Powered by [Claude AI](https://www.anthropic.com/) from Anthropic.

---

## ⭐ Like This Project?

If TOS Report Card helped you understand what you were agreeing to, consider:
- ⭐ Starring this repo
- 🐦 Sharing it on social media
- 🤝 Contributing code or ideas
- ☕ [Supporting development](https://buymeacoffee.com/tosreportcard)

**Digital rights shouldn't require a law degree to protect.** Let's make the internet more transparent together.
