<template>
  <div id="app" class="divide-y">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Header />
    <SignUp />
    <Team />
    <Counter />
    <Footer />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import SignUp from './components/SignUp.vue'
import Team from './components/Team.vue'
import Counter from './components/Counter.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    SignUp,
    Team,
    Counter,
    Footer
  }
}
</script>
