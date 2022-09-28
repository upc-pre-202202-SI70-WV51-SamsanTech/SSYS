<template>
  <div>
    <div class="card">
      <pv-toolbar class="mb-4">
        <template #start>
          <!-- Toolbar Section -->
          <pv-button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNew"
          />
          <pv-button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedTutorials || !selectedTutorials.length"
          />
        </template>
        <template #end>
          <pv-button
            label="Export"
            icon="pi pi-download"
            class="p-button-help"
            @click="exportToCSV"
          />
        </template>
      </pv-toolbar>
      <!-- Data Table -->
      <pv-data-table
        ref="dt"
        :value="tutorials"
        v-model:selection="selectedTutorials"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tutorials"
        responsiveLayout="scroll"
      >
        <template #header>
          <div
            class="table-header flex flex-column md:flex-row md:justify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Manage Tutorials</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <pv-input-text
                v-model="filters['global'].value"
                placeholder="Search..."
            /></span>
          </div>
        </template>

        <pv-column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></pv-column>
        <pv-column
          field="name"
          header="Name"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column
          field="lastName"
          header="Last Name"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column
          field="dni"
          header="DNI"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column
          field="phone"
          header="Phone"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column
          field="email"
          header="email"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded"
              @click="editTutorial(slotProps.data)"
            />
            <pv-button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded"
              @click="confirmDeleteTutorial(slotProps.data)"
            />
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <!-- New/Edit Dialog -->
    <pv-dialog
      v-model:visible="tutorialDialog"
      :style="{ width: '450px' }"
      header="Tutorial Information"
      :modal="true"
      class="p-fluid"
    >
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
            type="text"
            id="name"
            v-model.trim="tutorial.name"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !tutorial.name}"
          />
          <label for="name">Name</label>
          <small class="p-error" v-if="submitted && !tutorial.name"
            >Name is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
            type="lastName"
            id="lastName"
            v-model.trim="tutorial.lastName"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !tutorial.lastName}"
          />
          <label for="title">Last Name</label>
          <small class="p-error" v-if="submitted && !tutorial.lastName"
            >Last Name is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
            type="text"
            id="dni"
            v-model.trim="tutorial.dni"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !tutorial.dni}"
          />
          <label for="dni">DNI</label>
          <small class="p-error" v-if="submitted && !tutorial.dni"
            >DNI is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
            type="text"
            id="phone"
            v-model.trim="tutorial.phone"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !tutorial.phone}"
          />
          <label for="phone">Phone</label>
          <small class="p-error" v-if="submitted && !tutorial.phone"
            >Phone is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
            type="text"
            id="email"
            v-model.trim="tutorial.email"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !tutorial.email}"
          />
          <label for="email">Email</label>
          <small class="p-error" v-if="submitted && !tutorial.email"
            >Email is required</small
          >
        </span>
      </div>
      <template #footer>
        <pv-button
          :label="'Cancel'.toUpperCase()"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <pv-button
          :label="'Save'.toUpperCase()"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveTutorial"
        />
      </template>
    </pv-dialog>
    <!-- Delete confirmation dialog -->
    <pv-dialog
      v-model:visible="deleteTutorialDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="tutorial">
          Area you sure you want to delete <b>{{ tutorial.title }}</b
          >?
        </span>
      </div>
      <template #footer>
        <pv-button
          :label="'No'.toUpperCase()"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteTutorialDialog = false"
        />
        <pv-button
          :label="'Yes'.toUpperCase()"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteTutorial"
        />
      </template>
    </pv-dialog>

    <!-- Delete Selected Tutorials Confirmation Dialog -->
    <pv-dialog
      v-model:visible="deleteTutorialsDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="tutorial">
          Are you sure you want to delete the selected tutorials?
        </span>
      </div>
      <template #footer>
        <pv-button
          :label="'No'.toUpperCase()"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteTutorialsDialog = false"
        />
        <pv-button
          :label="'Yes'.toUpperCase()"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedTutorials"
        />
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import { TutorialsApiService } from "@/services/workers-api.service";

export default {
  name: "tutorial-list.component",
  data() {
    return {
      tutorials: [],
      tutorialDialog: false,
      deleteTutorialDialog: false,
      deleteTutorialsDialog: false,
      tutorial: {},
      selectedTutorials: null,
      filters: {},
      submitted: false,
      statuses: [
        { label: "Published", value: "published" },
        { label: "Unpublished", value: "unpublished" },
      ],
      tutorialsService: null,
    };
  },
  created() {
    this.tutorialsService = new TutorialsApiService();
    this.tutorialsService.getAll().then((response) => {
      this.tutorials = response.data;
      console.log(this.tutorials);
      console.log(this.tutorials);
    });
    this.initFilters();
  },

  methods: {
    getStorableTutorial(displayableTutorial) {
      return {
        id: displayableTutorial.id,
      };
    },

    openNew() {
      this.tutorial = {};
      this.submitted = false;
      this.tutorialDialog = true;
    },

    hideDialog() {
      this.tutorialDialog = false;
      this.submitted = false;
    },

    findIndexById(id) {
      console.log(`current id: ${id}`);
      return this.tutorials.findIndex((tutorial) => tutorial.id === id);
    },

    saveTutorial() {
      this.submitted = true;
      if (this.tutorial.name.trim()) {
        if (this.tutorial.id) {
          console.log(this.tutorial);
          this.tutorial = this.getStorableTutorial(this.tutorial);
          this.tutorialsService
            .update(this.tutorial.id, this.tutorial)
            .then((response) => {
              console.log(response.data.id);
              this.tutorials[this.findIndexById(response.data.id)] =
                this.getDisplayableTutorial(response.data);
              this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Tutorial Updated",
                life: 3000,
              });
              console.log(response);
            });
        } else {
          this.tutorial.id = 0;
          console.log(this.tutorial);
          this.tutorial = this.getStorableTutorial(this.tutorial);
          this.tutorialsService.create(this.tutorial).then((response) => {
            this.tutorials.push(this.tutorial);
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Tutorial Created",
              life: 3000,
            });
            console.log(response);
          });
        }
        this.tutorialDialog = false;
        this.tutorial = {};
      }
    },

    editTutorial(tutorial) {
      console.log(tutorial);
      this.tutorial = { ...tutorial };
      console.log(this.tutorial);
      this.tutorialDialog = true;
    },

    confirmDeleteTutorial(tutorial) {
      this.tutorial = tutorial;
      this.deleteTutorialDialog = true;
    },

    deleteTutorial() {
      this.tutorialsService.delete(this.tutorial.id).then((response) => {
        this.tutorials.filter((t) => t.id !== this.tutorial.id);
        this.deleteTutorialDialog = false;
        this.tutorial = {};
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Tutorial Deleted",
          life: 3000,
        });
        console.log(response);
      });
    },

    exportToCSV() {
      this.$refs.dt.exportToCSV();
    },

    confirmDeleteSelected() {
      this.deleteTutorialsDialog = true;
    },

    deleteSelectedTutorials() {
      this.selectedTutorials.forEach((tutorial) => {
        this.tutorialsService.delete(tutorial.id).then((response) => {
          this.tutorials = this.tutorials.filter(
            (t) => t.id !== this.tutorial.id
          );
          console.log(response);
        });
      });
      this.deleteTutorialsDialog = false;
    },

    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
};
</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
