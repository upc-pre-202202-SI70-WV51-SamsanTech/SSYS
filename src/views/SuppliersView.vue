<template>
  <div>
    <h1>Suppliers</h1>
    <pv-data-table :value="suppliers"
                   :paginator="true"
                   :rows="10"
                   :responsiveLayout="scroll"
    >
      <template #empty>
        No suppliers found
      </template>
      <pv-column field="name" header="Name" :sortable="true"></pv-column>
      <pv-column field="ruc" header="RUC" :sortable="true"></pv-column>
      <pv-column field="products" header="Products" :sortable="true"></pv-column>
      <pv-column field="address" header="Address" :sortable="true"></pv-column>
      <pv-column field="phone" header="Phone" :sortable="true"></pv-column>
      <pv-column field="email" header="E-mail" :sortable="true"></pv-column>

    </pv-data-table>

  </div>

</template>

<script>
import { FilterMatchMode } from "primevue/api";
import { SuppliersApiService } from "@/services/suppliers-api.service";

export default {
  name: "SuppliersView.vue",
  data(){
    return {
      suppliers: [],
      supplier: {},
      filters: {
        'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
      },
      suppliersService: null,
      supplierDialog: false,
      deleteSupplierDialog: false,
      deleteSuppliersDialog: false,
      selectedSuppliers: null

    };
  },
  created() {
    this.suppliersService = new SuppliersApiService();
    this.suppliersService.getAll().then((response) => {
      this.suppliers = response.data;
      console.log(this.suppliers);

    })
  },
  methods:{
    saveSupplier() {
      if (this.supplier.name.trim()){
        if (this.supplier.id){
          console.log(this.supplier);
        }
      }
    },
    deleteSupplier() {
      this.suppliersService.delete(this.supplier.id)
          .then((response) =>{
            this.supplier.filter((t) => t.id !== this.supplier.id);
            this.deleteSupplierDialog = false;
            this.supplier = {};
          })
    },
    exportToCSV() {
      this.$refs.dt.exportToCSV();
    },
    deleteSelectedSuppliers() {
      this.selectedSuppliers.forEach((supplier) => {
        this.suppliersService.delete(supplier.id)
            .then((response) => {
              this.supplier.filter((t) => t.id !== this.supplier.id);
              console.log(response);
            })
      })
    },
    confirmDeleteSelected() {
      this.deleteSuppliersDialog = true;
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

</style>