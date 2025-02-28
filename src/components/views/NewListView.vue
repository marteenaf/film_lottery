<template>
  <OverlayLayout ref="overlay" title="New List" :subtitle="'created by ' + userStore.getUser">
    <MainLayout>
      <template #content>
        <v-col>
          <component :is="steps[currentStep].component" v-model:formValue="form[steps[currentStep].value]"
            :users="form.users" :name="form.name"></component>
        </v-col>
      </template>
      <template #fab>
        <div class="d-flex flex-column align-center" style="width:100%;gap:16px;">
          <div class="anchors">
            <v-icon v-for="(step, i) in steps" :key="step.value" color="primary" @click="toStep(i)">{{
              i == currentStep ? 'circle' : 'radio_button_unchecked' }}</v-icon>
          </div>
          <div class="d-flex">
            <v-btn variant="plain" class="text-decoration-underline" color="primary"
              @click="closeOverlay">Cancel</v-btn>
            <v-btn color="primary" @click="currentStep < steps.length - 1 ? nextStep() : createNewList()">
              {{ currentStep < steps.length - 1 ? "Next" : "Create" }} </v-btn>
          </div>
        </div>
      </template>
    </MainLayout>
  </OverlayLayout>
</template>
<script lang="ts">
// import ListMetadataDisplayer from "../custom/ListMetadataDisplayer.vue";
import OverlayLayout from "@/components/layouts/OverlayLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";
import ListCollaborators from "../custom/CreateList/ListCollaborators.vue";
import ListLength from "../custom/CreateList/ListLength.vue";
import ListName from "../custom/CreateList/ListName.vue";
import { useListStore } from "@/stores/listsStore";
import { useUserStore } from "@/stores/usersStore";
import { markRaw } from "vue";

export default {
  name: "NewListView",
  components: {
    MainLayout,
    OverlayLayout,
    // ListMetadataDisplayer
  },
  props: ["id"],
  data() {
    return {
      userStore: useUserStore(),
      listStore: useListStore(),
      steps: [
        {
          value: "name",
          title: "Name",
          component: markRaw(ListName),

        },
        {
          value: "users",
          title: "Collaborators",
          component: markRaw(ListCollaborators),
        },
        {
          value: "length",
          title: "Length",
          component: markRaw(ListLength)
        }
      ],
      currentStep: 0,
      form: {
        name: "hey",
        length: 1,
        users: []
      }
    };
  },
  async mounted() {
    console.debug("[New List View] Mounting...");
    this.$refs.overlay.open();
    if (this.$route.params.id) {
      this.editMode = true;
      await this.getListFromUrl();
      this.fillForm();
    }
    if (this.$route.query) {
      this.currentStep = this.steps.indexOf(this.steps.find(st => st.value == this.$route.query.step)) || 0;
    }
  },
  methods: {
    async createNewList() {
      const maxLength = this.form.length * ((this.form.users?.length || 0) + 1);
      console.debug("Max length", maxLength, this.form.users);
      await this.listStore.postNewList(this.form.name, maxLength, this.form.users, this.userStore.getUser);
      this.$router.push({ name: "ListView", params: { id: this.listStore.selectedList.uuid } });
    },
    nextStep() {
      this.currentStep += this.currentStep < this.steps.length - 1 ? 1 : 0;
      this.$router.push({ name: "NewListView", query: { step: this.steps[this.currentStep]?.value || "name" } });
    },
    toStep(index) {
      this.currentStep = index;
      this.$router.push({ name: "NewListView", query: { step: this.steps[this.currentStep]?.value || "name" } });

    },
    closeOverlay(){
      this.$refs.overlay.close();
    }
  },

};
</script>
<style>
.custom-dialog>.v-overlay__content {
  justify-content: center !important;

}
</style>