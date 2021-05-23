<template>
  <div class="home">
    <LogIn />
    <HowItWorks />
    <Counter />
    <Team />
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from "@/components/LogIn.vue";
import Team from "@/components/Team.vue";
import Counter from "@/components/Counter.vue";
import HowItWorks from "@/components/HowItWorks.vue";

export default {
  name: "Home",
  components: {
    LogIn,
    Team,
    Counter,
    HowItWorks,
  },
};
</script>
