import type { Component } from "dreamland/core";
import { DatePicker, ListPicker, TimePicker } from "metro-dreamland";
import { PivotPage } from "../frame";
import { ACCENTS } from "../settings";
import { Note, Showcase } from "../showcase";

let ListDemo: Component<{}, { chosen: string }> = function () {
	this.chosen = "weekly";
	return (
		<Showcase title="list picker" from={["Windows Phone Toolkit · ListPicker", "Windows 8 · ComboBox"]}>
			<div>
				<ListPicker
					header="back up my photos"
					items={["never", "daily", "weekly", "monthly"]}
					value="weekly"
					onchange={(v) => (this.chosen = v)}
				/>
				<Note>
					{use(this.chosen).map(
						(v) => `chosen: ${v}.`
					)}
				</Note>
			</div>
		</Showcase>
	);
};

let FullDemo: Component = function () {
	return (
		<Showcase
			title="list picker, full"
			from={["Windows Phone Toolkit · ListPicker, full mode", "Windows 8 · ComboBox, a long one"]}
		>
			<div>
				<ListPicker
					header="colour"
					fullHeader="choose a colour"
					items={[...ACCENTS]}
					value="cobalt"
				/>
				<Note>
					<span class="only-phone">
						More than five open a page of their own; five or fewer open in
						place.
					</span>
					<span class="only-desktop">
						The list drops down over the box, the chosen one where the box
						was, and scrolls when it's long.
					</span>
				</Note>
			</div>
		</Showcase>
	);
};

let DateDemo: Component<{}, { when: Date }> = function () {
	this.when = new Date();
	return (
		<Showcase title="date picker" from={["Windows Phone Toolkit · DatePicker", "Windows 8.1 · DatePicker"]}>
			<div>
				<DatePicker header="date" onchange={(d) => (this.when = d)} />
				<Note>
					{use(this.when).map((d) =>
						d.toLocaleDateString(undefined, { dateStyle: "full" })
					)}
				</Note>
			</div>
		</Showcase>
	);
};

let TimeDemo: Component = function () {
	return (
		<Showcase title="time picker" from={["Windows Phone Toolkit · TimePicker", "Windows 8.1 · TimePicker"]}>
			<div>
				<TimePicker header="alarm" />
				<Note>
					The columns, their order and how the value is written are the
					browser's locale's.
				</Note>
			</div>
		</Showcase>
	);
};

export let Pickers: Component = function () {
	return (
		<PivotPage active="/pickers">
			<ListDemo />
			<FullDemo />
			<DateDemo />
			<TimeDemo />
		</PivotPage>
	);
};
