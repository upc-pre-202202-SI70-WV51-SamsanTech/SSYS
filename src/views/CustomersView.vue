<template>
  <div>
    <h1>Customers</h1>

    <!-- TOOL BAR -->

    <pv-toolbar>
      <template #start>
        <!-- Toolbar Section -->
        <pv-button label="New" icon=" pi pi-plus" class="p-button-success mr-2" @click="openNew"/>
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

    </pv-data-table>

  </div>

</template>

<script>
import {CustomersApiService} from "../services/customers-api.service";

export default {
  name: "CustomersView.vue",
  data(){
    return {
      customers: [],
      customer: {},
      customersService: null,
      customerDialog: false,
      deleteCustomerDialog: false,
    };
  },
  created() {
    this.customersService = new CustomersApiService();
    this.customersService.getAll().then((response) => {
      this.customers = response.data;
      console.log(this.suppliers);
    })
  },
  methods:{
    saveCustomer() {
      if (this.customer.name.trim()){
        if (this.customer.id){
          console.log(this.customer);
        }
      }
    },
    deleteCustomer() {
      this.customersService.delete(this.customer.id)
          .then((response) =>{
            this.customer.filter((t) => t.id !== this.customer.id);
            this.deleteCustomerDialog = false;
            this.customer = {};
          })
    },

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

</style>