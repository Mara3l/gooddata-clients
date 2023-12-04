<script setup lang="ts">
import { onMounted } from 'vue'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import tigerFactory, { TigerTokenAuthProvider } from '@gooddata/sdk-backend-tiger'
import '@gooddata/sdk-ui-ext/styles/css/main.css'
import { InsightView } from '@gooddata/sdk-ui-ext'

const backend = tigerFactory()
  .onHostname('<GOODDATA-HOST>')
  .withAuthentication(
    new TigerTokenAuthProvider(
      '<GOODDATA-TOKEN>'
    )
  )

onMounted(() => {
  const node = document.getElementById('gooddata-chart')
  const props = {
    workspace: '<GOODDATA-WORKSPACE>',
    insight: '<INSIGHT-ID>',
    backend
  }

  if (node) {
    // Weird problem with InsightView type and ReactComponent type
    // @ts-ignore
    ReactDOM.render(React.createElement(InsightView, props), node)
  }
})
</script>

<template>
  <main>
    <h1>Vue.js with GoodData</h1>
    <div id="gooddata-chart"></div>
  </main>
</template>

<style scoped>
#gooddata-chart {
  width: 400px;
  height: 300px;
}
</style>
