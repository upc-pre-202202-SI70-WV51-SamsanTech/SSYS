<template>
  <div class="h-screen">
    <div class="pb-4">
      <h1 class="text-6xl font-semibold text-white">Employees</h1>
    </div>

    <div class="flex flex-column row-gap-4">
      <div
        class="flex flex-column md:flex-row md:px-4 md:justify-content-between row-gap-2"
      >
        <span class="p-input-icon-left w-full">
          <pv-input-text
            v-model="filters['global'].value"
            placeholder="Search..."
            class="w-full md:w-fit"
        /></span>
        <div class="flex justify-content-between">
          <pv-button
            label="add new worker"
            icon="pi pi-plus"
            class="p-button-sm mr-4 w-12rem h-3rem"
            @click="openNew"
          />
          <pv-button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger p-button-sm"
            @click="deleteSelectedTutorials"
            :disabled="!selectedWorkers || !selectedWorkers.length"
          />
        </div>
      </div>

      <pv-data-table
        ref="dt"
        :value="workers"
        v-model:selection="selectedWorkers"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink Page Links NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} workers"
        responsiveLayout="scroll"
      >
        <template #empty> No workers found.</template>
        <template #loading> Loading workers data. Please wait.</template>
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
          field="phone"
          header="Phone"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded"
              @click="editWorker(slotProps.data)"
            />
            <pv-button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded"
              @click="deleteWorker(slotProps.data)"
            />
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <!-- New/Edit Dialog -->
    <pv-dialog
      v-model:visible="workerDialog"
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
            v-model.trim="worker.name"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !worker.name}"
          />
          <label for="name">Name</label>
          <small class="p-error" v-if="submitted && !worker.name"
            >Name is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
            type="lastName"
            id="lastName"
            v-model.trim="worker.lastName"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !worker.lastName}"
          />
          <label for="title">Last Name</label>
          <small class="p-error" v-if="submitted && !worker.lastName"
            >Last Name is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
            type="text"
            id="phone"
            v-model.trim="worker.phone"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !worker.phone}"
          />
          <label for="phone">Phone</label>
          <small class="p-error" v-if="submitted && !worker.phone"
            >Phone is required</small
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
          @click="saveWorker"
        />
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import { WorkersApiService } from "@/hcm/services/workers-api.service";

export default {
  name: "worker-list.component",
  data() {
    return {
      workers: [],
      workerDialog: false,
      deleteWorkerDialog: false,
      worker: {},
      selectedWorkers: null,
      filters: {},
      submitted: false,
      statuses: [
        { label: "Published", value: "published" },
        { label: "Unpublished", value: "unpublished" },
      ],
      workersService: null,
    };
  },
  created() {
    // Sign in redirect
    this.userData = JSON.parse(localStorage.getItem("userData"));
    if (!this.userData) this.$router.push({ name: "signIn" });

    this.workersService = new WorkersApiService();
    this.workersService
      .getAll()
      .then((res) => {
        console.log("Getting all workers successful");
        this.workers = res.data;
      })
      .catch((err) => {
        console.log("Something went while get workers: " + err);
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
      this.worker = {};
      this.submitted = false;
      this.workerDialog = true;
    },

    hideDialog() {
      this.workerDialog = false;
      this.submitted = false;
    },

    findIndexById(id) {
      console.log(`current id: ${id}`);
      return this.workers.findIndex((worker) => worker.id === id);
    },

    saveWorker() {
      this.submitted = true;
      console.log("WORKER: ", this.worker.name);
      let worker = {
        name: this.worker.name,
        lastName: this.worker.lastName,
        phone: this.worker.phone,
      };
      if (this.worker.name.trim()) {
        if (this.worker.id) {
          this.workersService
            .update(this.worker.id, this.worker)
            .then((res) => {
              console.log("worker updated successful.");
              let newData = [];
              this.workers.forEach((element) => {
                if (element.id === res.data.id) {
                  newData.push(res.data);
                } else {
                  newData.push(element);
                }
              });
              this.workers = newData;
            })
            .catch((err) => {
              console.log("Something went while updating worker.");
            });
        } else {
          this.workersService = new WorkersApiService();
          console.log("WORKER: ", worker);
          this.workersService
            .create(worker)
            .then((res) => {
              console.log("New wordek added successful.");
              this.workers.push(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        this.workerDialog = false;
        this.worker = {};
      }
    },

    editWorker(worker) {
      console.log(worker);
      this.worker = { ...worker };
      console.log(this.worker);
      this.workerDialog = true;
    },

    deleteWorker(worker) {
      this.workersService = new WorkersApiService();
      this.workersService
        .delete(worker.id)
        .then(() => {
          console.log("Deleted worker successfull.");
          let newData = this.workers.filter(
            (element) => element.id !== worker.id
          );
          this.workers = newData;
        })
        .catch((err) => {
          console.log("Something went while deleting worker.");
        });
    },

    deleteSelectedTutorials() {
      console.log(this.selectedWorkers);
      this.selectedWorkers.forEach((worker) => {
        this.workersService
          .delete(worker.id)
          .then((res) => {
            this.workers = this.workers.filter(
              (element) => element.id !== worker.id
            );
            console.log(`Worker with id ${worker.id} deleted.`);
          })
          .catch((err) => {
            console.log(
              `Something went while deleting worker with id ${worker.id}.`
            );
          });
      });
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
.title {
  font-style: normal;
  font-weight: 700;
  font-size: 55px;
  line-height: 117.4%;
  color: #ffff;
}

.toolbar {
  background: none;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
