<!--
  ██  BUILT BY LUKE × CLAUDE  ██
  This repository was created collaboratively by Luke Nathan Hayes and
  Claude (Anthropic, Fable 5) — NOT by Codex. See signature below.
-->

# Australian Law 2012: Luke's Relevance

> 🤝🔷 **A Luke × Claude build.** Created by **Luke Nathan Hayes** (`auraofintelligence`)
> and **Claude — Fable 5** (Anthropic) on **27 August 2026**. _Not a Codex build._

**Public site: https://auraofintelligence.github.io/australian-law-2012-lukes-relevance/**

In the summer of 2012 to 2013, Luke searched his filing cabinet, licences and other available fine print, following legal references into a collection of 61 documents. The reading prompted a shift from opting out to understanding the rules and exploring change from within.

This repo publishes that method as a colourful, highly visual site, and designs the machine that lets anyone replicate the read-through in days instead of a summer:

- **The filing cabinet**: the full 2012 corpus as a sortable ledger (every file, size and save-date is real, taken straight from the folder).
- **The method**: the Relevance Ladder: gather your laws, chomp through them with AI, sort what serves from what bites, plan the change.
- **The legal engine**: a linked, unfinished [prototype](https://github.com/auraofintelligence/australian-legal-engine) that parses, indexes and retrieves provisions from already-held documents, demonstrated with the historical cabinet. Current-law acquisition, version tracking and maintained national coverage remain future work.
- **Change the law / Gamify democracy / Cyber republic**: a bridge to [P4A](https://p4a.xyz/), building a grassroots movement to transform Australia’s political system through a referendum and establish the world’s first cyber republic by the end of 2031, then demonstrate the completed system at the Brisbane 2032 Olympics.
- **Limits**: legal information, never legal advice, and what "gets it right" has to mean in engineering terms.

## Reference material

`reference/` holds the two 2024-25 deep research briefs behind the engine design, archived as they were written: `building-an-australian-legal-rag-system.md` (the all-Australia statutory blueprint) and `legal-rag-llm-plan-aus-qld-redlands.md` (the Federal / Queensland / Redlands three-tier plan). They are exploration documents, not settled decisions; the live site is the current state of the thinking.

## The source corpus

The original PDFs live in a local archive folder ("Australian Law 2012 - Lukes Relevance", about 90 MB of official reprints and forms). They are **not committed here**: the site carries a complete manifest instead (`assets/corpus-data.js`) with every filename, size and save-date. If the reprints themselves should ever be published, a GitHub Release is the right vehicle; that call is Luke's.

## Run locally

No build step. Open `index.html` in a browser, or:

```powershell
python -m http.server 4212 --bind 127.0.0.1
```

## Reader questionnaire, October 2026

[Your relevance](https://auraofintelligence.github.io/australian-law-2012-lukes-relevance/pages/your-relevance.html) now starts with the reader's circumstances: twelve optional sections, multiple activity locations, conditional follow-ups and an editable Markdown research brief with copy/download. Saving is explicitly opt-in on the device and clearable. The form does not retrieve laws, make an exhaustive legal determination, send answers to AI or create a P4A membership.

The original history remains in the cabinet and method pages. See [duplication findings, official routing research and verification](docs/your-relevance.md). This questionnaire was added by Luke Nathan Hayes with Codex assistance; the original build's lineage and licence remain unchanged.

Run its source/export checks with `node --test tests/relevance.test.mjs`. Browser verification uses `node tests/relevance-browser.mjs` with Playwright and an installed Edge browser. There is no build step or application dependency added to the public page.

## Neighbouring rooms

- **Legal Memory Workbench**: prepare AI-ready markdown files about your own legal surface: https://auraofintelligence.github.io/legal-memory-workbench/
- **P4A site map**: the civic campaign workbench, forms first: https://p4a.xyz/pages/site-map.html
- **P4A Oceania cinema**: https://auraofintelligence.github.io/p4a-oceania-cinema/
- **P4A Native Nations cinema**: https://auraofintelligence.github.io/p4a-native-nations-cinema/
- **Strange But True**: the island tech-and-ideas stall: https://auraofintelligence.github.io/strange-but-true/
- **Aura of Intelligence**: the wider build: https://auraofintelligence.github.io/

## Licence

Strange But True Public Source Licence: free for personal, educational, artistic, research and community use with attribution; all commercial and corporate rights reserved to Luke Nathan Hayes. See [LICENCE.md](LICENCE.md).

---

<sub>

### 🔷 Signature
**Made by Luke × Claude (Fable 5).** Not Codex.
Every commit is co-signed `Co-Authored-By: Claude Fable 5` — check `git log` to confirm lineage.
Repo initialised 2026-08-27. Minjerribah, Quandamooka Country.

</sub>


<!-- mutual-futures-connection -->
## Mutual Futures: connected workbench

[Mutual Futures](https://auraofintelligence.github.io/mutual-futures/) connects this project with Luke Nathan Hayes's proposed mutual business succession, Try Everything Once, Intermittent Retirement, personal intelligence, legal reflection, resilience, travel and wider civilisational horizon. The connection does not merge the projects or imply outside endorsement.

[Source repository](https://github.com/auraofintelligence/mutual-futures) · [Project connections and sources](https://auraofintelligence.github.io/mutual-futures/sources.html)
