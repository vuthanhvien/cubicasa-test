<script>
/**
 * A page title component - Renders the title with breadcrumbs
 */
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
</script>

<template>
  <!-- start page title -->
  <div class="row page-title">
    <div class="col-md-12">
        <h4 class="mb-0 d-inline-block">
          <slot name="actions"></slot>
          {{ title }}</h4
        >
      <b-breadcrumb :items="items" class="float-right mt-1"></b-breadcrumb>
    </div>
  </div>
  <!-- end page title -->
</template>
