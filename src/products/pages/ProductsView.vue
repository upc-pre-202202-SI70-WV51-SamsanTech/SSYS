<template>
  <div class="h-screen">
    <div class="pb-4">
      <h1 class="text-6xl font-semibold text-white">Products</h1>
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
            label="add new product"
            icon="pi pi-plus"
            class="p-button-sm mr-4 w-12rem h-3rem"
            @click="openNew"
          />
          <pv-button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger p-button-sm"
            @click="deleteSelectedProducts"
            :disabled="!selectedProduct || !selectedProduct.length"
          />
        </div>
      </div>

      <pv-data-table
        ref="dt"
        :value="products"
        v-model:selection="selectedProduct"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink Page Links NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        responsiveLayout="scroll"
      >
        <template #empty> No products found.</template>
        <template #loading> Loading products data. Please wait.</template>
        <pv-column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></pv-column>
        <pv-column
          field="title"
          header="Title"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column
          field="amount"
          header="Amount"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column
          field="price"
          header="Price"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded"
              @click="editProduct(slotProps.data)"
            />
            <pv-button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded"
              @click="deleteProduct(slotProps.data)"
            />
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <!-- New/Edit Dialog -->
    <pv-dialog
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      header="Tutorial Information"
      :modal="true"
      class="p-fluid"
    >
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
            type="text"
            id="title"
            v-model.trim="product.title"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !product.title}"
          />
          <label for="title">Title</label>
          <small class="p-error" v-if="submitted && !product.title"
            >Title is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
            type="number"
            id="amount"
            v-model.trim="product.amount"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !product.amount}"
          />
          <label for="title">Amount</label>
          <small class="p-error" v-if="submitted && !product.amount"
            >Amount is required</small
          >
        </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
            type="number"
            id="price"
            v-model.trim="product.price"
            required="true"
            autofocus
            class="{'p-invalid': submitted && !product.price}"
          />
          <label for="price">Price</label>
          <small class="p-error" v-if="submitted && !product.price"
            >Price is required</small
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
import { ProductsApiService } from "../services/products-api.service";

export default {
  data() {
    return {
      products: [],
      productDialog: false,
      deleteProductDialog: false,
      product: {},
      selectedProduct: null,
      filters: {},
      submitted: false,
      statuses: [
        { label: "Published", value: "published" },
        { label: "Unpublished", value: "unpublished" },
      ],
      productsService: null,
    };
  },
  created() {
    // Sign in redirect
    this.userData = JSON.parse(localStorage.getItem("userData"));
    if (!this.userData) this.$router.push({ name: "signIn" });

    this.productsService = new ProductsApiService();
    this.productsService
      .getAll()
      .then((res) => {
        console.log("Getting all products successful");
        this.products = res.data;
      })
      .catch((err) => {
        console.log("Something went while get products: " + err);
      });
    this.initFilters();
  },

  methods: {
    getStorableProduct(displayableTutorial) {
      return {
        id: displayableTutorial.id,
      };
    },

    openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
    },

    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },

    findIndexById(id) {
      console.log(`current id: ${id}`);
      return this.products.findIndex((product) => product.id === id);
    },

    saveWorker() {
      this.submitted = true;
      console.log("WORKER: ", this.product.name);
      let product = {
        title: this.product.title,
        amount: this.product.amount,
        price: this.product.price,
      };
      if (this.product.id) {
        this.productsService
          .update(this.product.id, this.product)
          .then((res) => {
            console.log("product updated successful.");
            let newData = [];
            this.products.forEach((element) => {
              if (element.id === res.data.id) {
                newData.push(res.data);
              } else {
                newData.push(element);
              }
            });
            this.products = newData;
          })
          .catch((err) => {
            console.log("Something went while updating product.");
          });
      } else {
        this.productsService = new ProductsApiService();
        console.log("WORKER: ", product);
        this.productsService
          .create(product)
          .then((res) => {
            console.log("New wordek added successful.");
            this.products.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.productDialog = false;
      this.product = {};
    },

    editProduct(product) {
      console.log(product);
      this.product = { ...product };
      console.log(this.product);
      this.productDialog = true;
    },

    deleteProduct(product) {
      this.productsService = new ProductsApiService();
      this.productsService
        .delete(product.id)
        .then(() => {
          console.log("Deleted product successfull.");
          let newData = this.products.filter(
            (element) => element.id !== product.id
          );
          this.products = newData;
        })
        .catch((err) => {
          console.log("Something went while deleting product.");
        });
    },

    deleteSelectedProducts() {
      console.log(this.selectedProduct);
      this.selectedProduct.forEach((product) => {
        this.productsService
          .delete(product.id)
          .then((res) => {
            this.products = this.products.filter(
              (element) => element.id !== product.id
            );
            console.log(`Product with id ${product.id} deleted.`);
          })
          .catch((err) => {
            console.log(
              `Something went while deleting product with id ${product.id}.`
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

<style>
body {
  width: 100%;
  height: auto;
  background-image: linear-gradient(to top left, #ff914d, #7c3aed);
  color: black;
}
.contenedor_add_product {
  width: 533px;
  height: 600px;
  background-color: #ffff;

  border-radius: 15px;
  text-align: center;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
}
.titulo {
  font-family: "Segoe UI Semibold";
  font-size: 19px;
  margin-bottom: 2rem;
  padding-top: 2rem;
  /* background-color: #FF914D; */
}

.cursor {
  cursor: pointer;
  text-decoration: none;
  font-family: "Segoe UI Semibold";
  color: black;
}

.cursor:hover {
  cursor: pointer;
  text-decoration: none;
}

.contenido {
  box-sizing: border-box;
  left: 0px;
  top: 0px;
  border: 1px solid #000000;
  border-radius: 5px;

  left: 8px;
  top: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.5);
}

.contenido_Description {
  width: 370px;
  height: 67px;
}
.contenido_Amount {
  width: 220px;
  height: 30px;
}
.contenido_Total_Cost {
  width: 220px;
  height: 30px;
}
.contenidos {
  width: 370px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

.botones {
  margin-left: auto;
  margin-right: auto;
}
.boton {
  margin-right: 50px;
  margin-left: 50px;
}
.boton_Accept {
  width: 120px;
  height: 28px;
  /* right: 306px; */
  top: calc(50% - 28px / 2 + 117px);
}
.boton_Cancel {
  width: 120px;
  height: 28px;
  /* right: 93px; */
  top: calc(50% - 28px / 2 + 117px);
}

.sub_text {
  font-family: "Segoe UI Semibold";
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 300;
  margin: 0.5rem;
}

.contenidos_bloque {
  margin-bottom: 1rem;
}

.sub_footer {
  display: grid;
  margin: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
}
a {
  font-family: "Segoe UI Semibold";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 16px;
  text-decoration: none;
  color: #555555;
}

/*add product fin*/

.table {
  background-color: white;
  margin-top: 2rem;
  padding-top: 1rem;
  width: 1200px;
  margin-bottom: 3rem;
}
.colums_5 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  font-family: Arial;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 15px;

  text-align: center;

  color: #000000;
}
.column1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.column1_1 {
  text-align: right;
  margin-right: 1.5rem;
}

.column1_2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/*.column1_2_1{
  margin-right: 0.5rem;
}*/

.column2 {
  display: grid;
  grid-template-columns: 10% 70%;
  /*margin-right: 1rem;
  margin-left: 4rem;*/
}

.column2_2 {
  text-align: left;
}

.sombra {
  color: #767676;
}

.column2_1 {
  margin-right: 0.5rem;
}

.overlay_ {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
}

.sub_title {
  font-family: "Segoe UI Semibold";
  font-size: 19px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;
}

/*+++++++++++++++++++*/
/*
//TARGET*/

.target {
  background-color: white;
  width: 257px;
  height: 300px;
  border-radius: 5px;
  margin: 10px;
  padding: 1rem;
}

.section1 {
  text-align: center;
  font-family: "Segoe UI Semibold";
}

.section1 .titulo {
  font-size: 23px;
  font-family: "Segoe UI Semibold";
  margin-bottom: 1rem;
}

.section2 {
  text-align: left;
  margin: 0.5rem;
  font-family: "Segoe UI Semibold";
}

.section3 {
  text-align: right;
  margin-top: 1.3rem;
  margin-right: 1rem;
  font-family: "Segoe UI Semibold";
}

.section3 img {
  margin-right: 0.4rem;
  margin-left: 0.4rem;
}

.bloques {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
}

.column_2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.btn_new {
  width: 30%;
  height: 3rem;
  font-size: 18px;
  margin-top: auto;
  margin-bottom: auto;
}

.btn_new:hover {
  background-color: #000000;
  color: white;
}

.centrar_r {
  margin-right: auto;
}
.centrar_l {
  margin-left: auto;
}

.add_height {
  height: 50px;
}

.add_height_2 {
  height: 40px;
}

.centrar_v {
  margin-top: auto;
  margin-bottom: auto;
}
.centrar_h {
  margin-left: auto;
  margin-right: auto;
}

.var_width {
  width: 15%;
  margin-bottom: 2rem;
}
</style>
