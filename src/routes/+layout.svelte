<script lang="ts">
	import '../app.css';
</script>

<nav class="bg-gray-50">
	<div class="max-w-screen-xl px-4 py-3 mx-auto">
		<div class="flex items-center">
			<ul class="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
				<li>
					<a href="/about" class="text-gray-900 hover:underline" aria-current="page">About</a>
				</li>
				<li>
					<a href="/projects" class="text-gray-900 hover:underline">Projects</a>
				</li>
				<li>
					<a href="contact" class="text-gray-900 hover:underline">Contact</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<slot />

<style>
	/* CSS Reset: https://www.joshwcomeau.com/css/custom-css-reset/ */
	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}
	:global(*) {
		margin: 0;
	}
	:global(html),
	:global(body) {
		height: 100%;
	}
	:global(body) {
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
	}
	:global(img),
	:global(picture),
	:global(video),
	:global(canvas),
	:global(svg) {
		display: block;
		max-width: 100%;
	}
	:global(input),
	:global(button),
	:global(textarea),
	:global(select) {
		font: inherit;
	}
	:global(p),
	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5),
	:global(h6) {
		overflow-wrap: break-word;
	}
	:global(#root),
	:global(#__next) {
		isolation: isolate;
	}
	/* End of CSS reset */
</style>
