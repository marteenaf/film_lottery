<template>
  <div class="wrapper d-flex flex-column">
    <div class="fixed-header">
      <slot name="fixed-header"></slot>
    </div>
    <div class="main-body auto">
      <slot name="main-body"></slot>
    </div>
    <div class="fixed-footer">
      <slot name="fixed-footer"></slot>
    </div>
  </div>
</template>