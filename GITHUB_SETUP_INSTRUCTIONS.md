# GitHub Repository Setup Instructions

## Step 1: Create the Repository on GitHub

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name:** `tos-report-card`
   - **Description:** "Instant A-F grades for Terms of Service. Stop blindly accepting."
   - **Visibility:** Public ✅
   - **Initialize:** Leave ALL checkboxes UNCHECKED (we already have these files)
3. Click "Create repository"

## Step 2: Upload Your Files

You have two options:

### Option A: Upload via GitHub Web Interface (Easiest)

1. After creating the repo, you'll see an empty page
2. Click "uploading an existing file"
3. Drag and drop ALL files from the unzipped `TOS-Report-Card-GitHub-Repo` folder
4. Add commit message: "Initial commit: TOS Report Card v1.1.5"
5. Click "Commit changes"

### Option B: Upload via Command Line (If you use Git)

```bash
# Unzip the repo files to a folder
unzip TOS-Report-Card-GitHub-Repo.zip -d tos-report-card
cd tos-report-card

# Initialize Git and push
git init
git add .
git commit -m "Initial commit: TOS Report Card v1.1.5"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tos-report-card.git
git push -u origin main
```

## Step 3: Customize the README

Edit these placeholders in `README.md`:
- `YOUR_USERNAME` → your GitHub username (appears in 3 places)
- `your-email@example.com` → your contact email (appears in 2 places)
- LinkedIn URL in the Acknowledgments section

You can edit directly on GitHub by clicking the pencil icon.

## Step 4: Add Topics/Tags

On your repo homepage:
1. Click the gear icon ⚙️ next to "About"
2. Add topics: `chrome-extension`, `privacy`, `terms-of-service`, `ai`, `transparency`, `open-source`
3. Save changes

## Step 5: Link in Product Hunt

Once the repo is live:
1. Go to your Product Hunt draft
2. Add the GitHub URL in the appropriate field
3. This will show the "Open Source" badge on your listing!

## What's Included

✅ **README.md** - Professional project overview with features, installation, architecture  
✅ **LICENSE** - MIT License (allows anyone to use/modify/distribute)  
✅ **CONTRIBUTING.md** - Guidelines for contributors  
✅ **.gitignore** - Ignores system files, secrets, build artifacts  
✅ **extension/** - All your extension source code  
✅ **extension/README.md** - Installation guide for developers  

## Your Repo URL Will Be

`https://github.com/YOUR_USERNAME/tos-report-card`

Replace `YOUR_USERNAME` with your actual GitHub username!

---

## Need Help?

If you run into any issues:
1. Double-check you're using "uploading an existing file" not "creating a new file"
2. Make sure ALL files from the zip are uploaded (including hidden files like `.gitignore`)
3. Ask me for help if anything's unclear!

Once it's live, share the link and I'll review it with you. 🚀
