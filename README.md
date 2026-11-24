# metro-dreamland-showcase

Everything in [metro-dreamland](https://github.com/bomberfish/metro-dreamland),
Windows Phone 7/8 and Windows 8's Metro for [dreamland](https://dreamland.js.org),
to look at and try. It's a Metro app itself: a pivot of sections (controls,
pickers, menus, tiles, motion), an app bar, and a settings page for the
phone's theme, its accent colour, and flat or acrylic tiles.

## Running it

It expects metro-dreamland checked out beside it, and vendors dreamland:

```sh
git clone https://github.com/bomberfish/metro-dreamland.git
git clone --recursive https://github.com/bomberfish/metro-dreamland-showcase.git
cd metro-dreamland-showcase
pnpm install:dreamland && pnpm build:dreamland
pnpm install
pnpm dev
```

The type (Segoe UI Variable) and icons ("Metro Symbols", Segoe UI Symbol's
app bar glyphs) are Microsoft's, so they aren't in this repository: they're
loaded from [bomberfish.ca](https://bomberfish.ca), or a copy of Segoe UI
already on the machine.
