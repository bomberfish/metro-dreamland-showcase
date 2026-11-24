import {
	css,
	type Component,
	type ComponentChild,
	type Pointer,
} from "dreamland/core";

// What each component's part of a page is, laid out as the phone laid out
// its settings: the name in large light type, where it's from under it in
// the subtle colour, the thing itself, then whatever there is to change
// about it, each a label over its control.
export let Showcase: Component<{
	title: string;
	/**
	 * where it's from: "Windows Phone 8 · CheckBox"; or the phone's and
	 * Windows 8's, where it's each in turn (the form factor's)
	 */
	from?: string | [phone: string, desktop: string];
	/** the demo, and (if there are any) its options */
	children: ComponentChild;
}> = function () {
	const [demo, options] = ([] as ComponentChild[]).concat(
		this.children as ComponentChild
	);
	return (
		<section data-m-feather>
			<h2 class="title">{this.title}</h2>
			{this.from ? (
				<p class="from">
					{typeof this.from === "string" ? (
						this.from
					) : (
						<>
							<span class="only-phone">{this.from[0]}</span>
							<span class="only-desktop">{this.from[1]}</span>
						</>
					)}
				</p>
			) : null}
			<div class="demo">{demo}</div>
			{options ? <div class="options">{options}</div> : null}
		</section>
	);
};
Showcase.style = css`
	:scope {
		display: flex;
		flex-direction: column;
		break-inside: avoid;
		margin-bottom: 3rem;
		min-width: 0;
	}

	/* PhoneTextLargeStyle: SemiLight, 32 */
	.title {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.6rem;
		font-weight: 350;
		line-height: 1.2;
	}

	/* PhoneTextSubtleStyle, small */
	.from {
		margin: 0.15rem 0 0;
		color: var(--m-subtle);
		font-size: 0.9rem;
	}

	.demo {
		margin-top: 0.6rem;
	}

	.options {
		margin-top: 0.6rem;
	}
`;

/** A row of a demo: things side by side, as they'd sit on a page. */
export let Row: Component<{ children: ComponentChild }> = function () {
	return <div>{this.children}</div>;
};
Row.style = css`
	:scope {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem 0.9rem;
	}
`;

/** Prose under a demo, in the subtle colour. */
export let Note: Component<{ children: ComponentChild }> = function () {
	return <p>{this.children}</p>;
};
Note.style = css`
	:scope {
		margin: 0.6rem 0 0;
		color: var(--m-subtle);
		font-size: 0.95rem;
		line-height: 1.4;
		max-width: 30rem;
	}
`;

/**
 * Something drawn again whenever `deps` changes: for showing a component
 * as its options have it, since a component here draws its props once
 * (they're made for server-rendered pages, which don't re-render).
 */
export function redraw<T>(
	deps: Pointer<T>,
	draw: (value: T) => ComponentChild
): ComponentChild {
	return deps.map(draw);
}
