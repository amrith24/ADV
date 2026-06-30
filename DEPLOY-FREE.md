# Deploying Advalora Consulting for FREE — Idiot-Proof Guide

**What you're building:** Same site, same look, same feel — just hosted free instead of on Emergent.
**Total time:** ~35 minutes.
**Monthly cost:** $0 forever (until you cross 1,000 leads/month — a happy problem).

---

## What changes vs. the current Emergent setup

| Piece | Now (Emergent) | After (Free) |
|---|---|---|
| Frontend (the website you see) | Emergent server | Cloudflare Pages |
| Backend (the API) | FastAPI on Emergent | **Killed.** Replaced by Web3Forms. |
| Database | MongoDB on Emergent | **Killed.** Leads emailed to you directly. |
| Look & feel | — | **Zero change. Pixel-identical.** |

---

# PART 0 — Sign-ups you need (10 min, do these first)

Open these 3 sites in tabs and create free accounts in this order. Use the same email everywhere (`amrith.pujarie@advaloraconsulting.com`) to keep it simple.

1. **GitHub** → https://github.com/signup (your code lives here)
2. **Web3Forms** → https://web3forms.com (handles your lead form)
3. **Cloudflare** → https://dash.cloudflare.com/sign-up (hosts your website, free)

Also have your **domain registrar login** ready (wherever you bought `advaloraconsulting.com` — GoDaddy, Namecheap, BigRock, etc.).

---

# PART 1 — Push the code to GitHub (5 min)

1. In Emergent's chat, look at the top-right corner of the chat window → click **"Save to GitHub"**.
2. Click **"Connect to GitHub"** → log in → click **"Authorize Emergent"**.
3. Choose **"Create new repository"** → name it `advalora-consulting` → leave it **Public** (Cloudflare's free tier needs public, OR upgrade to Pro later).
4. Click **"Push"** / **"Save"**. Wait ~30 seconds.
5. **Confirm:** open `https://github.com/<your-username>/advalora-consulting` in a new tab. You should see folders: `backend`, `frontend`, `memory`, etc.

✅ Code is on GitHub.

---

# PART 2 — Get your Web3Forms key (3 min)

1. Open https://web3forms.com
2. In the big input box on the homepage, enter `amrith.pujarie@advaloraconsulting.com` and click **"Create Access Key"**.
3. Check your inbox for the verification email → click the link.
4. You'll see a key like `a1b2c3d4-e5f6-7890-abcd-ef1234567890`.
5. **COPY IT.** Paste it into a notepad. You'll need it in Part 3.

✅ Leads will now email you directly.

---

# PART 3 — Rewire the form (10 min, no install needed)

You'll edit one file directly on GitHub.

### 3.1 Open the file for editing

1. Go to `https://github.com/<your-username>/advalora-consulting/blob/main/frontend/src/pages/Landing.jsx`
2. Click the **pencil icon ✏️** (top-right of the code view).

### 3.2 Find the `submit` function

Press **Ctrl+F** (or **Cmd+F** on Mac) inside the editor → search for:
```
const submit = async (e) =>
```

You'll land on a block of code that starts:
```javascript
const submit = async (e) => {
  e.preventDefault();
  if (!form.name || !form.company ...
```
…and ends with:
```javascript
  } finally {
    setSubmitting(false);
  }
};
```

### 3.3 Replace that entire block with this:

```javascript
const WEB3FORMS_KEY = "PASTE_YOUR_KEY_HERE"; // <-- paste the UUID from Part 2

const submit = async (e) => {
  e.preventDefault();
  if (!form.name || !form.company || !form.email || !form.challenge) {
    toast.error("Please complete the required fields.");
    return;
  }
  setSubmitting(true);
  try {
    const fd = new FormData();
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", `New Advalora enquiry — ${form.company}`);
    fd.append("from_name", "Advalora Lead Form");
    fd.append("name", form.name);
    fd.append("role", form.role || "—");
    fd.append("company", form.company);
    fd.append("email", form.email);
    fd.append("phone", form.phone || "—");
    fd.append("challenge", form.challenge);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: fd,
    });
    const data = await res.json();
    if (data.success) {
      setSubmitted(true);
      toast.success("Received. Amrith will reply within one business day.");
      setForm({ name: "", role: "", company: "", email: "", phone: "", challenge: "" });
    } else {
      throw new Error(data.message || "Submission failed");
    }
  } catch (err) {
    console.error(err);
    toast.error("Submission failed. Please email us directly.");
  } finally {
    setSubmitting(false);
  }
};
```

### 3.4 Replace the placeholder

In the very first line of what you just pasted, change:
```javascript
const WEB3FORMS_KEY = "PASTE_YOUR_KEY_HERE";
```
to your real key, e.g.:
```javascript
const WEB3FORMS_KEY = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
```

### 3.5 Commit

Scroll to the bottom → in the **"Commit changes"** box type: `Switch lead form to Web3Forms` → click the green **Commit changes** button.

✅ Form is now serverless.

---

# PART 4 — Add a tiny redirect file so `/nda` works (2 min)

Static hosts return 404 for sub-routes unless told otherwise.

1. Go to `https://github.com/<your-username>/advalora-consulting/tree/main/frontend/public`
2. Click **Add file → Create new file**.
3. Name the file exactly: `_redirects` (yes, the underscore is mandatory, no extension).
4. Paste this single line into the file:
   ```
   /*  /index.html  200
   ```
5. Scroll down → commit message `Add SPA redirect` → **Commit new file**.

✅ The `/nda` page will now load correctly.

---

# PART 5 — Deploy on Cloudflare Pages (10 min)

1. Go to https://dash.cloudflare.com → log in.
2. Left sidebar → **Workers & Pages**.
3. Top right → **Create application** → click the **Pages** tab → **Connect to Git**.
4. Click **Connect GitHub** → authorize → select the `advalora-consulting` repository.
5. Click **Begin setup**.

### 5.1 Build settings — fill in exactly this:

| Field | Value |
|---|---|
| Project name | `advalora` (becomes `advalora.pages.dev`) |
| Production branch | `main` |
| Framework preset | **Create React App** |
| Build command | `yarn build` |
| Build output directory | `build` |
| Root directory **(click "Show advanced")** | `frontend` |

### 5.2 Environment variables — expand the section, add these two:

| Variable name | Value |
|---|---|
| `NODE_VERSION` | `20` |
| `REACT_APP_BACKEND_URL` | `https://api.web3forms.com` |

(The second one just satisfies the legacy code path. It's no longer used for leads.)

### 5.3 Deploy

Click **Save and Deploy**. Wait ~3 minutes. You'll see a green "Success" and a URL like `https://advalora.pages.dev`. **Open it in a new tab — confirm the site looks identical to what you have now.**

✅ Live on the internet.

---

# PART 6 — Point your domain (5 min + DNS wait 15–60 min)

1. In Cloudflare Pages → click your `advalora` project → **Custom domains** tab → **Set up a custom domain**.
2. Type `advaloraconsulting.com` → click **Continue**.

### If your domain is registered AT Cloudflare
Cloudflare auto-adds the records. Wait 60 seconds. Done.

### If your domain is registered ELSEWHERE (GoDaddy, Namecheap, BigRock, etc.)
Cloudflare will show you **DNS records** to add. They look like:

```
Type:   CNAME
Name:   @           (or "root" or "advaloraconsulting.com" — same thing)
Target: advalora.pages.dev

Type:   CNAME
Name:   www
Target: advalora.pages.dev
```

1. Open a new tab → log into your domain registrar.
2. Find **DNS Management** / **DNS Records** / **Manage DNS**.
3. **Delete any existing A or CNAME records** for `@` and `www` first.
4. Add the two CNAME records from Cloudflare exactly as shown.
5. Save.
6. Go back to Cloudflare Pages → wait. Status will change from "Verifying" → "Active" within 15–60 minutes. SSL certificate auto-issues.

7. Repeat the **www** custom-domain step in Cloudflare so both `advaloraconsulting.com` and `www.advaloraconsulting.com` work.

✅ `https://advaloraconsulting.com` is live.

---

# PART 7 — Smoke test (5 min)

1. Open `https://advaloraconsulting.com` in incognito mode.
2. Scroll through every section → make sure logo, fonts, image, ticker, hero rotation all look identical to the Emergent version.
3. **Submit the lead form** with a test entry: Name = `Test`, Company = `TestCorp`, Email = your-personal-gmail@gmail.com, Challenge = "Test submission".
4. Wait 30 seconds. Check `amrith.pujarie@advaloraconsulting.com` inbox — you should receive an email titled **"New Advalora enquiry — TestCorp"**.
5. Click the footer **"Confidential. NDA on request."** link → confirm the `/nda` page loads with the full agreement.
6. Open the site on your phone → confirm responsive layout.

✅ Site is live, leads flow to your inbox, NDA works.

---

# Updating the site later

Every time you want to change something:
1. Edit the file on GitHub (or push from your laptop).
2. Cloudflare detects the commit → auto-rebuilds in ~3 min.
3. Live site updates by itself. No FTP, no SSH, no "deployment" — just `git push`.

---

# Troubleshooting

| Symptom | Fix |
|---|---|
| Cloudflare build fails | Verify **Root Directory = `frontend`**, **Build command = `yarn build`**, **Output = `build`** |
| Site loads but `/nda` shows "404 Not Found" | Confirm `_redirects` file is at `frontend/public/_redirects` with one line: `/*  /index.html  200` |
| Form submits but no email | Open browser DevTools (F12) → Console tab → look for errors. Check Web3Forms dashboard "Submissions". Check **spam folder**. Verify the access key was copy-pasted correctly (no extra spaces). |
| Custom domain stuck "Verifying" | Wait 1 hour. Check DNS propagation at https://dnschecker.org — paste your domain, look for the CNAME record globally. |
| Logo missing on Cloudflare | The logo is hosted at `customer-assets.emergentagent.com`. If that ever goes offline, upload your logo JPG to `frontend/public/logo.jpg` and change the URL in `frontend/src/lib/constants.js` to `/logo.jpg`. |
| Want to undo and go back to Emergent | Just stop visiting the Cloudflare URL. Emergent deployment is independent — both can co-exist. |

---

# Free-tier limits (you will never hit these)

| Service | Free tier | When you'd outgrow it |
|---|---|---|
| Cloudflare Pages | Unlimited bandwidth, 500 builds/month, 100 custom domains | Never, for a consulting site |
| Web3Forms | Unlimited submissions, 1000 emails/month | At 33 leads/day — at which point pay $5/mo for unlimited |
| GitHub Public Repo | Unlimited | Never |

**Total monthly cost: $0.** Forever.

---

# Want me to do the form swap for you before you push to GitHub?

I can wire the Web3Forms code into `Landing.jsx` right now on the Emergent side so when you "Save to GitHub", the swap is already baked in and you can skip Part 3 entirely. Say the word.
