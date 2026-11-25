import { css, type Component } from "dreamland/core";
import {
	formFactorChoice,
	type Idiom,
	idiom,
	ListPicker,
	material,
	navigation,
	type NavigationRule,
	navigationRules,
	orientation,
	Page,
	PageHeader,
	resolveNavigation,
	RingButton,
	setFormFactor,
	setMaterial,
	setNavigation,
	type FormFactorChoice,
} from "metro-dreamland";
import {
	ACCENTS,
	accent,
	setAccent,
	setTheme,
	setWallpaper,
	theme,
	wallpaper,
	type Accent,
} from "../settings";
import { WALLPAPERS } from "../wallpapers";

// each picture's name: its set, and which of them it is ("Windows 8 ·
// nature, 3 of 6")
const NAMES = WALLPAPERS.map((w, i) => {
	const set = WALLPAPERS.filter((x) => x.set === w.set);
	const n = WALLPAPERS.slice(0, i + 1).filter((x) => x.set === w.set).length;
	return set.length > 1 ? `${w.set}, ${n} of ${set.length}` : w.set;
});

// How each kind of device gets to the sections: the pivot, the sidebar, or
// the sidebar only while it's held sideways (or only upright). What's set
// for each now, as one of those, from the rules in force (the showcase's
// own, ./main.tsx, until one's changed here).
type Way = "pivot" | "sidebar" | "landscape" | "portrait";
const IDIOMS: { idiom: Idiom; label: string }[] = [
	{ idiom: "phone", label: "on a phone" },
	{ idiom: "tablet", label: "on a tablet" },
	{ idiom: "desktop", label: "on a desktop" },
];
const WAYS = [
	{ value: "pivot", label: "pivot" },
	{ value: "sidebar", label: "sidebar" },
	{ value: "landscape", label: "sidebar when held sideways" },
	{ value: "portrait", label: "sidebar when held upright" },
];
const wayFor = (on: Idiom): Way => {
	const rules = navigationRules();
	const upright = resolveNavigation(rules, on, "portrait");
	const sideways = resolveNavigation(rules, on, "landscape");
	if (upright === sideways) return upright;
	return sideways === "sidebar" ? "landscape" : "portrait";
};
const ruleFor = (way: Way): NavigationRule =>
	way === "landscape"
		? { portrait: "pivot", landscape: "sidebar" }
		: way === "portrait"
			? { portrait: "sidebar", landscape: "pivot" }
			: way;
// (what it comes to here, now: "the pivot, on this desktop, held sideways")
const now = () =>
	`Here and now: the ${navigation()}, on this ${idiom()}, ${
		orientation() === "portrait" ? "upright" : "sideways"
	}.`;

// (a radio group's buttons: the one pressed is the one that's checked)
const check = (e: Event) => {
	for (const b of (e.currentTarget as HTMLElement).parentElement!.children)
		b.setAttribute("aria-checked", `${b === e.currentTarget}`);
};

// The settings. On a phone, the phone's Settings > theme page: one column,
// the background, the accent colour, and the rest under them. On a tablet
// or desktop, a Windows 8 page, which pans sideways: its groups side by
// side, each under its name in large light type, the pictures in a grid as
// tall as the window, flowing to the right (and a mouse wheel moves it
// along, as Windows 8's horizontal pages did).
export let Settings: Component = function () {
	// (each kind of device's, as the page opens; the pickers change them)
	const chosenWays = Object.fromEntries(
		IDIOMS.map(({ idiom: on }) => [on, wayFor(on)])
	) as Record<Idiom, Way>;
	const nowLine = (<p class="hint" aria-live="polite">{now()}</p>) as HTMLElement;
	// (and it follows the window: turned, or made narrow enough for a phone)
	const follow = () => {
		if (nowLine.isConnected) return void (nowLine.textContent = now());
		removeEventListener("m-navigation", follow);
		removeEventListener("resize", follow);
	};
	addEventListener("m-navigation", follow);
	addEventListener("resize", follow);
	return (
		<Page>
			<div class="frame settings-frame">
				<div class="settings-top" data-m-feather>
					<RingButton
						to="/"
						arrow
						aria-label="back"
						data-m-back="/"
						data-m-tip="back"
					>
						<span class="material-symbols" aria-hidden="true">
							{""}
						</span>
					</RingButton>
					<p class="app-title">SETTINGS</p>
				</div>
				<PageHeader>
					<h1>theme</h1>
				</PageHeader>
				<div
					class="body"
					data-m-feather
					on:wheel={(e: WheelEvent) => {
						// (a wheel goes along a page that goes sideways)
						const body = e.currentTarget as HTMLElement;
						if (body.scrollWidth <= body.clientWidth) return;
						if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
						if ((e.target as Element).closest(".m-listpicker-list")) return;
						body.scrollLeft += e.deltaY;
						e.preventDefault();
					}}
				>
					<section class="group">
						<h2 class="group-title">theme</h2>
						<ListPicker
							header="background"
							items={["dark", "light"]}
							value={theme()}
							onchange={(v) => setTheme(v as "dark" | "light")}
						/>
						<ListPicker
							header="tiles"
							items={[
								{ value: "flat", label: "flat (Metro)" },
								{ value: "acrylic", label: "acrylic (Windows 10)" },
							]}
							value={material()}
							onchange={(v) => setMaterial(v as "flat" | "acrylic")}
						/>
						<ListPicker
							header="controls"
							items={[
								{ value: "auto", label: "for this screen" },
								{ value: "phone", label: "the phone's" },
								{ value: "desktop", label: "Windows 8's" },
							]}
							value={formFactorChoice()}
							onchange={(v) => setFormFactor(v as FormFactorChoice)}
						/>
						<p class="hint">
							A phone gets Windows Phone's controls; a tablet or desktop,
							Windows 8's. Choose one to see it anywhere.
						</p>
					</section>
					<section class="group">
						<h2 class="group-title">navigation</h2>
						<p class="m-header accent-header">navigation</p>
						<p class="hint">
							How the sections are got to: the pivot, or Windows 8's PC
							settings sidebar. For each kind of device, and which way up
							it's held.
						</p>
						{IDIOMS.map(({ idiom: on, label }) => (
							<ListPicker
								header={label}
								items={WAYS}
								value={wayFor(on)}
								onchange={(v) => {
									chosenWays[on] = v as Way;
									setNavigation({
										phone: ruleFor(chosenWays.phone),
										tablet: ruleFor(chosenWays.tablet),
										desktop: ruleFor(chosenWays.desktop),
									});
									nowLine.textContent = now();
								}}
							/>
						))}
						{nowLine}
					</section>
					<section class="group">
						<h2 class="group-title">accent colour</h2>
						<p class="m-header accent-header">accent colour</p>
						<div class="accents" role="radiogroup" aria-label="accent colour">
							{ACCENTS.map((name) => (
								<button
									type="button"
									role="radio"
									aria-label={name}
									data-m-tip={name}
									aria-checked={accent() === name ? "true" : "false"}
									style={`background: var(--m-${name})`}
									data-m-tilt
									on:click={(e: Event) => {
										setAccent(name as Accent);
										check(e);
									}}
								/>
							))}
						</div>
					</section>
					<section class="group pictures-group">
						<h2 class="group-title">background picture</h2>
						<p class="m-header accent-header">background picture</p>
						<div
							class="pictures"
							role="radiogroup"
							aria-label="background picture"
						>
							<button
								type="button"
								role="radio"
								class="none"
								aria-label="none"
								data-m-tip="none"
								aria-checked={wallpaper() ? "false" : "true"}
								data-m-tilt
								on:click={(e: Event) => {
									setWallpaper(null);
									check(e);
								}}
							>
								none
							</button>
							{WALLPAPERS.map((w, i) => (
								<button
									type="button"
									role="radio"
									aria-label={NAMES[i]}
									data-m-tip={NAMES[i]}
									aria-checked={wallpaper() === w.src ? "true" : "false"}
									style={`background-image: url("${w.thumb}")`}
									data-m-tilt
									on:click={(e: Event) => {
										setWallpaper(w.src);
										check(e);
									}}
								/>
							))}
						</div>
					</section>
				</div>
			</div>
		</Page>
	);
};
Settings.style = css`
	.settings-top {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		margin-bottom: 0.6rem;
	}
	.settings-top .app-title {
		margin: 0;
	}
	.body {
		max-width: 24rem;
	}
	.group-title {
		display: none;
	}
	.hint {
		margin: 0.2rem 0 0.6rem;
		color: var(--m-subtle);
		font-size: 0.9rem;
		line-height: 1.4;
	}
	.accent-header {
		margin-top: 0.6rem;
	}
	/* the phone's accent picker: the colours as squares, four across */
	.accents {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.6rem;
		margin-top: 0.4rem;
	}
	.accents button {
		aspect-ratio: 1;
		border: 0;
		padding: 0;
		cursor: pointer;
	}
	.accents button[aria-checked="true"],
	.pictures button[aria-checked="true"] {
		outline: 0.15rem solid var(--m-fg);
		outline-offset: 0.15rem;
	}
	/* the pictures, three across, as wide as a screen of the time */
	.pictures {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.6rem;
		margin-top: 0.4rem;
	}
	.pictures button {
		aspect-ratio: 16 / 10;
		border: 0;
		padding: 0;
		background: var(--m-chrome) center / cover no-repeat;
		color: var(--m-subtle);
		font: inherit;
		cursor: pointer;
	}
`;
