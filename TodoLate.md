# TodoLate — Deferred Features

Items below are designed and ready to implement but **pending approval** before starting.

---

## AI Assist for Admin Updates

**Status: PENDING — awaiting co-owner financial approval**

### What it does
Two AI-powered buttons in the Add Update and Edit Update modals:

1. **✨ Suggest Title** — User writes the body text, clicks the button, and gets 3 short title options to choose from. Clicking a suggestion fills the title field.
2. **✨ Polish** — User writes a draft body, clicks the button, and gets a cleaned-up version with improved clarity and tone. User can accept or keep their original.

### Cost
- Model: Claude Haiku (cheapest available, fast)
- Cost per call: ~$0.001 (one tenth of a cent)
- At under 10 uses per year: **less than $0.01/year total**
- Recommendation: set a $5/month spending limit in the Anthropic console as a hard cap

### How it works (technical)
- Direct API calls from the React frontend using `fetch()`
- API key stored in `.env` as `REACT_APP_ANTHROPIC_API_KEY` (never committed to git)
- Admin section is behind Firebase Auth — only logged-in users can trigger calls
- New file: `src/admin/utils/aiUtils.js` with `suggestTitles(body)` and `polishBody(body)` helpers
- Changes to `src/admin/Updates.js` to wire in the buttons and loading states

### To implement (once approved)
1. Get API key from console.anthropic.com — set a $5/month spending limit
2. Add `REACT_APP_ANTHROPIC_API_KEY=your_key_here` to `.env`
3. Create `src/admin/utils/aiUtils.js`
4. Add AI buttons to both the Add Update and Edit Update modals in `src/admin/Updates.js`
