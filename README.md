# LeetCode Friends

A Chrome Extension that lets you track your LeetCode friends directly inside LeetCode with a live sidebar.

---

## Features

- Track LeetCode friends inside a sidebar on LeetCode
- Uses Chrome Storage API for saving data locally
- Works directly on `leetcode.com`

---

## Installation (Development Mode)

1. Clone the repo:

```bash
git clone https://github.com/your-username/leetcode-friends.git
```

2. Install dependencies (if applicable):

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Open Chrome and go to:

```
chrome://extensions/
```

5. Enable **Developer Mode**

6. Click **Load unpacked**

7. Select the `dist/` folder

---

## Permissions

This extension uses:

- `storage` → Save user preferences locally
- `https://leetcode.com/*` → Inject UI sidebar into LeetCode pages

No data is collected or sent externally.

---

## Disclaimer

This project is not affiliated with LeetCode. It is an independent tool built for recreational purposes.
