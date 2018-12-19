<template>
  <div id="app">
    <AppHeader/>
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
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
  
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
