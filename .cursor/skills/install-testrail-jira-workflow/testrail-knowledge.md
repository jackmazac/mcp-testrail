# TestRail Domain Knowledge

## TestRail Instance

- **URL**: https://myfox.testrail.io/
- **Project**: FOX_MC_UNIFIEDAPP (ID: **262**)
- **Suite**: Master (ID: **235518**)

---

## Section Hierarchy (Full Structure)

All section IDs below are for project 262, suite 235518. Use these IDs directly when calling `addCase`.

---

## CMS - Content Management System

CMS and MAM were historically separate departments and applications. They are now combined into the "Unified App" that houses both in one application.

```
CMS (2462515)
└── CMS TAB (2462516)
    ├── Editorial (2466115) — Test functionalities on Editorial landing page
    │   ├── Posts (2466117)
    │   │   ├── Categories (2471154)
    │   │   └── Tags (2471155)
    │   ├── Person (2466118)
    │   ├── Pages (2466119)
    │   ├── Aggregate (2466120)
    │   ├── Shows (2466121)
    │   ├── Sources (2466122)
    │   ├── Media (2466123)
    │   ├── Plugins (2466124)
    │   └── Tools (2466125)
    └── Layouts (2466116) — Test functionalities on Layouts landing page
```

### CMS Section Reference (Leaf Sections for Test Case Creation)

| Path | Section ID | Description | Keyword Triggers |
|------|------------|-------------|------------------|
| CMS > CMS TAB > Editorial > **Posts** | 2466117 | Articles created/published by editors. Create/modify/delete posts, search/sort/filter articles. | post, article, publish, content, blog, all articles |
| CMS > CMS TAB > Editorial > Posts > **Categories** | 2471154 | Content types and category filtering for articles. | category, categories, content type |
| CMS > CMS TAB > Editorial > Posts > **Tags** | 2471155 | Tags for filtering and organizing articles. | tag, tags, filter |
| CMS > CMS TAB > Editorial > **Person** | 2466118 | People records - authors, reporters, editors. Create/modify/delete persons. | person, persons, author, reporter, editor, writer, byline |
| CMS > CMS TAB > Editorial > **Pages** | 2466119 | Event-specific or custom pages (not mixed with regular articles). | page, pages, event, landing page, custom page |
| CMS > CMS TAB > Editorial > **Aggregate** | 2466120 | Consolidated collections from multiple external sources. | aggregate, aggregates, collection, consolidated, external source, feed |
| CMS > CMS TAB > Editorial > **Shows** | 2466121 | Show-related content. Editors create/modify/delete shows. | show, shows, program, series, episode |
| CMS > CMS TAB > Editorial > **Sources** | 2466122 | Origin points and providers for digital assets. | source, sources, origin, provider, repository |
| CMS > CMS TAB > Editorial > **Media** | 2466123 | Images and video - media assets for articles. | media, image, video, asset, photo, upload |
| CMS > CMS TAB > Editorial > **Plugins** | 2466124 | Cache Purge, Canonical URLs, email integrations. | plugin, plugins, cache purge, canonical, url |
| CMS > CMS TAB > Editorial > **Tools** | 2466125 | Stop Words, search tools, editorial utilities. | tool, tools, stop words, search term |
| CMS > CMS TAB > **Layouts** | 2466116 | Layout units, side menu collapse/expand. | layout, layouts, layout unit, side menu |

---

## MAM - Media Asset Management

MAM handles media assets, transcoding, gallery views, publish flows, uploads, and partner integrations.

```
MAM (2462638)
├── Assets (2461159)
│   ├── Transcode (2461160)
│   └── Gallery View (2462470)
│       ├── FTS Clip (2465550)
│       ├── FTS Program (2465551)
│       ├── FWX Clip (2465552)
│       ├── Shorts (2465553)
│       ├── Artwork (2465554)
│       ├── Entity Artwork (2465555)
│       └── FNM Clip (2465556)
├── Edit (2491146)
│   ├── Model Edit (2491148)
│   │   └── FWX Clip (2491149)
│   └── Model View (2491147)
│       └── FWX Clip (2491150)
├── Formats Tab (2461821)
│   └── FTS Clip (2461833)
├── Partners Dashboard (2465866)
├── Publish Flows (2458871)
│   ├── FWX Clips (2459096)
│   └── FTS Clips (2461686)
├── Settings (2471981)
│   └── Download Folders (2474824)
├── Upload (2480419)
│   ├── MatchedFile Uploads (2484231)
│   └── Generic Uploads (2489113)
└── MCLive (2487797)
```

### MAM Section Reference (Leaf Sections for Test Case Creation)

| Path | Section ID | Description | Keyword Triggers |
|------|------------|-------------|------------------|
| MAM > Assets > **Transcode** | 2461160 | Transcode requests, visibility rules, role_transcode permission. FTS Clips transcoding. | transcode, transcoding, rendition, video media type |
| MAM > Assets > Gallery View > **FTS Clip** | 2465550 | FTS Clip asset metadata, filename, long metadata. | FTS clip, FTS Clip, asset metadata |
| MAM > Assets > Gallery View > **FTS Program** | 2465551 | FTS Program assets in gallery. | FTS program, FTS Program |
| MAM > Assets > Gallery View > **FWX Clip** | 2465552 | FWX Clip assets in gallery view. | FWX clip (gallery) |
| MAM > Assets > Gallery View > **Shorts** | 2465553 | Short-form content in gallery. | shorts |
| MAM > Assets > Gallery View > **Artwork** | 2465554 | Artwork assets. | artwork |
| MAM > Assets > Gallery View > **Entity Artwork** | 2465555 | Entity-level artwork. | entity artwork |
| MAM > Assets > Gallery View > **FNM Clip** | 2465556 | FNM Clip assets. | FNM clip, FNM Clip |
| MAM > Edit > Model Edit > **FWX Clip** | 2491149 | FWX Clip model editing. | FWX clip edit, model edit |
| MAM > Edit > Model View > **FWX Clip** | 2491150 | FWX Clip model view. | FWX clip view, model view |
| MAM > Formats Tab > **FTS Clip** | 2461833 | FTS Clip format configuration. | FTS clip format, formats tab |
| MAM > **Partners Dashboard** | 2465866 | Fox One, Freewheel delivery list mapping, partner integrations. | partners, dashboard, Fox One, Freewheel, delivery |
| MAM > Publish Flows > **FWX Clips** | 2459096 | FWX Clip publish flows, partner screen, original shape. | FWX clips publish, publish flow |
| MAM > Publish Flows > **FTS Clips** | 2461686 | FTS Clip publish flows, FTS CTV partner. | FTS clips publish, FTS CTV |
| MAM > Settings > **Download Folders** | 2474824 | Download folder configuration. | download folder, settings |
| MAM > Upload > **MatchedFile Uploads** | 2484231 | Matched file upload workflows. | matched file, MatchedFile upload |
| MAM > Upload > **Generic Uploads** | 2489113 | Generic file upload workflows. | generic upload |
| MAM > **MCLive** | 2487797 | MCLive apps, admin access, role-based access. | MCLive, MCLive admin, MCLive app |

---

## Section Selection Rules

1. **Jira component field**: If the ticket has a component matching a section name (e.g., "Posts", "Media", "MAM"), use that section.
2. **Jira labels**: Check for labels matching section names or keyword triggers.
3. **Summary/description keywords**: Match against the Keyword Triggers column (case-insensitive).
4. **Entity type prefixes**: MAM tickets often reference FTS Clip, FWX Clip, FNM Clip - use the context (gallery, edit, format, publish) to pick the right section.
5. **Ask the user**: If no clear match, present the relevant top-level options (CMS vs MAM) and sub-options for selection.

---

## Name Matching Notes

- TestRail uses **Aggregate** (singular); docs use "Aggregates". Both map to section 2466120.
- **FTS Clip**, **FWX Clip**, **FNM Clip** appear in multiple sections - use parent path (Gallery View vs Edit vs Formats Tab vs Publish Flows) to disambiguate.
- **Categories** and **Tags** are under Posts; use for article taxonomy/filtering tickets.
