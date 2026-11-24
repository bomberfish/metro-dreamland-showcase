import { css, type Component } from "dreamland/core";
import {
	Button,
	CheckBox,
	ContextMenu,
	ListPicker,
	showMessageBox,
	showToast,
	Toggle,
} from "metro-dreamland";
import { PivotPage } from "../frame";
import { Note, redraw, Row, Showcase } from "../showcase";

// a phone list's line: the name large, a line about it under
let Line: Component<{ title: string; sub: string }> = function () {
	return (
		<div data-m-tilt>
			<p class="t">{this.title}</p>
			<p class="s">{this.sub}</p>
		</div>
	);
};
Line.style = css`
	:scope {
		padding: 0.3rem 0 0.5rem;
		cursor: default;
	}
	/* PhoneTextExtraLargeStyle: SemiLight, 42.667 */
	.t {
		margin: 0;
		font-size: 2.1333rem;
		font-weight: 350;
		line-height: 1.15;
	}
	.s {
		margin: 0;
		color: var(--m-subtle);
	}
`;

let MenuDemo: Component<{}, { zoom: boolean; said: string }> = function () {
	this.zoom = true;
	this.said = "";
	const say = (what: string) => () => (this.said = what);
	return (
		<Showcase title="context menu" from={["Windows Phone Toolkit · ContextMenu", "Windows 8.1 · MenuFlyout"]}>
			<div>
				{redraw(use(this.zoom), (zoom) => (
					<div>
						{[
							["anna", "mobile · 555 0123"],
							["bob", "work · 555 0188"],
						].map(([name, sub]) => (
							<ContextMenu
								zoom={zoom}
								items={[
									{ label: "pin to start", onclick: say(`pinned ${name}`) },
									{ label: "edit", onclick: say(`editing ${name}`) },
									"-",
									{ label: "delete", onclick: say(`deleted ${name}`) },
									{ label: "share contact", disabled: true },
								]}
							>
								<Line title={name} sub={sub} />
							</ContextMenu>
						))}
					</div>
				))}
				<Note>
					{use(this.said).map(
						(s) => s || "Hold one down, or right-click it."
					)}
				</Note>
			</div>
			<Toggle
				label="zoom the page back"
				off="page stays"
				on="page zooms"
				checked
				onchange={(on) => (this.zoom = on)}
			/>
		</Showcase>
	);
};

let BoxDemo: Component<{}, { buttons: string; answer: string }> = function () {
	this.buttons = "two";
	this.answer = "";
	return (
		<Showcase title="message box" from={["Windows Phone Toolkit · CustomMessageBox", "Windows 8 · MessageDialog"]}>
			<div>
				<Button
					on:click={async (e: Event) => {
						const two = this.buttons === "two";
						const keep = (<CheckBox>don't ask again</CheckBox>) as HTMLElement;
						const i = await showMessageBox({
							title: "METRO-DREAMLAND",
							caption: "delete this message?",
							message:
								"It'll be gone from this phone, and from the server too.",
							content: this.buttons === "with content" ? keep : undefined,
							buttons: two || this.buttons === "with content" ? ["delete", "cancel"] : ["ok"],
							from: e.currentTarget as Element,
						});
						this.answer =
							i === null
								? "dismissed"
								: `pressed ${two || this.buttons === "with content" ? ["delete", "cancel"][i] : "ok"}`;
					}}
				>
					show
				</Button>
				<Note>{use(this.answer).map((a) => a || " ")}</Note>
			</div>
			<ListPicker
				header="buttons"
				items={["one", "two", "with content"]}
				value="two"
				onchange={(v) => (this.buttons = v)}
			/>
		</Showcase>
	);
};

let ToastDemo: Component = function () {
	return (
		<Showcase title="toast" from={["Windows Phone 8 · toast notification", "Windows 8 · toast notification"]}>
			<div>
				<Row>
					<Button
						on:click={() =>
							void showToast({
								icon: "mail",
								title: "Anna",
								message: "are we still on for lunch?",
							})
						}
					>
						send one
					</Button>
				</Row>
				<Note>Tap it to open it; flick it to the right to send it away.</Note>
			</div>
		</Showcase>
	);
};

let TipDemo: Component = function () {
	return (
		<Showcase title="tooltip" from="Windows 8 · ToolTip">
			<div>
				<Row>
					<Button data-m-tip="sends it now">send</Button>
					<Button data-m-tip="keeps it as a draft">save</Button>
				</Row>
				<Note>Rest the pointer on one, or tab to it. (The phone had none.)</Note>
			</div>
		</Showcase>
	);
};

let BarDemo: Component = function () {
	return (
		<Showcase title="app bar" from={["Windows Phone 8.1 · CommandBar", "Windows 8.1 · AppBar"]}>
			<Note>
				<span class="only-phone">
					It's at the foot of every page here. Press the ellipsis (or
					anywhere on it, minimised) to open it: the labels, then the menu.
					Pressing a command, or anywhere off it, closes it again.
				</span>
				<span class="only-desktop">
					It's at the foot of every page here, pinned. Unpinned, it would
					wait for a right-click on the page, as Windows 8's did. Its menu is
					behind "more", at the left.
				</span>
			</Note>
		</Showcase>
	);
};

export let Menus: Component = function () {
	return (
		<PivotPage active="/menus">
			<MenuDemo />
			<BoxDemo />
			<ToastDemo />
			<TipDemo />
			<BarDemo />
		</PivotPage>
	);
};
