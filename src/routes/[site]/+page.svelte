<script>
	import { PrimoPage } from '@primocms/builder'

	export let data

	console.log({ data })
</script>

<PrimoPage
	page={{
		...data.page,
		sections: data.sections
	}}
/>
