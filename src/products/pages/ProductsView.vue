<template>
  <!-- {{array_category[0]}} -->
  <body>
    <transition>
<div v-if="numero_pantalla===0">
  <div class="contenedor_Categories">
    <div class="titulo_c">
      <h1>Categories</h1>
    </div>
    <div class="contend_add_category"> 
      <button class="add_category" @click="numero_pantalla=1">Add Category</button>
    </div>
    <div class="bloques">
      <div v-for="(category,c_index) in array_category" v-bind:key="c_index">
        <!--inicio for-->
        <div class="target">

          <div class="section1">
            <div class="titulo_target">{{category.name}}</div>
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
            <button class="cursor btn_target" @click="numero_pantalla=2, indice_category=category.id">
              See all
            </button>
            <button class="cursor btn_target_delete" @click="deleteCategory(category.id)">
              Erase category
            </button>

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
    <p class="titulo_c_tabla">
      
      Name Category: 
      <span>{{array_category[indice_category-1].name}}</span>
      <hr>
      
    </p>
    <p class="titulo_c_tabla">
      
      Description Category: 
      <span>{{array_category[indice_category-1].description}}</span>
      <hr>
      
    </p>
    <!-- buscando -->
    <div class="column_2">

      <div class="contend_add_category centrar_r centrar_r_">
        <div class="cursor add_category " @click="numero_pantalla=0">
        Return
        </div>
      </div>

      <div class="contend_add_product centrar_l_2 centrar_l_">
        <h1 class="cursor add_product " @click="numero_pantalla=3">
        Add product
        </h1>
      </div>
      
      
    </div>
    

    <button class="title_barra negro">
        <div>Description</div>
        <div>Amount</div>
        <div>Total Cost</div>
        <div>Registration Date</div>
        <div>Erase</div>
      </button>

      <div v-for="(p, indice) in array_products" v-bind:key="indice">
        <div v-if="p.category==indice_category">
          <div v-if="indice%2==0">
            <button class="title_barra_contenido claro">
              <div>{{p.description}}</div>
              <div>{{p.amount}}</div>
              <div>{{p.price_all}}</div>
              <div>{{p.fecha_creacion}}</div>
              <button class="cursor btn_target_delete" @click="delete_product(p.id)">
                Delete product
              </button>
            </button>
          </div>
          <div v-else>
            <button class="title_barra_contenido oscuro">
              <div>{{p.description}}</div>
              <div>{{p.amount}}</div>
              <div>{{p.price_all}}</div>
              <div>{{p.fecha_creacion}}</div>
              <button class="cursor btn_target_delete" @click="delete_product(p.id)">
                Delete product
              </button>
            </button>
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
  margin-left: 5%;
}


.titulo_c{
  font-family: "Segoe UI Semibold";
  font-size: 29px;
  margin-bottom: 5px;
  padding-top: 2rem;
  margin-left: 10%;
  color: white;
}
.titulo_c_tabla{
  font-family: "Segoe UI Semibold";
  font-weight:lighter;
  font-size: 30px;
  margin-bottom: 5px;
  padding-top: 2rem;
  margin-left: 10%;
  color: white;
}
.titulo_c span{
  font-size: 29px;
}
.titulo_c_tabla span{
  font-size: 25px;
  font-weight: bold;
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

.contend_add_category{
  width: auto;
  text-align: right;
}
.contend_add_product{
  width: auto;
}

.width{
  width: 100%;
}

.add_category{
  width: auto;
  background-color: #3F51B5;
  border-color: transparent;
  color: white;
  font-size: 1.3rem;
  padding: 0.8rem;
  margin-bottom: 2rem;
  margin-right: 5%;
}
.add_product{
  width: auto;
  background-color: #3F51B5;
  border-color: transparent;
  color: white;
  font-size: 1.3rem;
  padding: 0.8rem;
  margin-bottom: 2rem;
  
}


.add_category:hover, .add_product:hover{
  background-color: #4a5cc3;
}
button.add_category{
  height: auto;
  width: auto;
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
  background-color: rgb(235, 235, 235);
  width: 257px;
  height: auto;
  border-radius: 5px;
  margin: auto;
  margin-bottom: 2rem;
  padding: 1rem;
  box-shadow: 10px 10px 10px 5px rgba(0, 0, 0, 0.2);
  
}
.target:hover{
  background-color: white;
}

.section1{
  text-align: center;
  font-family: "Segoe UI Semibold";
  margin-bottom: 1.5rem;
}

.titulo_target{
  font-family: "Segoe UI Semibold";
  font-size: 19px;
  margin-bottom: 2rem;
}

.section1 .titulo_target{
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
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  margin-right: auto;
  margin-left: auto;
  font-family: "Segoe UI Semibold";
  /* background-color: #FF914D; */
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.btn_target{
  background-color: #3F51B5;
  border-color: transparent;
  color: white;
  font-size: 1rem;
  padding: 0.4rem;
  border-radius: 5px;
  margin-right: 5%;
}
.btn_target:hover{
  background-color: #5d6ecf;
}
.btn_target_delete{
  background-color: #dd2424;
  border-color: transparent;
  color: white;
  font-size: 1rem;
  padding: 0.4rem;
  border-radius: 5px;
  margin-right: 5%;
}
.btn_target_delete:hover{
  background-color: #f45353;
}

.bloques{
  display: grid;
  grid-template-columns: repeat(4,1fr);
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}


.column_2{
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: auto;
  text-align: right;
  margin-top: 2rem;
}

.title_barra, .title_barra_contenido{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: transparent;
  border-color:#000000;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  color: white;
  font-weight: 700;
  padding: 1rem;
  text-align: center;
}
.title_barra_contenido{
  border-width: 2px;
  font-size: 20px;
  margin-top: 0.5rem;
}
.title_barra{
  border-width: 3px;
  font-size: 25px;
  margin-bottom: 1rem;
}

.title_barra div, .title_barra_contenido div{
  margin-top: auto;
  margin-bottom: auto;
}
.negro{
  background-color: #000000;
  
}
.claro{
  background-color: #fefefe4d;
}

.oscuro{
  background-color: #00000028;
  border-color: white;
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
.centrar_r_{
  width: auto;
  margin-left: 10%;
}
.centrar_l_{
  margin-right: 10%;
}
.centrar_r{
  margin-right:auto;
}
.centrar_l{
  margin-left: auto;
}
.centrar_l_2{
  margin-left: auto;
  text-align: center;
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

@media (max-width: 1200px) {
  .bloques{
    grid-template-columns: repeat(3,1fr);
  }
}
@media (max-width: 920px) {
  .bloques{
    grid-template-columns: repeat(2,1fr);
    width: 95%;
  }
}
@media (max-width: 600px) {
  .bloques{
    grid-template-columns: repeat(1,1fr);
    width: 95%;
  }
}
</style>