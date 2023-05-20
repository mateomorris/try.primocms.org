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
</script>

<Primo {data}>
	<slot />
</Primo>
