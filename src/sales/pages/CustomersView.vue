<template>
  <div>
    <h1>Customers</h1>

    <!-- TOOL BAR -->

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
              label="add new customer"
              icon="pi pi-plus"
              class="p-button-sm mr-4"
              @click="openNew"
          />
        </div>
      </template>
    </pv-toolbar>

    <!-- DATA TABLE -->

    <pv-data-table :value="customers"
                   :paginator="true" :rows="5"
                   paginatorTemplate="FirstPageLink PrevPageLink Page Links NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                   :rowsPerPageOptions="[5,10,25]"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} customers"
                   :responsiveLayout="scroll"
    >
      <template #empty>
        No customers found
      </template>
      <pv-column field="name" header="Name" :sortable="true"></pv-column>
      <pv-column field="lastName" header="Last Name" :sortable="true"></pv-column>
      <pv-column field="dni" header="DNI" :sortable="true"></pv-column>
      <pv-column field="email" header="E-mail" :sortable="true"></pv-column>
      <pv-column field="phone" header="Phone" :sortable="true"></pv-column>
      <pv-column field="address" header="Address" :sortable="true"></pv-column>

      <pv-column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <pv-button
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded"
              @click="editCustomer(slotProps.data)"
          />
          <pv-button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded"
              @click="deleteCustomer(slotProps.data)"
          />
        </template>
      </pv-column>

    </pv-data-table>

    <!-- New/Edit Dialog -->
    <pv-dialog
        v-model:visible="customerDialog"
        :style="{width: '450px'}"
        header="Customer Information"
        :modal="true"
        class="p-fluid">

      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text type="text" id="name"
                         v-model.trim="customer.name"
                         required="true" autofocus
                         class="{'p-invalid': submitted && !customer.name}"/>
          <label for="name">Name</label>
          <small class="p-error" v-if="submitted && !customer.name">Name is required</small>
        </span>
      </div>

      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text type="text" id="lastName"
                         v-model.trim="customer.lastName"
                         required="true" autofocus
                         class="{'p-invalid': submitted && !customer.lastName}"/>
          <label for="lastName">Last Name</label>
          <small class="p-error" v-if="submitted && !customer.lastName">Last Name is required</small>
        </span>
      </div>

      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text type="text" id="dni"
                         v-model.trim="customer.dni"
                         required="true" autofocus
                         class="{'p-invalid': submitted && !customer.dni}"/>
          <label for="dni">DNI</label>
          <small class="p-error" v-if="submitted && !customer.dni">DNI is required</small>
        </span>
      </div>

      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text type="text" id="email"
                         v-model.trim="customer.email"
                         required="true" autofocus
                         class="{'p-invalid': submitted && !customer.email}"/>
          <label for="email">Email</label>
          <small class="p-error" v-if="submitted && !customer.email">Email is required</small>
        </span>
      </div>

      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text type="text" id="phone"
                         v-model.trim="customer.phone"
                         required="true" autofocus
                         class="{'p-invalid': submitted && !customer.phone}"/>
          <label for="phone">Phone</label>
          <small class="p-error" v-if="submitted && !customer.phone">Phone is required</small>
        </span>
      </div>

      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text type="text" id="address"
                         v-model.trim="customer.address"
                         required="true" autofocus
                         class="{'p-invalid': submitted && !customer.address}"/>
          <label for="address">Address</label>
          <small class="p-error" v-if="submitted && !customer.address">Address is required</small>
        </span>
      </div>

      <template #footer>
        <pv-button :label="'Cancel'.toUpperCase()"
                   icon="pi pi-times"
                   class="p-button-text"
                   @click="hideDialog"/>
        <pv-button :label="'Save'.toUpperCase()"
                   icon="pi pi-check"
                   class="p-button-text"
                   @click="saveCustomer"/>
      </template>
    </pv-dialog>

  </div>

</template>

<script>
import {CustomersApiService} from "../services/customers-api.service";
import {FilterMatchMode} from "primevue/api";

export default {
  name: "CustomersView.vue",
  data(){
    return {
      customers: [],
      customer: {},
      customersService: null,
      customerDialog: false,
      deleteCustomerDialog: false,
      submitted: false,
      filters: {},
    };
  },
  created() {
    // Sign in redirect
    this.userData = JSON.parse(localStorage.getItem("userData"))
    if (!this.userData) this.$router.push({ name: "signIn" })

    this.customersService = new CustomersApiService();
    this.customersService
        .getAll()
        .then((res) => {
          console.log("Getting all customers successful");
          this.customers = res.data;
        })
        .catch((err) => {
          console.log("Something went while get customers: " + err);
        });
    this.initFilters();
  },
  methods:{
    saveCustomer() {
      this.submitted = true;
      if (this.customer.name.trim()) {
        if (this.customer.id) {
          this.customersService
              .update(this.customer.id, this.customer)
              .then((res) => {
                console.log("customer updated successful.");
                let newData = [];
                this.customers.forEach((element) => {
                  if (element.id === res.data.id) {
                    newData.push(res.data);
                  } else {
                    newData.push(element);
                  }
                });
                this.customers = newData;
              })
              .catch((err) => {
                console.log("Something went while updating customer.");
              });
        } else {
          this.customersService = new CustomersApiService();
          this.customersService
              .create(this.customer)
              .then((res) => {
                console.log("New customer added successful.");
                this.customers.push(res.data);
              })
              .catch((err) => {
                console.log("Something when while added new customer.");
              });
        }
        this.customerDialog = false;
        this.customer = {};
      }
    },
    openNew() {
      this.customer = {};
      this.submitted = false;
      this.customerDialog = true;
    },
    hideDialog() {
      this.customerDialog = false;
      this.submitted = false;
    },
    editCustomer(customer) {
      console.log(customer);
      this.customer = { ...customer };
      console.log(this.customer);
      this.customerDialog = true;
    },
    deleteCustomer(customer) {
      this.customersService
          .delete(customer.id)
          .then(() => {
            console.log("Deleted customer successfull.");
            let newData = this.customers.filter(
                (element) => element.id !== customer.id
            );
            this.customers = newData;
          })
          .catch((err) => {
            console.log("Something went while deleting customer.");
          });
    },
    initFilters() {
      this.filters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
      };
    }

  }
}
</script>

<style scoped>
h1 {
  color: black;
  font-size: xxx-large;
  font-weight: bold;
  padding: 20px;
}

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