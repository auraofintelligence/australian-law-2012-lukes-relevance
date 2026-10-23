# Your relevance questionnaire

Reader questionnaire added 23 October 2026 by Luke Nathan Hayes with Codex assistance. The site's original Luke and Claude attribution, design, ownership and Strange But True Public Source Licence remain intact.

## Duplication review

The previous `pages/your-relevance.html` repeated subjects already preserved elsewhere, rather than duplicating a whole page verbatim:

| Previous material here | Existing canonical home |
| --- | --- |
| Starting from the filing cabinet and licences in late 2012, then following fine print into Acts and regulations | `index.html`, especially the opening and reading timeline |
| 61 documents, supplier form of 19 November 2012, tenancy document of 5 January 2013, Westpac and QSuper documents, tax, transport and super examples | `pages/filing-cabinet.html` and its ledger from `assets/corpus-data.js` |
| Following everyday documents into legislation and reading related sources together | `pages/the-method.html`, the Relevance Ladder and fine-print explanations |

Those historical pages and the corpus remain unchanged. The old wheel, domain cards and worked cabinet table were removed from this reader page. A short link points to the cabinet and method instead. Their historical Acts are not reused as current-law recommendations.

## Behaviour and privacy

- Twelve optional question sections, plus review/export. Desktop section buttons and a mobile selector allow direct navigation; Next and Previous move focus to the new heading. Progress is section position and sections with answers, not legal coverage or verified completion.
- Locations repeat for living, work, business, property, study/care and activities. Multiple councils and jurisdictions, other Australian territories, overseas connections and unknown locations are supported. No address lookup or personal information is sent to a service.
- Conditional follow-ups retain earlier answers when an option is unticked. A notice in the section and review summary identifies these; the export labels them. Clear section and full reset require confirmation.
- Export includes supplied answers and research instructions, with official-source routing, provision-level applicability checks, currency, confidence, non-statutory documents and contention fields. It contains no fictional example, invented law citation or assertion that legal completeness has been achieved.
- The Markdown textarea is editable. Copy/download use that text. Rebuild confirms replacement of edits; changes to answers after editing are flagged. Exporting an older edited brief asks for confirmation.
- Saving is off by default. Opt-in local storage uses only `lukes-relevance-reader-draft-v1` and includes answers, current section and any edited brief. Opt-out/reset remove this key and preserve unrelated storage. Storage and clipboard failures have visible fallbacks. Other users of the same browser may see an opted-in draft.
- No backend, account, membership process, analytics, external fonts or automatic AI connection was added. Copy and download are user-initiated. Hosting access logs and visits to external links are separate from the form; exported files and copies are under the reader's control.

## Official source routing checked 23 October 2026

These are research entry points, not a precomputed list of binding law. No substantive current-law recommendation is made by the questionnaire.

| Jurisdiction | Legislation | Council / local routing |
| --- | --- | --- |
| Commonwealth | [Federal Register](https://www.legislation.gov.au/) | Research each activity and responsible regulator |
| NSW | [NSW Legislation](https://legislation.nsw.gov.au/) | [Office of Local Government directory](https://www.olg.nsw.gov.au/public/local-government-directory) |
| Victoria | [Victorian legislation](https://www.legislation.vic.gov.au/) | [Victorian Electoral Commission council boundaries](https://www.vec.vic.gov.au/electoral-boundaries/local-councils) |
| Queensland | [Queensland legislation](https://www.legislation.qld.gov.au/) | [Government directory](https://www.dlgwv.qld.gov.au/local-government/for-the-community/local-government-directory) and [ECQ boundary maps](https://www.ecq.qld.gov.au/electoral-boundaries/local-government-area-boundaries) |
| WA | [WA Legislation](https://www.legislation.wa.gov.au/) | [Government MyCouncil finder](https://www.mycouncil.wa.gov.au/) |
| SA | [SA Legislation](https://www.legislation.sa.gov.au/) | [Find your council](https://www.localcouncils.sa.gov.au/get-involved/find-your-council) |
| Tasmania | [Tasmanian legislation](https://www.legislation.tas.gov.au/) | [Department of Justice council directory](https://www.justice.tas.gov.au/local-government/tasmanian-council-directory) |
| ACT | [ACT Legislation Register](https://www.legislation.act.gov.au/) | [City Services](https://www.act.gov.au/city-services/city-services-directorate-website) |
| NT | [NT Legislation](https://legislation.nt.gov.au/) | [NT Government council finder](https://nt.gov.au/community/local-councils-remote-communities-and-homelands/find-your-council) |

The [ACT Legislative Assembly](https://www.parliament.act.gov.au/visit-and-learn/learn/resources/fs/levels-of-gov) confirms that ACT territory and local responsibilities are combined. The questionnaire does not assign an ACT council. [Australian territories](https://www.infrastructure.gov.au/territories-regions/australian-territories) is the entry point for identifying other-territory arrangements and applied laws. Unincorporated areas are left for an authority check, without an assumed council.

[ABLIS](https://ablis.business.gov.au/about) covers business licences, permits, approvals, regulations and codes across government levels. Its results are leads for checking the issuing authority and operative law, not conclusive applicability findings.

Research access limits: NSW Legislation returned 403 to the automated research fetch; its official role is corroborated by the [NSW Government legislation page](https://www.dpird.nsw.gov.au/about-us/legislation) and [NSW State Library guide](https://guides.sl.nsw.gov.au/government_legislation_and_publications_nsw/acts_and_regulations). The Queensland directory's nested search page returned 410 while its parent remained readable; the separate ECQ maps provide a working boundary route. External availability and directory contents may change. The date above verifies routing research, not the currency or applicability of any legislation.

## Verification

`node --test tests/relevance.test.mjs` passes nine tests covering every schema field in export, conditional states, earlier hidden answers, jurisdiction routing, escaping, research output fields and storage-input validation.

`node tests/relevance-browser.mjs` passes the functional Edge suite using an ephemeral profile and localhost server. Set `PLAYWRIGHT_MODULE` to a Playwright `index.mjs` file URL when it is not installed locally. Checks include all answer controls; six location routes; actual clipboard and Markdown download; opt-in restore including edited export; rebuild/reset cancel and confirm; conditional retention; malicious input as text; no answer requests; opt-out preserving unrelated storage; blocked storage/clipboard; keyboard heading focus and hidden-field skipping; local links; and 320, 390, 768 and 1366 pixel widths without horizontal overflow. Windows clipboard line endings are normalised in the assertion. No page errors were observed.

Desktop and mobile layouts were visually reviewed. A focused follow-up checks floating To top collision avoidance and keyboard return after the mobile review. Browser tests are functional checks in Edge, not a screen-reader audit or an assessment of legal completeness. Real reader trials, other-browser testing and later research-result validation remain future work.
