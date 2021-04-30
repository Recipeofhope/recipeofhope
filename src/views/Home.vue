<template>
  <div class="home">
    <SignUp />
    <HowItWorks />
    <Counter />
    <Team />
  </div>
</template>

<script>
// @ is an alias to /src
import SignUp from '@/components/SignUp.vue'
import Team from '@/components/Team.vue'
import Counter from '@/components/Counter.vue'
import HowItWorks from '@/components/HowItWorks.vue'

export default {
  name: 'Home',
  components: {
    SignUp,
    Team,
    Counter,
    HowItWorks
  }
}
</script>
