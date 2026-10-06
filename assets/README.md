# Asset pack

Self-hosted imagery used by elements for avatars, album art, thumbnails and wallpapers. Regenerate with
`node scripts/assets.mjs` (deterministic: the same source ids are fetched every time). `manifest.json`
lists every file with its source.

| Folder | Files | Use | Source and licence |
|---|---|---|---|
| `portraits/` | `men-00..39.jpg`, `women-00..39.jpg` (128px) | profile pictures, friend lists, comment avatars | randomuser.me portraits, free to use in mockups and demos |
| `square/` | `00..71.webp` (300×300) | album and playlist art, product and card photos | picsum.photos (Unsplash photos, Unsplash License); author and Unsplash url per entry in the manifest |
| `wide/` | `00..35.webp` (480×270) | video thumbnails, hero cards | same |
| `tall/` | `00..09.webp` (390×780) | phone wallpapers, lock screens | same |
