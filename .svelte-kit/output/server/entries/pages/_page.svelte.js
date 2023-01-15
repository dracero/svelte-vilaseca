import { c as create_ssr_component, e as escape, v as validate_component } from "../../chunks/index.js";
const App_svelte_svelte_type_style_lang = "";
const css = {
  code: "body{margin:0;overflow:hidden}",
  map: null
};
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<button>${escape("Reanudar animación")}</button>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(App, "App").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
