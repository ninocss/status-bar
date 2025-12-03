# [CONCEPT] Player List

A small, self‑contained web UI that shows live Minecraft server information and an interactive, animated background inspired by Minecraft.

This project queries the public `mcsrvstat.us` API for a given server, renders:

- server status (online / offline / connecting)  
- MOTD  
- player count and list (with heads)  

and decorates everything with a pixel‑art sky, trees, creeper, and walking players that react to clicks.

---

## Features

- **Live server status**
  - Uses `https://api.mcsrvstat.us/3/`
  - Shows online/offline state, MOTD, and player counts
  - Reload button to refresh on demand

- **Player list**
  - Minecraft avatars via [mc-heads.net](https://mc-heads.net)
  - Scrollable list styled like an in‑game UI
  - Search bar with:
    - live filtering
    - highlight of matching text
    - “No matching players” state
  - Quick link to each player’s NameMC profile

- **Interactive background**
  - **Trees** that shake and drop leaves (and occasional “acorns”) on click / keyboard
  - **Creeper** that “arms” and triggers a pixel‑style explosion
  - **Players**:
    - static jumper with random chat bubble
    - walking player that crosses the scene and can “taunt”
  - Day/night sky cycle, stars, sun, moon, and night overlay

- **Accessibility & UX**
  - Background elements are focusable where interactive (`role="button"`, `tabindex="0"`)
  - Keyboard support via `Enter` / `Space` for trees, creeper, and players
  - ARIA labels on decorative controls

---

## Project Structure

```text
src/
  index.html                # Main HTML entry
  scripts/
    enviorment/
      creeper.js            # Creeper click → explosion logic
      player.js             # Background player interactions (jump / taunt)
      tree.js               # Tree shake + falling leaves
    server/
      request.js            # API requests, server status + player list + search
  styles/
    root.css                # Global variables + base layout
    background/
      enviorment/env.css    # Sky, sun/moon, stars, trees base styling
      mobs/
        creeper.css         # Creeper + explosion visuals
        players.css         # Background players + animations
    header/
      server/server.css     # Server info header (icon, name, MOTD, status, buttons)
      tab/tab-list.css      # Tab list layout, search bar, scrollbar
    list/
      player.css            # Player entry card styles
```

Key scripts:

- request.js  
  - Fetches server data, builds player entries, updates status/MOTD, wires search and NameMC links.
- tree.js  
  - Handles click/keyboard events on `.bg-tree-clickable` trees and spawns animated leaves.
- creeper.js  
  - Manages creeper “arming”, explosion animation, and reset.
- player.js  
  - Implements the static player jump and the walking player taunt behavior.

---

## Getting Started

### Prerequisites

- Any modern web browser
- (Optional) A static HTTP server for local testing, e.g.:
  - Node: `npx serve` or `npx http-server`
  - Python: `python -m http.server`

### Run Locally

1. Clone / copy the project.
2. Serve the folder (so that `fetch` and relative paths work correctly), e.g.:

   ```sh
   # from the project root
   npx serve .
   # or
   python -m http.server
   ```

3. Open:

   - `http://localhost:3000/src/index.html` (if using `serve`)  
   - or the corresponding URL from your server

The page will automatically:

- fetch data from `https://api.mcsrvstat.us/3/canstein-berlin.de`
- update server header + player list
- start the background animations

---

## Customization

### Change Target Server

Edit `SERVER_URL` in request.js:

````js
// ...existing code...
const SERVER_URL = 'canstein-berlin.de';
// ...existing code...
````

Set it to your own host:

````js
// ...existing code...
const SERVER_URL = 'play.example.net';
// ...existing code...
````

The API endpoint will automatically become:

$$
\text{API\_URL} = \text{"https://api.mcsrvstat.us/3/"} + \text{SERVER\_URL}
$$

### Theming

Most colors and fonts live in root.css as CSS variables:

- `--bg-body`, `--text-*` for text and background
- `--brown-*`, `--gray-*` for panel/frame styling
- `--sky-*` and `--creeper-*` for background elements

You can create a different theme by overriding these variables.

---

## Keyboard & Interaction Notes

- **Trees, creeper, background players**
  - Click or focus (`Tab`) then press `Enter` or `Space`.
- **Search**
  - Start typing to filter players.
  - `Clear` button resets the input and restores the full list.
- **NameMC buttons**
  - Click the profile icon on a player entry to open their NameMC page in a new tab.

---

## Limitations

- Relies on `mcsrvstat.us` availability and response format.
- Hard‑coded to a single server in request.js.
- This is a front‑end CONCEPT

---