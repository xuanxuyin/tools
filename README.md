# tools

Multi-project repo — one folder per site, each deployed independently from its subfolder.

| Project | What | Stack | Live |
|---|---|---|---|
| [tintbrew/](./tintbrew) | tintbrew.com — free color tools (Oklab mixer, converter, "what two colors make" answers) | Astro 5 static, vanilla TS islands | Cloudflare Pages |

## Adding a new project

1. `mkdir <name> && cd <name>` — scaffold the site inside.
2. Deploy from the subfolder (Cloudflare Pages: project **Root directory** = `<name>`).
3. Add a row to the table above.

The root `.gitignore` and `.gitattributes` apply to all subfolders.
