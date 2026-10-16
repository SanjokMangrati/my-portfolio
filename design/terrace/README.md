Terrace is the visual system for **smangrati.com**, the portfolio of Sanjok Mangrati, a fullstack developer working from Darjeeling, India. Its material comes from the place: hillside tea terraces (stacked layers, which is also what a fullstack is), the tea-chest stencils and ledgers of the estates, second-flush muscatel tea, and the blue engines of the Darjeeling Himalayan Railway. The page's one job is to let a recruiter answer three questions in under a minute: who is this, what has he shipped, how do I reach him.

## Content fundamentals

- Write in the first person, as Sanjok talks: plain, specific, a little self-deprecating. Keep his honest lines ("I'm still learning a lot, and still changing my mind about how things should be built."). Cut hedges that carry no information.
- Write running text in sentence case. UPPERCASE appears only in display type (Big Shoulders) and mono labels and buttons (Martian Mono).
- Name things by what a recruiter recognizes: "Things I have built", "Where I have worked", "What I work with", "Get in touch". No "Portfolio", "Showcase", "Let's build something amazing".
- Every claim is a fact the reader can check: a live URL, a company, a period, a stack. No skill percentages, no "passionate", no filler stats.
- Use the subject's real units: `27°02′ N 88°16′ E`, `2,042 m`, `IST`, `UTC+5:30`, periods as `2023–2025` with an en dash, the current role as `2025–now`.
- Status words are fixed: "Open to work", "Live", "In progress". Never "COMING SOON!", "Hot", "New".
- Button labels say what happens: "Send message", "Visit alias.smangrati.com", "Read the Alias case study".
- No emoji anywhere.

## Visual foundations

### Color
- The page lives on `ground` (Mist: hill-fog green-white; Night estate: tea-estate night). Text is `ink`; secondary text is `ink-muted`.
- `estate` is used for exactly one inverted band per page: the contact section and footer. Inside it, text is `on-estate` / `on-estate-muted` and decorative lines are `estate-line`.
- `muscatel` is the only accent and it is a mark, not a fill: the open-to-work dot, link underlines, the active nav underline, the focus ring. In Mist it never sits behind text and never carries text; amber words use `muscatel-text`.
- Status colors are semantic and always paired with a word: `leaf` = Live, `train` = In progress, `muscatel` = Open to work.
- `hairline` is decorative only (ledger dividers, terrace lines). Anything that must be seen (field underlines, outlines, the rule crosses) uses `rule`.
- `ground-raised` is for hover rows and screenshot mats; `ground-sunk` for the metadata strip and inline code. Form fields have no fill: they are lines on whatever ground they sit on. There are no cards.
- Every text pair is 4.5:1 or better in both themes; `rule`, `muscatel` and the focus ring are 3:1 or better on every ground they land on.

### Type
- Three voices, each with one job:
  - **Big Shoulders** (900 / 800), the condensed industrial grotesque, for the name (`masthead`), case-study titles (`display`), section titles (`headline`) and project names (`subhead`). Always uppercase. It is the voice of stencilled crates and station signs.
  - **Martel** (400 / 700), a Devanagari-ready serif from the Indian Type Foundry, for everything a person reads: `lede`, `body`, `body-strong`, `title`, `small`. Never uppercase.
  - **Martian Mono** (variable width) for data and labels: `label`, `meta`, `data`, `code`. Set `font-variation-settings: 'wdth' 75` for labels and metadata, `'wdth' 87` for years and stacks, `'wdth' 100` for code. Uppercase for `label` and `meta`; tabular figures for anything in a column.
- **Big Shoulders Stencil** appears only in the SM monogram and the seal (`stamp`). Never set words a reader must read in it.
- Running text stays within `measure` (680px, about 68 characters). Headings use `text-wrap: balance`.

### Space and layout
- 4px base: `space-1` 4 through `space-24` 96. Sections are `space-24` apart on desktop, `space-16` on phones.
- Content is at most `content-max` (1200px). On desktop (900px and wider) labels sit in a `rail` (220px) to the left of a single content column, like the left margin of a ledger. On phones the rail stacks above.
- Side gutter: `max(16px, env(safe-area-inset-left/right))` on phones, `gutter-wide` (40px) from 768px.
- The page order is fixed: TopBar, Masthead, MetaStrip, Work (Ledger), About (Prose), Experience (ExperienceLog), Stack (StackManifest), EstateBand (ContactLines, form, footer). See the HomePage card.

### Borders, radii, shadows
- Square-cut throughout: `radius-0` for buttons, fields, frames and bands. `radius-pill` only for status pills and dots, so status is the one round thing on the page. `radius-1` only for inline code.
- `border-hair` (1px) in `hairline` for dividers; `border-rule` (1.5px) in `rule` for controls; `border-stamp` (3px) only in the marks.
- Sections are separated by `Rule`: a hairline with a terminal cross at each end.
- No shadows, no gradients, no blur, no glass.

### Motion
- One orchestrated moment: on first load the masthead's terrace lines draw in left to right (`duration-draw`, 80ms stagger). The page is fully readable before and without it.
- Hover is small and physical: arrows nudge 3px (`duration-quick`), ledger rows fill with `ground-raised`, link underlines thicken.
- The open-to-work dot pulses slowly (`duration-pulse`).
- Under `prefers-reduced-motion: reduce`, nothing moves: lines are simply drawn, the pulse stops.
- No scroll-triggered fade-ins; nothing waits at opacity 0.

### Focus and states
- Keyboard focus is a 2px solid `focus` (muscatel) outline with a 3px offset on ground; inside the estate band it is `on-estate`.
- Disabled or not-yet-public items fade their arrow to `hairline` and are marked `aria-disabled`; they keep their text color.

### Imagery
- The type is the hero. No portrait in the masthead, no 3D objects, no stock photography.
- Product screenshots appear only on case-study pages, on a `ground-raised` mat with a 1px `rule` frame and a mono caption, `Fig. N — what it shows`, with alt text that describes the screen.
- Terrace lines (gentle, stacked contour curves) are the only illustration. They appear twice: behind the masthead in `hairline`, and in the estate band in `estate-line`.

## Iconography

- Use the Terrace icon set in `assets/Icons`: 16 glyphs on a 24px grid, 1.5px stroke, square caps, mitred joins, no fills except the half-disc in `theme`.
- Render icons inline as SVG with `stroke="currentColor"` so they take the text color; the files in the asset store are drawn in `ink` (#12221b) for reference.
- Sizes: 20px beside 12–17px text, 16px (`tr-icon--sm`) in fine print, 28px in ContactLines.
- `arrow-right` means a link within this site, `arrow-out` means another site, `arrow-left` means back. `summit` marks the place, `clock` the local time.
- There are no brand logos. GitHub and LinkedIn appear as words, optionally with the generic `repo` and `profile` glyphs.
- No emoji, no icon fonts, no Lucide or Feather.

## Marks

- `monogram-ink` / `monogram-mist`: SM in Big Shoulders Stencil inside a 3px stamp frame. Use at 32px in the top bar, on its own: the top bar shows no name and no clock (the live IST time lives in the metadata strip). Ink on ground, mist on estate.
- `seal-ink` / `seal-mist`: the monogram with `BUILDING AT / 2,258 M`, like a tea-chest mark. Footer only, at 232px wide.
- `wordmark-ink`: the name in Big Shoulders 900 as outlines, for social cards and the README of the repo, never on the site itself (the masthead is live text).
- `favicon`: mist SM on an `estate` square.

## Signature details

These are what make the site Sanjok's and nobody else's. Keep all of them; add no others without a reason from the same world.
1. The name, huge, in Big Shoulders over terrace lines.
2. The metadata strip with coordinates, elevation and the live IST clock.
3. Projects as ledger rows; skills as a manifest with dotted leaders.
4. Hairline rules with terminal crosses.
5. One estate-green band at the end, closed by the stencil seal reading "Building at 2,258 m".
