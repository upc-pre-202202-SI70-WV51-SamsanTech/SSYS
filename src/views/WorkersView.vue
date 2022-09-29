<template>
  <div>
    <h1 class="title">WORKERS</h1>
    <div class="card">
      <pv-toolbar class="mb-4 toolbar">
        <template #start>
          <!-- Toolbar Section -->

          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <pv-input-text
              v-model="filters['global'].value"
              placeholder="Search..."
          /></span>
        </template>
        <template #end>
          <div
            class="table-header flex flex-column md:flex-row md:justify-content-between"
          >
            <pv-button
              label="add new worker"
              icon="pi pi-plus"
              class="p-button-sm mr-4"
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
        </template>
      </pv-toolbar>
      <!-- Data Table -->
      <pv-data-table
        ref="dt"
        :value="workers"
        v-model:selection="selectedWorkers"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} workers"
        responsiveLayout="scroll"
      >
        <template #empty> No workers found. </template>
        <template #loading> Loading workers data. Please wait. </template>
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
            id="dni"
            v-model.trim="worker.dni"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !worker.dni}"
          />
          <label for="dni">DNI</label>
          <small class="p-error" v-if="submitted && !worker.dni"
            >DNI is required</small
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
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
            type="text"
            id="email"
            v-model.trim="worker.email"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !worker.email}"
          />
          <label for="email">Email</label>
          <small class="p-error" v-if="submitted && !worker.email"
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
          @click="saveWorker"
        />
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import { WorkersApiService } from "@/services/workers-api.service";

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
          this.workersService
            .create(this.worker)
            .then((res) => {
              console.log("New wordek added successful.");
              this.workers.push(res.data);
            })
            .catch((err) => {
              console.log("Something whent while added new worker.");
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
