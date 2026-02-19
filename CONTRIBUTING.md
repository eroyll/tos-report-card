# Contributing to TOS Report Card

Thank you for your interest in contributing! TOS Report Card is an open source project dedicated to making Terms of Service more accessible and understandable for everyone.

## 🎯 Project Mission

Our goal is to bring transparency to legal agreements that most people never read but are forced to accept. Every contribution should support this mission of clarity, privacy, and user empowerment.

---

## 🤝 How to Contribute

### Reporting Bugs

Found a bug? Please open an issue with:
- **Description:** What happened vs. what you expected
- **Steps to reproduce:** Detailed steps to recreate the issue
- **Environment:** Browser version, OS, extension version
- **Screenshots:** If applicable

### Suggesting Features

Have an idea? Open an issue with:
- **Problem:** What problem does this solve?
- **Proposed solution:** How would it work?
- **Alternatives:** Other approaches you considered
- **Impact:** Who benefits and how?

### Contributing Code

1. **Fork the repository** and create a new branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards (see below)

3. **Test thoroughly**
   - Load the extension unpacked in Chrome
   - Test on multiple TOS pages (simple and complex)
   - Verify no console errors

4. **Commit with clear messages**
   ```bash
   git commit -m "Add: Feature description"
   # or
   git commit -m "Fix: Bug description"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Describe your PR**
   - What does it do?
   - Why is it needed?
   - How was it tested?
   - Any breaking changes?

---

## 📝 Coding Standards

### JavaScript Style

- Use **vanilla JavaScript** (no frameworks/build tools)
- Use **const** and **let** (no var)
- Use **async/await** over callbacks
- Add comments for complex logic
- Keep functions small and focused

### Code Organization

```
extension/
├── manifest.json       # Extension configuration
├── background/         # Background service worker
├── popup/             # Extension popup UI
├── icons/             # Extension icons
└── README.md          # Installation guide
```

### Naming Conventions

- **Files:** lowercase with hyphens (`popup.js`, `background.js`)
- **Functions:** camelCase (`analyzeURL`, `showError`)
- **Constants:** UPPER_SNAKE_CASE (`API_URL`)
- **CSS classes:** kebab-case (`grade-letter`, `red-flags-section`)

---

## 🧪 Testing Guidelines

Before submitting a PR, test on:

**Simple TOS pages:**
- https://signal.org/legal/
- https://duckduckgo.com/privacy

**Complex TOS pages:**
- https://www.facebook.com/privacy/policy/
- https://policies.google.com/terms

**Edge cases:**
- Pages requiring login
- Single-page apps
- Pages with dynamic content loading

---

## 🚫 What We Don't Accept

- Code that compromises user privacy
- Features that require users to create accounts
- Tracking or analytics of any kind
- Dependencies on closed-source libraries
- Code that violates Chrome Web Store policies

---

## 🎨 UI/UX Guidelines

- **Mobile-first:** Design for small screens
- **Accessibility:** Use semantic HTML, ARIA labels, keyboard navigation
- **Performance:** Keep popup fast (<200ms load time)
- **Clarity:** Users should understand results without explanation

---

## 🔒 Security Guidelines

- **Never hardcode secrets** (API keys, passwords, tokens)
- **Validate all inputs** before processing
- **Use HTTPS only** for API calls
- **Minimize permissions** — only request what's absolutely necessary
- **Sanitize user-generated content** before displaying

---

## 📄 Documentation

When adding features, update:
- README.md (if user-facing)
- Code comments (for complex logic)
- This CONTRIBUTING.md (if changing contribution workflow)

---

## 💡 Good First Issues

New to the project? Look for issues tagged `good first issue`:
- UI improvements
- Bug fixes
- Documentation updates
- Test coverage

---

## ❓ Questions?

- **General questions:** Open a GitHub Discussion
- **Bug reports:** Open a GitHub Issue
- **Security concerns:** Email [your-email@example.com] privately

---

## 🙏 Recognition

All contributors will be recognized in the README. Thank you for making the internet more transparent!

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of:
- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience
- Nationality, personal appearance
- Race, religion, or sexual identity and orientation

### Our Standards

**Positive behaviors:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Accepting constructive criticism gracefully
- Focusing on what's best for the community

**Unacceptable behaviors:**
- Harassment, trolling, or insulting comments
- Publishing others' private information
- Other conduct inappropriate in a professional setting

### Enforcement

Violations can be reported to [your-email@example.com]. All complaints will be reviewed and investigated promptly and fairly.

---

## 📬 Contact

**Maintainer:** Emily Royall  
**Website:** [tosreportcard.com](https://tosreportcard.com)  
**Email:** [your-email@example.com]

Thank you for contributing! 🚀
