import fs from "fs";
import { expandToString } from "../../../template-string";
import path from "path";
import ProjectAbstraction from "seon-lib-implementation/dist/abstractions/ProjectAbstraction";


export function generate(project_abstraction: ProjectAbstraction, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, 'IconNav.vue'), generateIconNav());
}


function generateIconNav(): string {
    return expandToString`
<script lang="ts" setup>
defineProps<{
  open: boolean
}>()
</script>

<template>
  <div class="">
    <svg
      :class="open ? 'rotate-180' : ''"
      class="w-3 h-3 transition-transform origin-center"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 20 10"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M0,0 L10,10 L20,0"
      />
    </svg>
  </div>
</template>
`
}
