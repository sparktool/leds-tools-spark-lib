<script lang="ts" setup>
import NavGroup from './NavGroup.vue'
import NavItem from './NavItem.vue'
</script>

<template>
  <aside class="flex flex-col h-full px-4 py-6 text-white lg:px-2">
    <section class="flex flex-col grow items-center w-full h-14 px-5 space-x-2 bg-gray-0 z-30 lg:static lg:flex-col lg:justify-start lg:px-0 lg:space-x-0 lg:space-y-2 lg:bg-transparent">
      <!-- <NavItem to="/" label="Página inicial" /> -->

<NavGroup label="Entidade1">
  <NavItem :to="{ name: 'entidade1-home' }" label="Listar" />
  <NavItem :to="{ name: 'entidade1-criar' }" label="Criar" />
</NavGroup><NavGroup label="Entidade2">
  <NavItem :to="{ name: 'entidade2-home' }" label="Listar" />
  <NavItem :to="{ name: 'entidade2-criar' }" label="Criar" />
</NavGroup>

    </section>
  </aside>
</template>