import { createApp } from "vue";
import App from "./App.vue";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { createPinia } from "pinia";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, md } from "vuetify/iconsets/md";
import "material-design-icons-iconfont/dist/material-design-icons.css";

const vuetify = createVuetify({
	components,
	directives,
	icons: {
		defaultSet: "md",
		aliases,
		sets: {
			md,
		},
	},
	theme: {
		defaultTheme: "light",
	}
});

const pinia = createPinia();
const app = createApp(App);
app.use(vuetify);
app.use(pinia);
app.mount("#app");

