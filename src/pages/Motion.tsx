import { css, type Component } from "dreamland/core";
import {
	Button,
	Link,
	ProgressBar,
	ProgressRing,
	swapText,
	swivelIn,
} from "metro-dreamland";
import { PivotPage } from "../frame";
import { PEOPLE, pictureOf } from "./Person";
import { Note, Row, Showcase } from "../showcase";

let Loaders: Component = function () {
	return (
		<Showcase title="progress" from="Windows 8 · ProgressRing, ProgressBar">
			<div>
				<Row>
					<ProgressRing />
					<ProgressRing size="medium" />
					<ProgressRing size="large" />
				</Row>
				<div style="position: relative; height: 1.5rem; margin-top: 1rem">
					<ProgressBar />
				</div>
				<Note>
					Microsoft's own key frames, from the controls' default templates.
				</Note>
			</div>
		</Showcase>
	);
};

let Pages: Component = function () {
	return (
		<Showcase title="turnstile and feather" from="Windows Phone 8 · page transitions">
			<div>
				<Row>
					<Link href="/settings" class="m-button" data-m-tilt>
						open settings
					</Link>
				</Row>
				<Note>
					Going to another page, this one swings away round the left edge of
					the screen, a piece at a time, and the next swings in. The pivot's
					headers above slide instead: swipe across, or tap one.
				</Note>
			</div>
		</Showcase>
	);
};

const LINES = [
	"the weather's clearing up",
	"three new messages",
	"next: lunch with anna",
	"battery at 64%",
];

let Text: Component = function () {
	let n = 0;
	return (
		<Showcase title="swivel" from="Windows Phone 8 · text and toasts">
			<div>
				<p class="swivel-line" aria-live="polite">
					{LINES[0]}
				</p>
				<Row>
					<Button
						on:click={(e: Event) => {
							const line = (e.currentTarget as Element)
								.closest("section")!
								.querySelector<HTMLElement>(".swivel-line")!;
							void swapText(line, () => {
								n = (n + 1) % LINES.length;
								line.textContent = LINES[n];
							});
						}}
					>
						next
					</Button>
					<Button
						on:click={(e: Event) => {
							const line = (e.currentTarget as Element)
								.closest("section")!
								.querySelector<HTMLElement>(".swivel-line")!;
							void swivelIn(line);
						}}
					>
						swing in
					</Button>
				</Row>
			</div>
		</Showcase>
	);
};

let Tilt: Component = function () {
	return (
		<Showcase title="tilt" from="Windows Phone Toolkit · TiltEffect">
			<div>
				<Row>
					<div class="tilt-pad" data-m-tilt>
						press me
					</div>
				</Row>
				<Note>
					Whatever's pressed leans away from the finger, and springs back when
					it's let go. Everything that can be pressed here does it.
				</Note>
			</div>
		</Showcase>
	);
};

// Continuum: a list of people, each a link to their page; the name and the
// picture are marked on both (data-m-keep), so they stay through the change
// and travel to where they are on the other page.
let Continuum: Component = function () {
	return (
		<Showcase title="continuum" from="Windows Phone 8 · page transitions">
			<div>
				{PEOPLE.map((p) => (
					<Link href={`/people/${p.id}`} class="person" data-m-nav="continuum">
						<img
							class="avatar"
							src={pictureOf(p.colour)}
							alt=""
							data-m-keep={`avatar:${p.id}`}
						/>
						<span class="who">
							<span class="name" data-m-keep={`person:${p.id}`}>
								{p.name}
							</span>
							<span class="line">{p.line}</span>
						</span>
					</Link>
				))}
				<Note>
					Open one: the name and the picture stay on screen and travel to
					their places on the next page, while the rest swings away. Back
					brings them home.
				</Note>
			</div>
		</Showcase>
	);
};
Continuum.style = css`
	/* (the links are <Link>s: another component's, so :global) */
	:global(.person) {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		padding: 0.4rem 0;
		color: inherit;
		text-decoration: none;
	}
	.avatar {
		width: 3.6rem;
		height: 3.6rem;
		flex: none;
	}
	.who {
		display: flex;
		flex-direction: column;
	}
	/* PhoneTextExtraLargeStyle, over a subtle line */
	.name {
		font-size: 2.1333rem;
		font-weight: 350;
		line-height: 1.15;
	}
	.line {
		color: var(--m-subtle);
	}
`;
export let Motion: Component = function () {
	return (
		<PivotPage active="/motion">
			<Continuum />
			<Pages />
			<Tilt />
			<Text />
			<Loaders />
		</PivotPage>
	);
};
