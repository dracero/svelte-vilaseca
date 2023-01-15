import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};



export default config

//ejecutar:
/* npm i -D @sveltejs/adapter-vercel@next

y luego cambiar el config por el archivo de más arriba*/
