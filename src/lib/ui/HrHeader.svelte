<script>
	export let header;
</script>

<h3>{header}</h3>
<div class="header-hr" />

<style>
	.header-hr {
		@apply border-solid;
		@apply border-b-2;
		@apply border-gray-400;
		@apply w-full;
		@apply -mt-2px;
		@apply relative;
		@apply -z-1;
	}
</style>
