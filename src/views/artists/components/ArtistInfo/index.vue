<template>
  <van-cell-group inset class="cell-group-card">
    <van-cell title="艺人名" :label="artistDetail.artist.name" />
    <van-cell v-if="artistDetail.artist.transNames && artistDetail.artist.transNames.length" title="译名" :label="artistDetail.artist.transNames[0]" />
    <van-cell v-if="artistDetail.identify" title="身份" :label="artistDetail.identify.imageDesc" />
    <van-cell v-else-if="artistDetail.artist.identities.length" title="身份" :label="artistDetail.artist.identities.join('、')" />
    <van-cell title="简介" :label="artistDetail.artist.briefDesc" />
  </van-cell-group>
</template>

<script lang="ts">
export default {
  name: 'ArtistInfo',

  props: {
    artistDetail: {
      type: Object,
      require: true
    }
  }
}
</script>
