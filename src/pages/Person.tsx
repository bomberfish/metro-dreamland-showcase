import { css, type Component } from "dreamland/core";
import { Page, PageHeader, RingButton } from "metro-dreamland";

// The people in the continuum demo (./Motion.tsx): a list there, a page
// each here. What's on both (the name, the picture) is marked with the same
// key (data-m-keep), and stays on screen through the change, travelling to
// where it belongs on the other page.
export const PEOPLE = [
	{ id: "anna", name: "anna", colour: "#d80073", line: "mobile · 555 0123", note: "on my way!" },
	{ id: "bob", name: "bob", colour: "#0050ef", line: "work · 555 0188", note: "updated his profile picture" },
	{ id: "chris", name: "chris", colour: "#008a00", line: "home · 555 0142", note: "lunch on friday?" },
];

/**
 * A person's picture: a square of their colour (magenta, cobalt, emerald
 * from the phone's accents), as an image, which is what continuum carries
 * from box to box.
 */
export const pictureOf = (colour: string) =>
	`data:image/svg+xml,${encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="${colour}"/></svg>`
	)}`;

export let Person: Component<{ id: string }> = function () {
	const person = PEOPLE.find((p) => p.id === this.id) ?? PEOPLE[0];
	return (
		<Page>
			<div class="frame">
				<div class="top" data-m-feather>
					<RingButton
						to="/motion"
						arrow
						aria-label="back"
						data-m-back="/motion"
						data-m-tip="back"
					>
						<span class="material-symbols" aria-hidden="true">
							{""}
						</span>
					</RingButton>
					<p class="app-title">PEOPLE</p>
				</div>
				<PageHeader>
					<h1 data-m-keep={`person:${person.id}`}>{person.name}</h1>
				</PageHeader>
				<div class="body">
					<img
						class="picture"
						src={pictureOf(person.colour)}
						alt=""
						data-m-keep={`avatar:${person.id}`}
					/>
					<div class="facts" data-m-feather>
						<p class="label">call</p>
						<p class="value">{person.line}</p>
						<p class="label">what's new</p>
						<p class="value">{person.note}</p>
					</div>
				</div>
			</div>
		</Page>
	);
};
Person.style = css`
	.top {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		margin-bottom: 0.6rem;
	}
	.top .app-title {
		margin: 0;
	}
	.body {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		margin-top: 1.5rem;
	}
	.picture {
		width: 10rem;
		height: 10rem;
		flex: none;
	}
	/* PhoneTextSubtleStyle over PhoneTextExtraLargeStyle */
	.label {
		margin: 0;
		color: var(--m-subtle);
	}
	.value {
		margin: 0 0 1rem;
		font-size: 1.6rem;
		font-weight: 350;
	}
`;
