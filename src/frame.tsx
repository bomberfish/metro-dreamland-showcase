import { css, type Component, type ComponentChild } from "dreamland/core";
import { AppBar, navigate, Page, PageHeader, Pivot } from "metro-dreamland";

// The showcase's sections: one pivot, each a page of its own (so the pivot
// slides between them as it does, and a swipe across turns it).
export const SECTIONS = [
	{ href: "/", label: "controls" },
	{ href: "/pickers", label: "pickers" },
	{ href: "/menus", label: "menus" },
	{ href: "/tiles", label: "tiles" },
	{ href: "/motion", label: "motion" },
];

// A section: the application's title in capitals over the pivot (as every
// phone app's page had it), then what's in it, set in columns on a screen
// wide enough for more than one, as Windows 8 laid out a hub.
export let PivotPage: Component<{
	active: string;
	children: ComponentChild;
}> = function () {
	return (
		<Page kind="pivot">
			<div class="frame">
				<p class="app-title" data-m-feather>
					METRO-DREAMLAND
				</p>
				<PageHeader>
					<Pivot items={SECTIONS} active={this.active} />
				</PageHeader>
				<div class="sections" data-m-content>
					{this.children}
				</div>
			</div>
		</Page>
	);
};
PivotPage.style = css`
	.sections {
		columns: 24rem auto;
		column-gap: 4.5rem;
		padding-top: 1.5rem;
	}
`;

// The app bar every page has: the settings, and a menu. (Pinned: on a
// tablet or desktop it stays up, rather than waiting for a right-click.)
export let ShowcaseBar: Component = function () {
	return (
		<AppBar
			pinned
			buttons={[
				{
					icon: "settings",
					label: "settings",
					onclick: () => void navigate("/settings"),
				},
				{
					icon: "code",
					label: "source",
					onclick: () =>
						void open("https://github.com/bomberfish/metro-dreamland", "_blank"),
				},
			]}
			menu={[
				{
					label: "about metro-dreamland",
					onclick: () =>
						void open("https://github.com/bomberfish/metro-dreamland#readme", "_blank"),
				},
				{
					label: "dreamland.js",
					onclick: () => void open("https://dreamland.js.org", "_blank"),
				},
			]}
		/>
	);
};
