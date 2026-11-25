import "metro-dreamland/metro.css";
import "metro-dreamland/theme.css";
import "./style.css";

import { type Component, type ComponentChild } from "dreamland/core";
import { Route, Router, type RouterState } from "dreamland/router";
import { metroReady, startMetro } from "metro-dreamland";

import { ShowcaseBar } from "./frame";
import { Controls } from "./pages/Controls";
import { Menus } from "./pages/Menus";
import { Motion } from "./pages/Motion";
import { PEOPLE, Person } from "./pages/Person";
import { Pickers } from "./pages/Pickers";
import { Settings } from "./pages/Settings";
import { Tiles } from "./pages/Tiles";
import { restoreSettings } from "./settings";

restoreSettings();

// What's behind every page: the app bar, and (for acrylic to frost) a
// backdrop, which only shows with the acrylic material.
let Layout: Component<{
	routerState?: RouterState;
	children?: ComponentChild;
}> = function () {
	return (
		<div>
			<div class="backdrop" aria-hidden="true" />
			{this.routerState ? use(this.routerState.outlet) : this.children}
			<ShowcaseBar />
		</div>
	);
};

let App: Component = function () {
	return (
		<div id="app">
			<Router>
				<Route
					layout={Layout}
					children={[
						<Route path="" show={() => <Controls />} />,
						<Route path="pickers" show={() => <Pickers />} />,
						<Route path="menus" show={() => <Menus />} />,
						<Route path="tiles" show={() => <Tiles />} />,
						<Route path="motion" show={() => <Motion />} />,
						<Route path="settings" show={() => <Settings />} />,
						...PEOPLE.map((p) => (
							<Route path={`people/${p.id}`} show={() => <Person id={p.id} />} />
						)),
						<Route path="*" show={() => <Controls />} />,
					]}
				/>
			</Router>
		</div>
	);
};

// before the app's drawn: its popstate listener has to come ahead of the
// router's
startMetro({
	outlet: "#app main",
	host: "#app",
	pivots: ["/", "/pickers", "/menus", "/tiles", "/motion"],
	material: "flat",
	// how the sections are got to (the settings page can change it): the
	// pivot, except on a tablet held sideways, which has room for Windows
	// 8's PC settings sidebar
	navigation: {
		phone: "pivot",
		tablet: { portrait: "pivot", landscape: "sidebar" },
		desktop: "pivot",
	},
});
document.querySelector("#app")!.replaceWith(<App />);
metroReady();
