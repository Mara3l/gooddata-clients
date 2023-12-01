<script lang="ts">
	import { onMount } from 'svelte';
	import * as React from 'react';
	import * as ReactDOM from 'react-dom';
	import tigerFactory, { TigerTokenAuthProvider } from '@gooddata/sdk-backend-tiger';
	import "@gooddata/sdk-ui-ext/styles/css/main.css";

	const backend = tigerFactory()
		.onHostname('<GOODDATA-HOST>')
		.withAuthentication(
			new TigerTokenAuthProvider(
				'<GOODDATA-TOKEN>'
			)
		);

	onMount(async () => {
		const { InsightView } = await import('@gooddata/sdk-ui-ext');
		const node = document.getElementById('gooddata-chart');
		const props = {
			workspace: '<GOODDATA-WORKSPACE>',
			insight: '<INSIGHT-ID>',
			backend
		};

		if (node) {
			ReactDOM.render(React.createElement(InsightView, props), node);
		}
	});
</script>

<h1>SvelteKit with GoodData</h1>
<div id="gooddata-chart"></div>

<style global>
	#gooddata-chart {
		width: 400px;
		height: 300px
	}
</style>
