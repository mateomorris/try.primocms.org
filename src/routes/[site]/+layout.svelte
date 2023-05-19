<script>
	import { onDestroy } from 'svelte'
	import { browser } from '$app/environment'
	import Primo, { stores } from '@primocms/builder'
	// import modal from 'primo-editor/stores/app/modal'
	import { page } from '$app/stores'

	export let data

	let showing_sidebar = false

	let leftPaneSize = browser ? (showing_sidebar ? window.innerWidth / 5 + `px` : '0px') : '200px'
	let rightPaneSize = browser
		? showing_sidebar
			? (window.innerWidth / 5) * 5 + 'px'
			: 'auto'
		: 'auto'

	$: if (parseInt(leftPaneSize) < 100) {
		leftPaneSize = '20px'
		rightPaneSize = '100%'
		showing_sidebar = false
	} else if (parseInt(leftPaneSize) >= 100 && !showing_sidebar) {
		reset()
	}

	function reset() {
		leftPaneSize = browser ? window.innerWidth / 5 + 'px' : '0px'
		rightPaneSize = browser ? (window.innerWidth / 5) * 5 + 'px' : '0px'
		showing_sidebar = true
	}

	let siteLocked = false

	onDestroy(() => {
		// if (siteLocked) modal.hide()
	})
</script>

<Primo {data} page_id={$page.params.page} />

<slot />

<div id="app-version">
	<!-- <span>primo v{primo.version}</span> -->
	<!-- <span>server v{__SERVER_VERSION__}</span> -->
</div>

<style lang="postcss">
	main {
		overflow: hidden;
		transition: 0.1s;
		height: calc(100vh - 54px);
		overflow: hidden;
		transition: 0.1s;
		margin-top: 54px;
	}
	[slot='right'] {
		width: 100%;
	}
	[slot='left'] {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #121212;
		color: white;
	}
	.expand {
		height: 100%;
		display: flex;
	}
</style>
