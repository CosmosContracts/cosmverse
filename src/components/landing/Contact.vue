<template>
  <div>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-12">
              Contact
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" >
import { Component, Vue } from 'vue-property-decorator';


@Component<Contact>({
  metaInfo() {
    return {
      title: 'Cosmverse cares about environmental impact',
      titleTemplate: '%s | Low Carbon NFTs',
      meta: [
        { name: 'description', content: 'Creating Carbonless NFTs on Juno' },
        { property: 'og:title', content: 'Cosmverse cares about environmental impact'},
        { property: 'og:image', content: 'https://www.cosmverse.com/Cosmverse_carbonless.jpg'},
        { property: 'og:description', content: 'Creating Carbonless NFTs on Juno'},
        { property: 'twitter:title', content: 'Cosmverse cares about environmental impact'},
        { property: 'twitter:description', content: 'Creating Carbonless NFTs on Juno'},
        { property: 'twitter:image', content: 'https://www.cosmverse.com/Cosmverse_carbonless.jpg'},
      ]
    }
  },
  components: {}
})
export default class Contact extends Vue {

}
</script>
