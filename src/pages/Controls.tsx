import type { Component } from "dreamland/core";
import {
	Button,
	CheckBox,
	ListPicker,
	RadioButton,
	RingButton,
	Slider,
	TextBox,
	Toggle,
} from "metro-dreamland";
import { PivotPage } from "../frame";
import { Note, redraw, Row, Showcase } from "../showcase";

let ButtonDemo: Component<{}, { disabled: boolean }> = function () {
	this.disabled = false;
	return (
		<Showcase title="button" from={["Windows Phone 8 · Button", "Windows 8 · Button"]}>
			{redraw(use(this.disabled), (off) => (
				<Row>
					<Button disabled={off || undefined}>send</Button>
					<Button disabled={off || undefined}>cancel</Button>
				</Row>
			))}
			<Toggle
				label="disabled"
				off="enabled"
				on="disabled"
				onchange={(on) => (this.disabled = on)}
			/>
		</Showcase>
	);
};

let RingDemo: Component<{}, { disabled: boolean }> = function () {
	this.disabled = false;
	return (
		<Showcase title="round button" from="Windows Phone 8 · the app bar's">
			{redraw(use(this.disabled), (off) => (
				<Row>
					{["add", "edit", "delete", "refresh", "share"].map((icon) => (
						<RingButton
							aria-label={icon}
							data-m-tip={icon}
							disabled={off || undefined}
						>
							<span class="material-symbols">{icon}</span>
						</RingButton>
					))}
					<RingButton
						arrow
						aria-label="back"
						data-m-tip="back"
						disabled={off || undefined}
					>
						<span class="material-symbols">{""}</span>
					</RingButton>
				</Row>
			))}
			<Toggle
				label="disabled"
				off="enabled"
				on="disabled"
				onchange={(on) => (this.disabled = on)}
			/>
		</Showcase>
	);
};

let CheckDemo: Component<{}, { disabled: boolean }> = function () {
	this.disabled = false;
	return (
		<Showcase title="check box" from={["Windows Phone 8 · CheckBox", "Windows 8 · CheckBox"]}>
			{redraw(use(this.disabled), (off) => (
				<div>
					<CheckBox checked disabled={off || undefined}>
						download over wi-fi only
					</CheckBox>
					<CheckBox disabled={off || undefined}>show on lock screen</CheckBox>
					<CheckBox indeterminate disabled={off || undefined}>
						some of the above
					</CheckBox>
				</div>
			))}
			<Toggle
				label="disabled"
				off="enabled"
				on="disabled"
				onchange={(on) => (this.disabled = on)}
			/>
		</Showcase>
	);
};

let RadioDemo: Component = function () {
	return (
		<Showcase title="radio button" from={["Windows Phone 8 · RadioButton", "Windows 8 · RadioButton"]}>
			<div role="radiogroup" aria-label="ringtone">
				<RadioButton name="ring" value="beep" checked>
					beep
				</RadioButton>
				<RadioButton name="ring" value="chime">
					chime
				</RadioButton>
				<RadioButton name="ring" value="silence">
					silence
				</RadioButton>
				<RadioButton name="ring" value="none" disabled>
					none (disabled)
				</RadioButton>
			</div>
		</Showcase>
	);
};

let ToggleDemo: Component<{}, { on: boolean }> = function () {
	this.on = true;
	return (
		<Showcase title="toggle switch" from={["Windows Phone Toolkit · ToggleSwitch", "Windows 8 · ToggleSwitch"]}>
			<div>
				<p class="toggle-label">wi-fi networking</p>
				<Toggle
					label="wi-fi networking"
					checked
					onchange={(on) => (this.on = on)}
				/>
				<Note>
					{use(this.on).map((on) =>
						on ? "searching for networks…" : "wi-fi is off"
					)}
				</Note>
			</div>
		</Showcase>
	);
};

type Size = "small" | "medium" | "large";

let SliderDemo: Component<{}, { size: Size }> = function () {
	this.size = "medium";
	return (
		<Showcase title="slider" from="Windows 8 · Slider">
			{redraw(use(this.size), (size) => (
				<Slider
					name="volume"
					label="ringer + notifications"
					min={0}
					max={30}
					value={18}
					size={size}
				/>
			))}
			<ListPicker
				header="size"
				items={["small", "medium", "large"]}
				value="medium"
				onchange={(v) => (this.size = v as Size)}
			/>
		</Showcase>
	);
};

type Box = "text" | "password" | "multiline" | "read-only" | "disabled";

let TextDemo: Component<{}, { kind: Box }> = function () {
	this.kind = "text";
	return (
		<Showcase title="text box" from={["Windows Phone 8 · TextBox, PasswordBox", "Windows 8 · TextBox, PasswordBox"]}>
			{redraw(use(this.kind as Box), (kind) => (
				<TextBox
					header={kind === "password" ? "password" : "subject"}
					hint={kind === "password" ? "" : "what's it about?"}
					type={kind === "password" ? "password" : "text"}
					lines={kind === "multiline" ? 4 : undefined}
					value={
						kind === "read-only" || kind === "disabled"
							? "lunch on friday"
							: kind === "password"
								? "hunter2"
								: undefined
					}
					readonly={kind === "read-only" || undefined}
					disabled={kind === "disabled" || undefined}
				/>
			))}
			<ListPicker
				header="kind"
				items={["text", "password", "multiline", "read-only", "disabled"]}
				value="text"
				onchange={(v) => (this.kind = v as Box)}
			/>
		</Showcase>
	);
};

export let Controls: Component = function () {
	return (
		<PivotPage active="/">
			<ButtonDemo />
			<RingDemo />
			<CheckDemo />
			<RadioDemo />
			<ToggleDemo />
			<SliderDemo />
			<TextDemo />
		</PivotPage>
	);
};
