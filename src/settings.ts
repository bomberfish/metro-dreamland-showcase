// The phone's own settings, for the showcase: its theme (dark or light) and
// its accent colour, kept on this device. (What tiles are made of, flat or
// acrylic, metro-dreamland keeps itself: setMaterial.)

export const ACCENTS = [
	"lime",
	"green",
	"emerald",
	"teal",
	"cyan",
	"cobalt",
	"indigo",
	"violet",
	"pink",
	"magenta",
	"crimson",
	"red",
	"orange",
	"amber",
	"yellow",
	"brown",
	"olive",
	"steel",
	"mauve",
	"taupe",
] as const;

export type Accent = (typeof ACCENTS)[number];
export type Theme = "dark" | "light";

const root = document.documentElement;

const read = (key: string) => {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
};
const write = (key: string, value: string) => {
	try {
		localStorage.setItem(key, value);
	} catch {
		// (nowhere to keep it: it lasts as long as the page)
	}
};

export const theme = (): Theme =>
	root.dataset.mTheme === "light" ? "light" : "dark";
export const accent = (): Accent =>
	(ACCENTS as readonly string[]).includes(root.dataset.mAccent ?? "")
		? (root.dataset.mAccent as Accent)
		: "cobalt";

export function setTheme(value: Theme) {
	root.dataset.mTheme = value;
	write("showcase-theme", value);
}

export function setAccent(value: Accent) {
	root.dataset.mAccent = value;
	write("showcase-accent", value);
}

/** What was chosen last time, put back. */
export function restoreSettings() {
	const t = read("showcase-theme");
	if (t === "dark" || t === "light") root.dataset.mTheme = t;
	const a = read("showcase-accent");
	if (a && (ACCENTS as readonly string[]).includes(a)) root.dataset.mAccent = a;
	const w = read("showcase-wallpaper");
	if (w) setWallpaper(w);
}

// What's behind the page: one of Windows 8's wallpapers (./wallpapers.ts),
// as Windows 8.1 could show the desktop's behind its start screen; or
// nothing, the theme's own black or white.
export const wallpaper = (): string | null => read("showcase-wallpaper");

export function setWallpaper(src: string | null) {
	if (src) {
		root.style.setProperty("--wallpaper", `url("${src}")`);
		root.setAttribute("data-wallpaper", "");
		write("showcase-wallpaper", src);
	} else {
		root.style.removeProperty("--wallpaper");
		root.removeAttribute("data-wallpaper");
		try {
			localStorage.removeItem("showcase-wallpaper");
		} catch {
			// (nothing kept)
		}
	}
}
