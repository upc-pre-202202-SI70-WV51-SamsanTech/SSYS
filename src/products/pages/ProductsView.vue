<template>
  <!-- {{array_category[0]}} -->
  <body>
    <transition>
<div v-if="numero_pantalla===0">
  <div class="contenedor_Categories">
    <div class="titulo">
      <h1>Categories</h1>
    </div>
    <button class="cursor btn_new centrar_r var_width" @click="numero_pantalla=1">Add Category</button>
    <div class="bloques">
      <div v-for="(category,c_index) in array_category" v-bind:key="c_index">
        <!--inicio for-->
        <div class="target">

          <div class="section1">
            <div class="titulo">{{category.name}}</div>
          </div>

          <div class="section2">
            <div class="sub_text">Num. products</div>
            <div class="text">Total Amount: {{length_category(category.id)}}</div>
          </div>

          <div class="section2">
            <div class="sub_text">Creacion Date</div>
            <div class="text">{{category.fecha_creacion}}</div>
          </div>

          <div class="section3">
            <button class="cursor" @click="numero_pantalla=2, indice_category=category.id">
              <img src="../../../src/assets/img/item.png" alt="iconoojo" style="width: 21px; height: 21px">
              See all
            </button>

           

            <img class="cursor" @click="deleteCategory(category.id)" src="../../../src/assets/img/erase.jpg">


          </div>

        </div>
      </div>


      <!--fin for          -->
    </div>
  </div>
</div>
<div v-else-if="numero_pantalla===1">
  <div class="contenedor_add_product">
    <div class="titulo">Add Category</div>
    <div class="contenidos">

      <div class="contenidos_bloque">
        <input class="sub_text contenido contenido_Amount" type="text" v-model="name_Category" placeholder="Name">
        <div class="sub_text">
          Enter the name of the new category</div>
      </div>

      <div class="contenidos_bloque">
        <input type="text" class="sub_text contenido contenido_Description" v-model="description_Category"
          placeholder="Description">
        <div class="sub_text">Enter a description of the category</div>
      </div>





    </div>

    <div class="botones">
      <button class="boton boton_Accept" @click="accept_category">Accept</button>
      <button @click="numero_pantalla=0" class="boton boton_Cancel">Cancel</button>
    </div>
    <div class="sub_footer">
      <a href="#">Help</a>
      <a href="#">Privacy</a>
      <a href="#">Condiitions</a>
    </div>
  </div>
</div>
<div v-else-if="numero_pantalla===2">
  <div class="tabla">
    <div class="titulo"> <h1>Category: {{array_category[indice_category-1].name}} {{indice_category}}</h1> </div>
    <!-- buscando -->
    <div class="column_2">
      <button class="cursor btn_new centrar_r" @click="numero_pantalla=0">Return</button>
      <button class="cursor btn_new centrar_l" @click="numero_pantalla=3">Add product</button>
    </div>
    
    <div class="table centrar_h">

      <div class="colums_5">
        <div class="column1">
          <div class="column1_1">
            <img src="../../../src/assets/img/no_Check.jpg" alt="no check" style="width: 21px; height: 21px">
          </div>
          <div class="column1_2 add_height">
            <img class="column1_2_1" src="../../../src/assets/img/item.png" alt="item" style="width: 12px; height: 17px">
            <div class="column1_2_2">Description</div>
          </div>
        </div>

        <div class="column2">
          <img class="column2_1" src="../../../src/assets/img/item.png" alt="item" style="width: 12px; height: 17px">
          <div class="column2_2">Amount</div>
        </div>

        <div class="column2">
          <img src="../../../src/assets/img/item.png" alt="item" style="width: 12px; height: 17px">
          <div class="column2_2">Total Cost</div>
        </div>

        <div class="column2">
          <img src="../../../src/assets/img/item.png" alt="item" style="width: 12px; height: 17px">
          <div class="column2_2">Registration Date</div>
        </div>

        <div>Options</div>

      </div>

      <hr>

      <div v-for="(p, indice) in array_products" v-bind:key="indice">
        <div v-if="p.category==indice_category">

          <div class="colums_5 sombra add_height_2">
            <div class="column1">
              <div class="column1_1 centrar_v">
                <img src="../../../src/assets/img/no_Check.jpg" alt="no check" style="width: 21px; height: 21px">
              </div>
              <div class="column1_2 centrar_v">
                <div class="column1_2_2">{{p.description}}</div>
              </div>

            </div>

            <div class="column2_2 centrar_v">{{p.amount}}</div>

            <div class="column2_2 centrar_v">{{p.price_all}}</div>
            <div class="column2_2 centrar_v">{{p.fecha_creacion}}</div>
            <div class="centrar_v">
              <img @click="delete_product(p.id)" class="column2_1 cursor" src="../../../src/assets/img/erase.jpg" alt="item" style="width: 12px; height: 17px">
              
            </div>

          </div>
          <hr>


        </div>
      </div>
    </div>
  </div>
</div>
<div v-else-if="numero_pantalla===3">
  <div class="contenedor_add_product">
    <div class="titulo">Add Product in {{array_category[indice_category-1].name}} {{indice_category}}</div>
    <div class="contenidos">

      <div class="contenidos_bloque">
        <input class="sub_text contenido contenido_Description" v-model="description" placeholder="Description">
        <div class="sub_text">Enter the product name, type and brand</div>
      </div>

      <div class="contenidos_bloque">
        <input class="sub_text contenido contenido_Amount" type="number" v-model="amount" placeholder="Amount">
        <div class="sub_text">Enter the quantity with its respective unit if necessary, for example KG</div>
      </div>

      <div class="contenidos_bloque">
        <input class="sub_text contenido contenido_Total_Cost" type="number" v-model="price_all"
          placeholder="Total cost">
        <div class="sub_text">Enter the total cost of adding all the units or quantity</div>
      </div>

    </div>

    <div class="botones">
      <button class="boton boton_Accept" @click="accetp_product">Accept product</button>
      <button @click="numero_pantalla=2" class="boton boton_Cancel">Cancel</button>
    </div>
    <div class="sub_footer">
      <a href="#">Help</a>
      <a href="#">Privacy</a>
      <a href="#">Condiitions</a>
    </div>
  </div>
</div>
    </transition>
  </body>
</template>


<script>
import {ProductsApiService} from "../services/products-api.service";
import { ref } from "vue";
import {CategoriesApiService} from "../services/categories-api.service";
export default {
  setup(){
    let numero_Target_=1111;
    let name_Target_="nuevo";
    let cantidad_Productos=50;
    let creacion_Date="2/2/2010";

    const cancel_category=()=>{
      this.numero_pantalla=0;
    }

    const erase=()=>{

    }

    const add_Category=()=>{

    }
    let showModal=ref(false);
    let numero=100;

    const cancel=()=>{
      this.numero_pantalla=2;
    }
    
    return{
      numero,
      showModal,
      cancel,
      numero_Target_,
      name_Target_,
      cantidad_Productos,
      creacion_Date,
      cancel_category,
      erase,
      add_Category,
      
    };
  },
  created(){
    this.categoriesService = new CategoriesApiService();
    this.categoriesService.getAll().then((res)=>{
      console.log("Obteniendo las categorias");
      this.array_category=res.data;
    }).catch((err)=>{
      console.log("Something went while get workers: " + err);
    });

    this.productsService = new ProductsApiService();
    this.productsService.getAll().then((res)=>{
      console.log("obteniendo los productos");
      this.array_products=res.data;
    }).catch((err)=>{
      console.log("ppppppppppppp" +err);
    });
  },
  data(){
    return{
      //arreglo
      array_category:[],
      array_products:[],
      //variable que recibe de input
      name_Category:ref(""),
      description_Category:ref(""),
      date_Category:ref("13/12/2022"),
      description:ref(""),
      amount:ref(0),
      price_all:ref(0),
      //variables
      indice_category:ref(0),
      numero_pantalla:ref(0),
      amount_products_category:ref(0),
      //objeto
      nueva_categoria:{},
      nuevo_producto:{},
      //servicios
      categoriesService:null,
      productsService:null
    }
  },
  methods:{
    accept_category(){
      console.log(this.name_Category +" "+ this.description_Category);
      if (!(this.name_Category==="" || this.description_Category===""))
      {
        this.nueva_categoria={
          "id":this.array_category.length+1,
          "name":this.name_Category,
          "description":this.description_Category,
          "fecha_creacion": new Date()
        }
        
        this.categoriesService = new CategoriesApiService();
        this.categoriesService.create(this.nueva_categoria).then((res)=>{
          console.log("nueva asignatura agregada correctamente");
          this.array_category.push(res.data);
        }).catch((err)=>{
          console.log("aaaaaaa")
        });

        this.numero_pantalla=0;
        this.name_Category="";
        this.description_Category="";
      };
    },
    accetp_product() {
      if (!(this.description === "" || this.amount === 0 || this.price_all === 0))
      {
        
        this.nuevo_producto={
          "id":this.array_products.length+1,
          "description":this.description,
          "amount":this.amount,
          "price_all":this.price_all,
          "category":this.indice_category,
          "fecha_creacion": new Date()
        }

        this.productsService=new ProductsApiService();
        this.productsService.create(this.nuevo_producto).then((res)=>{
          console.log("nuevo producto agregado correctamente");
          this.array_products.push(res.data);
        }).catch((err)=>{
          console.log("ppppp");
        });

        
        this.description="",
        this.amount=0,
        this.price_all=0,
        this.numero_pantalla = 2;
      };
      

    },
    length_category(indice){
      this.amount_products_category=0;
     for(let i=0; i<this.array_products.length;i++) {
      if(indice==this.array_products[i].category){
        this.amount_products_category++;        
      }
     }
    //  console.log(this.amount_products_category);
     return this.amount_products_category;
    },
    pos_category(indice){
      for (let i = 0; i < this.array_products.length; i++) {
        if (indice == this.array_products[i].category) {
          return this.array_products[i].id;
        }
      }
    },
    deleteCategory(id){
     
      while(id!=this.array_category.length){
        
        this.categoriesService = new CategoriesApiService();
        this.categoriesService.update(id,this.array_category[id])
        .then((response)=>{
          console.log("actualizado ");
          let newData=[];
          this.array_category.forEach((t) => {
                  if (t.id === response.data.id) {
                    newData.push(response.data);
                  } else {
                    newData.push(t);
                  }
                });
                this.array_category = newData;
              })
              .catch((err) => {
                console.log("Something went wrong while updating products.");
              });
          id++;
        };
      this.categoriesService = new CategoriesApiService();
      this.categoriesService
          .delete(id)
          .then(() => {
            console.log("Categoria borrado correctamente");
            let newData = this.array_category.filter(
                (element) => element.id !== id
            );
            this.array_category = newData;
          })
          .catch((err) => {
            console.log("bbbbbbbbccccccccc");
          });
      
    },
    delete_product(id){
      

      while(id!=this.array_products.length){
        
        this.productsService = new ProductsApiService();
        this.productsService.update(id,this.array_products[id])
        .then((response)=>{
          console.log("actualizado ");
          let newData=[];
          this.array_products.forEach((t) => {
                  if (t.id === response.data.id) {
                    newData.push(response.data);
                  } else {
                    newData.push(t);
                  }
                });
                this.array_products = newData;
              })
              .catch((err) => {
                console.log("Something went wrong while updating products.");
              });
          id++;
        };
      this.productsService = new ProductsApiService();
      this.productsService
          .delete(id)
          .then(() => {
            console.log("Producto borrado correctamente");
            let newData = this.array_products.filter(
                (element) => element.id !== id
            );
            this.array_products = newData;
          })
          .catch((err) => {
            console.log("bbbbbbbbccccccccc");
          });
    }
  }
}
</script>

<style>
  body{
  width: 100%;
  height:auto;
  background-image: linear-gradient(to top left,#FF914D, #7C3AED
  );
    color: black;
}
.contenedor_add_product{
  width: 533px;
  height: 600px;
  background-color: #ffff;

  border-radius: 15px;
  text-align: center;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
}
.titulo{
  font-family: "Segoe UI Semibold";
  font-size: 19px;
  margin-bottom: 2rem;
  padding-top: 2rem;
  /* background-color: #FF914D; */
}

.cursor{
  cursor: pointer;
  text-decoration: none;
  font-family: "Segoe UI Semibold";
  color: black;
}

.cursor:hover{
  cursor: pointer;
  text-decoration: none;
}



.contenido{
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

.contenido_Description{
  width: 370px;
  height: 67px;
}
.contenido_Amount{
  width: 220px;
  height: 30px;
}
.contenido_Total_Cost{
  width: 220px;
  height: 30px;
}
.contenidos{
  width: 370px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;


}

.botones{
  margin-left: auto;
  margin-right: auto;
}
.boton{
  margin-right: 50px;
  margin-left: 50px;
}
.boton_Accept{
  width: 120px;
  height: 28px;
  /* right: 306px; */
  top: calc(50% - 28px/2 + 117px);
  
}
.boton_Cancel{
  width: 120px;
  height: 28px;
  /* right: 93px; */
  top: calc(50% - 28px/2 + 117px);
}

.sub_text{
  font-family: "Segoe UI Semibold";
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 300;
  margin: 0.5rem;
}

.contenidos_bloque{
  margin-bottom: 1rem;
}

.sub_footer{
  display: grid;
  margin: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
}
a{
  font-family: "Segoe UI Semibold";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 16px;
  text-decoration: none;
  color: #555555;
}

/*add product fin*/

.table{
  background-color: white;
  margin-top: 2rem;
  padding-top: 1rem;
  width: 1200px;
  margin-bottom: 3rem;
}
.colums_5{
  display: grid;
  grid-template-columns: repeat(5,1fr);

  font-family: Arial ;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 15px;

  text-align: center;

  color: #000000;
}
.column1{
  display: grid;
  grid-template-columns: repeat(3,1fr);
}

.column1_1{
  text-align: right;
  margin-right: 1.5rem;
}

.column1_2{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/*.column1_2_1{
  margin-right: 0.5rem;
}*/

.column2{
  display: grid;
  grid-template-columns: 10% 70%;
  /*margin-right: 1rem;
  margin-left: 4rem;*/
}

.column2_2{
  text-align: left;
}

.sombra{
  color: #767676;
}

.column2_1{
  margin-right: 0.5rem;
}


.overlay_{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: rgba(0,0,0,0.4);
}

.sub_title{
  font-family: "Segoe UI Semibold";
  font-size: 19px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;

}

/*+++++++++++++++++++*/
/*
//TARGET*/

.target{
  background-color: white;
  width: 257px;
  height: 300px;
  border-radius: 5px;
  margin:10px;
  padding: 1rem;
}

.section1{
  text-align: center;
  font-family: "Segoe UI Semibold";
}

.section1 .titulo{
  font-size: 23px;
  font-family: "Segoe UI Semibold";
  margin-bottom: 1rem;
}

.section2{
  text-align: left;
  margin: 0.5rem;
  font-family: "Segoe UI Semibold";
}

.section3{
  text-align: right;
  margin-top: 1.3rem;
  margin-right: 1rem;
  font-family: "Segoe UI Semibold";
}

.section3 img{
  margin-right: 0.4rem;
  margin-left: 0.4rem;

}


.bloques{
  display: grid;
  grid-template-columns: repeat(4,1fr);
  width: 100%;
}

.column_2{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.btn_new{
  width: 30%;
  height: 3rem;
  font-size: 18px;
  margin-top: auto;
  margin-bottom: auto;
}

.btn_new:hover{
  background-color: #000000;
  color: white;
}

.centrar_r{
  margin-right:auto;
}
.centrar_l{
  margin-left: auto;
}

.add_height{
  height: 50px;
}

.add_height_2{
  height: 40px;
}

.centrar_v{
  margin-top: auto;
  margin-bottom: auto;
}
.centrar_h{
  margin-left: auto;
  margin-right: auto;
}

.var_width{
  width: 15%;
  margin-bottom: 2rem;
}
</style>