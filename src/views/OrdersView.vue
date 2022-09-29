<template>
  <div id="orders-main">
    <h1 id="title-orders">Orders</h1>
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
              @click="deleteSelectedTutorials"
              :disabled="!selectedOrders || !selectedOrders.length"
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
          :value="orders"
          v-model:selection="selectedOrders"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} workers"
          responsiveLayout="scroll"
      >
        <template #header>
          <div
              class="table-header flex flex-column md:flex-row md:justify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Purchases List</h5>
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
            field="category"
            header="Category"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>
        <pv-column
            field="state"
            header="State"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>
        <pv-column
            field="details"
            header="Details"
            :sortable="true"
            style="min-width: 16rem"
        ></pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button
                icon="pi pi-pencil"
                class="p-button-text p-button-rounded"
                @click="editOrder(slotProps.data)"
            />
            <pv-button
                icon="pi pi-trash"
                class="p-button-text p-button-rounded"
                @click="deleteOrder(slotProps.data)"
            />
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <!-- New/Edit Dialog -->
    <pv-dialog
        v-model:visible="orderDialog"
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
              v-model.trim="order.name"
              required="true"
              autofocus
              class="{'p-invalid': submitted && !order.name}"
          />
          <label for="name">Name</label>
          <small class="p-error" v-if="submitted && !order.name"
          >Name is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
              type="lastName"
              id="lastName"
              v-model.trim="order.category"
              required="true"
              autofocus
              class="{'p-invalid': submitted && !worker.lastName}"
          />
          <label for="title">Product Category</label>
          <small class="p-error" v-if="submitted && !order.category"
          >Category is required</small>
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="dni"
              v-model.trim="order.state"
              required="true"
              autofocus
              class="{'p-invalid': submitted && !worker.dni}"
          />
          <label for="dni">State</label>
          <small class="p-error" v-if="submitted && !order.state"
          >State is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="phone"
              v-model.trim="order.details"
              required="true"
              autofocus
              class="{'p-invalid': submitted && !worker.phone}"
          />
          <label for="phone">Details</label>
          <small class="p-error" v-if="submitted && !order.details"
          >Details is required</small
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
            @click="saveOrder"
        />
      </template>
    </pv-dialog>

    <!-- Delete Selected Tutorials Confirmation Dialog -->
    <pv-dialog
        v-model:visible="deleteOrderDialog"
        :style="{ width: '450px' }"
        header="Confirm"
        :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="order">
          Are you sure you want to delete the selected workers?
        </span>
      </div>
      <template #footer>
        <pv-button
            :label="'No'.toUpperCase()"
            icon="pi pi-times"
            class="p-button-text"
            @click="deleteOrderDialog = false"
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
import { OrdersApiService } from "../services/orders-api.service";

export default {
  name: "order-list.component",
  data() {
    return {
      orders: [],
      orderDialog: false,
      deleteOrderDialog: false,
      order: {},
      selectedOrders: null,
      filters: {},
      submitted: false,
      statuses: [
        { label: "Published", value: "published" },
        { label: "Unpublished", value: "unpublished" },
      ],
      ordersService: null,
    };
  },
  created() {
    this.ordersService = new OrdersApiService();
    this.ordersService
        .getAll()
        .then((res) => {
          console.log("Getting all workers successful");
          this.orders = res.data;
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
      this.order = {};
      this.submitted = false;
      this.orderDialog = true;
    },

    hideDialog() {
      this.orderDialog = false;
      this.submitted = false;
    },

    findIndexById(id) {
      console.log(`current id: ${id}`);
      return this.orders.findIndex((worker) => worker.id === id);
    },

    saveOrder() {
      this.submitted = true;
      if (this.order.name.trim()) {
        if (this.order.id) {
          this.ordersService
              .update(this.order.id, this.order)
              .then((res) => {
                console.log("order updated successful.");
                let newData = [];
                this.orders.forEach((element) => {
                  if (element.id === res.data.id) {
                    newData.push(res.data);
                  } else {
                    newData.push(element);
                  }
                });
                this.orders = newData;
              })
              .catch((err) => {
                console.log("Something went while updating order.");
              });
        } else {
          this.ordersService = new OrdersApiService();
          this.ordersService
              .create(this.order)
              .then((res) => {
                console.log("New wordek added successful.");
                this.orders.push(res.data);
              })
              .catch((err) => {
                console.log("Something whent while added new order.");
              });
        }
        this.orderDialog = false;
        this.order = {};
      }
    },

    editOrder(orders) {
      console.log(orders);
      this.order = { ...orders };
      console.log(this.order);
      this.orderDialog = true;
    },

    deleteOrder(worker) {
      this.ordersService = new OrdersApiService();
      this.ordersService
          .delete(worker.id)
          .then(() => {
            console.log("Deleted orders successfull.");
            let newData = this.orders.filter(
                (element) => element.id !== worker.id
            );
            this.orders = newData;
          })
          .catch((err) => {
            console.log("Something went while deleting order.");
          });
    },

    exportToCSV() {
      this.$refs.dt.exportToCSV();
    },

    deleteSelectedTutorials() {
      console.log(this.selectedOrders);
      this.selectedOrders.forEach((orders) => {
        this.ordersService
            .delete(orders.id)
            .then((res) => {
              this.orders = this.orders.filter(
                  (element) => element.id !== orders.id
              );
              console.log(`Worker with id ${orders.id} deleted.`);
            })
            .catch((err) => {
              console.log(
                  `Something went while deleting worker with id ${orders.id}.`
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

#orders-main {
  margin: 0;
  height: 100vh;
}
#title-orders {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}
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