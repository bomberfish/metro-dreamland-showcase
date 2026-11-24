import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		// metro-dreamland is linked from beside this repo and has no
		// node_modules of its own: its imports of dreamland have to come
		// here, to the one copy the app uses
		dedupe: ["dreamland"],
	},
	server: {
		port: 5300,
		// on the LAN too, for looking at it on a phone
		host: true,
		allowedHosts: true,
	},
});
