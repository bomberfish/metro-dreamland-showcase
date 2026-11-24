import type { Component } from "dreamland/core";
import {
	Tile,
	TileBack,
	TileCount,
	TileFront,
	TileLabel,
	TileSlide,
	Tiles as TileGrid,
} from "metro-dreamland";
import { PivotPage } from "../frame";
import { Note, Showcase } from "../showcase";

const Glyph = (name: string) => (
	<span class="material-symbols tile-glyph" aria-hidden="true">
		{name}
	</span>
);

let Start: Component = function () {
	return (
		<Showcase title="start" from="Windows Phone 8 · live tiles">
			<div style="--u: 4.4rem; --g: 0.6rem">
				<TileGrid>
					<Tile color="accent" w={2} h={2}>
						{Glyph("mail")}
						<TileCount>3</TileCount>
						<TileLabel>outlook</TileLabel>
					</Tile>
					<Tile color="red" w={1} h={1}>
						{Glyph("music_note")}
					</Tile>
					<Tile color="emerald" w={1} h={1}>
						{Glyph("shopping_bag")}
					</Tile>
					<Tile color="cobalt" w={2} h={1} flip>
						<TileFront>
							{Glyph("calendar_month")}
							<TileLabel>calendar</TileLabel>
						</TileFront>
						<TileBack>
							<TileLabel>lunch with anna, 12:30</TileLabel>
						</TileBack>
					</Tile>
					<Tile color="magenta" w={4} h={2} cycle>
						<TileSlide current>
							<TileLabel>people</TileLabel>
						</TileSlide>
						<TileSlide>
							<TileLabel>bob updated his profile picture</TileLabel>
						</TileSlide>
						<TileSlide>
							<TileLabel>anna: on my way</TileLabel>
						</TileSlide>
					</Tile>
					<Tile color="orange" w={1} h={1}>
						{Glyph("photo_camera")}
					</Tile>
					<Tile color="teal" w={1} h={1}>
						{Glyph("map")}
					</Tile>
					<Tile color="steel" w={2} h={1}>
						<TileLabel>settings</TileLabel>
					</Tile>
				</TileGrid>
			</div>
			<Note>
				Tiles turn over and push new slides up on their own; point at one to
				turn it now. Press any to see it lean.
			</Note>
		</Showcase>
	);
};

let Materials: Component = function () {
	const sample = (material: "flat" | "acrylic") => (
		<div data-m-material={material} class="material-sample">
			<p class="material-name">{material}</p>
			<div>
				<TileGrid>
					<Tile color="accent" w={2} h={2}>
						{Glyph("cloud")}
						<TileLabel>weather</TileLabel>
					</Tile>
					<Tile color="crimson" w={2} h={1}>
						<TileLabel>news</TileLabel>
					</Tile>
					<Tile color="graphite" w={1} h={1}>
						{Glyph("call")}
					</Tile>
					<Tile color="indigo" w={1} h={1}>
						{Glyph("chat")}
					</Tile>
				</TileGrid>
			</div>
		</div>
	);
	return (
		<Showcase title="materials" from="Metro's flat, and Windows 10's acrylic">
			<div class="materials">
				{sample("flat")}
				{sample("acrylic")}
			</div>
			<Note>
				Flat is Metro as it was. Acrylic is Windows 10's frosted glass, by
				WinUI's own recipe: choose it for the whole showcase in settings.
			</Note>
		</Showcase>
	);
};

export let Tiles: Component = function () {
	return (
		<PivotPage active="/tiles">
			<Start />
			<Materials />
		</PivotPage>
	);
};
