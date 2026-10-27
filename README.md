# Survivors companion

An unofficial companion for [Vampire Survivors](https://poncle.itch.io/vampire-survivors): a codex
of weapons, passives, characters, stages and more, rebuilt as an app from the community wiki.

- **Site:** <https://prabinpebam.github.io/survivors-companion/>
- **Documentation:** <https://prabinpebam.github.io/survivors-companion/docs/>, covering the
  research, specification, design system and plans. In this repository, start with the
  [documentation README](docs/README.md), the [product brief](docs/brief.md) and the
  [specification](docs/spec.md).

This is an unofficial fan project. It is not affiliated with or endorsed by poncle or the
[Vampire Survivors Wiki](https://vampire.survivors.wiki).

## Content and licences

- **Wiki text and data** come from the [Vampire Survivors Wiki](https://vampire.survivors.wiki),
  licensed [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/). Every item in
  the app links to its source page. The app's adaptation of that content is shared under the same
  licence, for non-commercial use.
- **Game art** (sprites, pictures) belongs to poncle and the other rights holders. It is shown
  here for reference only, and no licence to it is granted.
- **Vendored components** in the documentation reader carry their own licences
  ([docs/shell/vendor](docs/shell/vendor/README.md)).

## Repository layout

| Path | What it is |
|---|---|
| `app/` | The prototype app (Preact, Vite, TypeScript), with its design tokens and checks |
| `docs/` | Research, specification, design and planning, readable in the Slate reader |
| `site/` | The built app as published (generated; present only in the public repository) |
| `tools/` | Publishing and local server scripts; archived scrapers in `tools/archive/` |
| `slate/`, `agentic-craft/`, `agent-orchestration/` | Documentation and workflow kits (submodules) |
| `resources/` | The wiki archive the data is built from (Git LFS; kept by the maintainer, not published) |

## Run it locally

```powershell
cd app
npm install
npm run dev        # http://127.0.0.1:5173/
npm run check      # tokens, style, copy and design lints, type check
```

`npm run data` regenerates `app/public/data`, `sprites` and `media` from `resources/`, which is
not in the public repository. To run the app from a public clone, copy `site/data`,
`site/sprites` and `site/media` into `app/public/`.

The documentation reader is static: `python -m http.server 8080 --directory docs`.
`tools/serve.ps1 -Watch` keeps both local servers running.

## Publishing

`node tools/publish.mjs` (maintainer only) does three things:
- builds the app for `/survivors-companion/`;
- records a commit on the local `public` branch: the committed tree without `resources/`, with
  the built site in `site/`;
- pushes that branch to `main` on GitHub.

The [Pages workflow](.github/workflows/pages.yml) then deploys `site/` and `docs/`. The
maintainer's own `main` branch, which holds the full archive history, is never pushed.

## Kits

The documentation reader ([Slate](https://github.com/prabinpebam/slate)) and the product and
workflow skills ([agentic-craft](https://github.com/prabinpebam/agentic-craft),
[agent-orchestration](https://github.com/prabinpebam/agent-orchestration)) are pinned
submodules. Clone with `--recurse-submodules`. Versions are recorded in
[kit setup](docs/planning/kit-setup.md). Project operating rules: [AGENTS.md](AGENTS.md).
