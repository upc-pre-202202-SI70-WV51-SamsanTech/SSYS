<template>
  <div class="suppliersmaindiv">
    <h1>Suppliers</h1>
    <pv-toolbar>
      <template #start>
        <pv-input-text v-model="filters['global'].value" placeholder="Search..."/>
      </template>

      <template #end>
        <pv-button label="Add" icon="pi pi-plus" class="mr-2" @click="addSupplier"/>
        <pv-button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="deleteSelectedSuppliers"
                   :disabled="!selectedSuppliers || !selectedSuppliers.length" />
      </template>
    </pv-toolbar>
    <pv-data-table :value="suppliers"
                   v-model:selection="selectedSuppliers"
                   dataKey="id"
                   :paginator="true"
                   :rows="10"
                   :filters="filters"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                   :rowsPerPageOptions="[5, 10, 25]"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} suppliers"
                   :responsiveLayout="scroll"
    >
      <template #empty>
        No suppliers found
      </template>
      <pv-column selectionMode="multiple" headerStyle="width: 3em" :exportable="false"></pv-column>
      <pv-column field="name" header="Name" :sortable="true"></pv-column>
      <pv-column field="ruc" header="RUC" :sortable="true"></pv-column>
      <pv-column field="products" header="Products" :sortable="true"></pv-column>
      <pv-column field="address" header="Address" :sortable="true"></pv-column>
      <pv-column field="phone" header="Phone" :sortable="true"></pv-column>
      <pv-column field="email" header="E-mail" :sortable="true"></pv-column>
      <pv-column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <pv-button
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded"
              @click="editSupplier(slotProps.data)"
          />
          <pv-button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded"
              @click="deleteSupplier(slotProps.data)"
          />
        </template>
      </pv-column>

    </pv-data-table>
    <pv-dialog
        v-model:visible="supplierDialog"
        :style="{ width: '450px' }"
        header="Supplier Information"
        :modal="true"
        class="p-fluid"
    >
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="name"
              v-model.trim="supplier.name"
              required="true"
              autofocus
              class="{'p-invalid': !supplier.name}"
          />
          <label for="name">Name</label>
          <small class="p-error" v-if="!supplier.name"
          >Name is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="ruc"
              v-model.trim="supplier.ruc"
              required="true"
              autofocus
              class="{'p-invalid': !supplier.ruc}"
          />
          <label for="title">RUC</label>
          <small class="p-error" v-if="!supplier.ruc"
          >RUC number is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="products"
              v-model.trim="supplier.products"
              required="true"
              autofocus
              class="{'p-invalid': !supplier.products}"
          />
          <label for="products">Products</label>
          <small class="p-error" v-if="!supplier.products"
          >Products are required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="address"
              v-model.trim="supplier.address"
              required="true"
              autofocus
              class="{'p-invalid': !supplier.address}"
          />
          <label for="products">Address</label>
          <small class="p-error" v-if="!supplier.address"
          >Address is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="phone"
              v-model.trim="supplier.phone"
              required="true"
              autofocus
              class="{'p-invalid': !supplier.phone}"
          />
          <label for="phone">Phone</label>
          <small class="p-error" v-if="!supplier.phone"
          >Phone is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="email"
              v-model.trim="supplier.email"
              required="true"
              autofocus
              class="{'p-invalid': !supplier.email}"
          />
          <label for="email">Email</label>
          <small class="p-error" v-if="!supplier.email"
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
            @click="saveSupplier"
        />
      </template>
    </pv-dialog>

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
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS}
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
          this.suppliersService.update(this.supplier.id,this.supplier)
              .then((response) => {
                console.log("Supplier updated successfully!");
                let newData = [];
                this.suppliers.forEach((t) => {
                  if (t.id === response.data.id) {
                    newData.push(response.data);
                  } else {
                    newData.push(t);
                  }
                });
                this.suppliers = newData;
              })
              .catch((err) => {
                console.log("Something went wrong while updating supplier.");
              });
        } else {
          this.suppliersService = new SuppliersApiService();
          this.suppliersService
              .create(this.supplier)
              .then((res) => {
                console.log("New supplier added successful.");
                this.suppliers.push(res.data);
              })
              .catch((err) => {
                console.log("Something went wrong while added new supplier.");
              });
        }
        this.supplierDialog = false;
        this.supplier = {};
      }
    },
    editSupplier(supplier) {
      console.log(supplier);
      this.supplier = { ...supplier };
      console.log(this.supplier);
      this.supplierDialog = true;
    },
    deleteSupplier(supplier) {
      this.suppliersService.delete(supplier.id)
          .then((response) =>{
            this.suppliers = this.suppliers.filter((t) => t.id !== this.supplier.id);
            console.log(response);
          }).catch((err) => {
            console.log(
                "Something went wrong"
            );
      });
    },
    exportToCSV() {
      this.$refs.dt.exportToCSV();
    },
    deleteSelectedSuppliers() {
      this.selectedSuppliers.forEach((supplier) => {
        this.suppliersService.delete(supplier.id)
            .then((response) => {
              this.suppliers = this.suppliers.filter((t) => t.id !== this.supplier.id);
              console.log(response);
            }).catch((err) => {
              console.log(
                  "Something went wrong deleting supplier with id ${supplier.id}"
              );
        });

      });
    },
    confirmDeleteSelected() {
      this.deleteSuppliersDialog = true;
    },
    addSupplier() {
      this.supplier = {};
      this.supplierDialog = true;
    },
    hideDialog() {
      this.supplierDialog = false;
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
.suppliersmaindiv {
  border-radius: 30px;
}

</style>