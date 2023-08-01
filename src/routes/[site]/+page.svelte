<script>
	import { PrimoPage } from '@primocms/builder'

	export let data
</script>

<PrimoPage
	data={{
		...data,
		sections: data.sections
	}}
/>
