<template>
  <div id="app">
    <AppHeader/>
    <router-view></router-view>
    <AppFooter/>
  </div>
</template>

<script>
import BodyContent from './components/BodyContent'
import AppHeader from './components/layout/AppHeader'
import AppFooter from './components/layout/AppFooter'

export default {
  name: 'App',
  components: {
    BodyContent,
    AppHeader,
    AppFooter
  }
}
</script>

<style>
  .jumbotron{
    margin-top:6em;
  }
</style>
