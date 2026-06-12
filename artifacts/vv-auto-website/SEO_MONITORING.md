# Google Search Console — Indexing Monitoring Checklist

Sitemap URL: `https://vvrepair.com/sitemap.xml`
Submitted to: Google Search Console → Sitemaps

---

## Recurring Check Schedule

| Cadence | Action |
|---------|--------|
| **Week 1–2 after launch** | Check daily — indexing is still ramping up |
| **Month 1** | Check weekly |
| **Ongoing** | Check monthly (or any time a new page is published) |

---

## Pages to Confirm Indexed

Check each URL in the **Coverage** report (Search Console → Index → Pages).
Every row below should reach **"Indexed"** status. Check off as confirmed.

### English pages
- [ ] `https://vvrepair.com/` — Home
- [ ] `https://vvrepair.com/about` — About
- [ ] `https://vvrepair.com/contact` — Contact
- [ ] `https://vvrepair.com/services/` — Services index
- [ ] `https://vvrepair.com/services/brake-repair`
- [ ] `https://vvrepair.com/services/collision-body-repair`
- [ ] `https://vvrepair.com/services/diagnostics`
- [ ] `https://vvrepair.com/services/engine-repair`
- [ ] `https://vvrepair.com/services/oil-change`
- [ ] `https://vvrepair.com/services/state-inspection`

### Vietnamese pages
- [ ] `https://vvrepair.com/vi/` — Home (VI)
- [ ] `https://vvrepair.com/vi/about` — About (VI)
- [ ] `https://vvrepair.com/vi/contact` — Contact (VI)
- [ ] `https://vvrepair.com/vi/services/` — Services index (VI)
- [ ] `https://vvrepair.com/vi/services/brake-repair`
- [ ] `https://vvrepair.com/vi/services/collision-body-repair`
- [ ] `https://vvrepair.com/vi/services/diagnostics`
- [ ] `https://vvrepair.com/vi/services/engine-repair`
- [ ] `https://vvrepair.com/vi/services/oil-change`
- [ ] `https://vvrepair.com/vi/services/state-inspection`

**Total: 20 URLs** (10 English + 10 Vietnamese)

---

## How to Check in Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Select the **vvrepair.com** property
3. In the left sidebar: **Index → Pages**
4. Use the filter **"Sitemap"** → select the submitted sitemap to narrow results
5. Switch between tabs:
   - **"All known pages"** — total count Google sees
   - **"Why pages aren't indexed"** — lists Excluded and Error reasons

---

## Investigating "Excluded" or "Error" Pages

### Common reasons and fixes

| Status | Likely Cause | Fix |
|--------|-------------|-----|
| **Crawled – currently not indexed** | Google found the page but chose not to index it yet | Wait 1–2 weeks; check for thin content or near-duplicate pages |
| **Discovered – currently not indexed** | Page is in the sitemap queue but not yet crawled | Wait; request indexing manually via the URL Inspection tool |
| **Redirect** | The URL in the sitemap redirects to a different URL | Update the sitemap to use the final destination URL |
| **Soft 404** | Page returns 200 but looks empty or error-like to Google | Ensure each page has meaningful, unique content |
| **Blocked by robots.txt** | `robots.txt` has a `Disallow` rule covering the URL | Check `robots.txt`; the current file only blocks `/built-by`, so this should not affect listed pages |
| **Duplicate without user-selected canonical** | Google found a better canonical than the one served | Add or fix `<link rel="canonical">` on the affected page |
| **hreflang errors** | Mismatched alternate URLs between the en and vi versions | See hreflang section below |

### Steps to fix an excluded page
1. Open **URL Inspection** in Search Console and paste the URL
2. Read the "Coverage" section for the specific reason
3. Apply the relevant fix from the table above
4. Click **"Request Indexing"** to re-submit that URL
5. Recheck after 3–5 days

---

## hreflang Validation

The sitemap uses the `xhtml:link` annotation pattern. Each URL must:
- Reference **itself** as one of the alternates
- Include **both** `hreflang="en"` and `hreflang="vi"` on every page
- Point the `hreflang="x-default"` alternate to the English version

### Current sitemap status ✅
Every `<url>` block in `sitemap.xml` has all three annotations, and the
`x-default` alternate consistently points to the English URL. No hreflang
errors are expected from the sitemap file itself.

### To confirm no hreflang errors in Search Console
1. Go to **Index → Pages → Why pages aren't indexed**
2. Look for the reason **"Alternate page with proper canonical tag"** — a small
   number is normal (Google picks one canonical for hreflang pairs); a large
   number may indicate a misconfiguration
3. Cross-check with the **International Targeting** report under
   **Experience → International targeting** → **Language** tab — it should
   show no errors for the `en` / `vi` alternates

### Manual hreflang check (optional)
Paste any page URL into the [hreflang Tag Testing Tool](https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/)
or the [Merkle hreflang checker](https://technicalseo.com/tools/hreflang/) to
confirm the live `<head>` tags match the sitemap annotations.

---

## Quick-Reference Links

| Resource | URL |
|----------|-----|
| Search Console property | https://search.google.com/search-console |
| Sitemap submission | Search Console → Sitemaps → Add sitemap |
| URL Inspection tool | Search Console → URL Inspection |
| Google's indexing status docs | https://support.google.com/webmasters/answer/7440203 |
| hreflang documentation | https://developers.google.com/search/docs/specialty/international/localized-versions |
