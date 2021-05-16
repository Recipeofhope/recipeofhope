<template>
  <div class="home">
    <Login />
    <HowItWorks />
    <Counter />
    <Team />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Team from '@/components/Team.vue'
import Counter from '@/components/Counter.vue'
import HowItWorks from '@/components/HowItWorks.vue'

export default {
  name: 'Home',
  components: {
    Login,
    Team,
    Counter,
    HowItWorks
  }
}
</script>
