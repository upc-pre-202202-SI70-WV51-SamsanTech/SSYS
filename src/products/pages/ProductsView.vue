<template>
    <body>
  
  
  
  
  
  
  
  
  
  
  
      <transition>
  <div v-if="numero_pantalla===0">
    <div class="contenedor_Categories">
      <div class="titulo">
        Categories
      </div>
      <button @click="numero_pantalla=1">Add Category</button>
      <div class="bloques">
        <div v-for="(category,c_index) in array_category" v-bind:key="c_index">
          <!--inicio for-->
          <div class="target" >
  
            <div class="section1">
              <div class="titulo">{{category.name_Category}} {{numero_Target_}}</div>
            </div>
  
            <div class="section2">
              <div class="sub_text">Num. prodcuts</div>
              <div class="text">Total Amount {{cantidad_Productos}}</div>
            </div>
  
            <div class="section2">
              <div class="sub_text">Creacion Date</div>
              <div class="text">{{category.date_Category}}</div>
            </div>
  
            <div class="section3">
              <button @click="numero_pantalla=2">
                <img src="../../assets/img/item.png" alt="iconoojo"
                     style="width: 21px; height: 21px">
                See all
              </button>
  
              <img src="../../assets/img/edit.jpg">
  
              <img @click="erase" src="../../assets/img/erase.jpg">
  
  
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
                <input class="sub_text contenido contenido_Amount"
                       type="text" v-model="name_Category" placeholder="Name">
                <div class="sub_text">
                  Enter the name of the new category</div>
              </div>
  
              <div class="contenidos_bloque">
                <input type="text" class="sub_text contenido contenido_Description"
                       v-model="description_Category" placeholder="Description">
                <div class="sub_text">Enter a description of the category</div>
              </div>
  
  
  
  
  
            </div>
  
            <div class="botones">
              <button class="boton boton_Accept"
                      @click="accetp_category">Accept</button>
              <button @click="cancel_category"
                      class="boton boton_Cancel">Cancel</button>
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
            <div class="titulo">Add Product in Name {{numero}}</div>
            <div @click="numero_pantalla=0" class="titulo">Volver</div>
            <button @click="numero_pantalla=3">agregar producto</button>
            <div class="table">
  
              <div class="colums_5">
                <div class="column1">
                  <div class="column1_1">
                    <img src="../../assets/img/no_Check.jpg"
                         alt="no check" style="width: 21px; height: 21px">
                  </div>
                  <div class="column1_2">
                    <img class="column1_2_1"
                         src="../../assets/img/item.png" alt="item" style="width: 12px; height: 17px">
                    <div class="column1_2_2">Description</div>
                  </div>
                </div>
  
                <div class="column2">
                  <img class="column2_1" src="../../assets/img/item.png" alt="item" style="width: 12px; height: 17px">
                  <div class="column2_2">Amount</div>
                </div>
  
                <div class="column2">
                  <img src="../../assets/img/item.png" alt="item" style="width: 12px; height: 17px">
                  <div class="column2_2">Total Cost</div>
                </div>
  
                <div class="column2">
                  <img src="../../assets/img/item.png" alt="item" style="width: 12px; height: 17px">
                  <div class="column2_2">Registration Date</div>
                </div>
  
                <div>Options</div>
  
              </div>
  
              <hr>
  
              <div v-for="(p, indice) in array_products" v-bind:key="indice">
                <div class="colums_5 sombra">
                  <div class="column1">
                    <div class="column1_1">
                      <img src="../../assets/img/no_Check.jpg" alt="no check" style="width: 21px; height: 21px">
                    </div>
                    <div class="column1_2">
                      <div class="column1_2_2">{{p.description}}</div>
                    </div>
  
                  </div>
  
                  <div class="column2_2">{{p.amount}}</div>
  
                  <div class="column2_2">{{p.total_Cost}}</div>
                  <div class="column2_2">{{p.date}}</div>
                  <div >
                    <img class="column2_1" src="../../assets/img/erase.jpg" alt="item" style="width: 12px; height: 17px">
                    <img src="../../assets/img/edit.jpg" alt="item" style="width: 12px; height: 17px">
                  </div>
  
                </div>
                <hr>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="numero_pantalla===3">
          <div class="contenedor_add_product">
            <div class="titulo">Add Product in Name {{numero}}</div>
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
                <input class="sub_text contenido contenido_Total_Cost" type="number" v-model="total_Cost" placeholder="Total cost">
                <div class="sub_text">Enter the total cost of adding all the units or quantity</div>
              </div>
  
            </div>
  
            <div class="botones">
              <button class="boton boton_Accept" @click="accetp">Accept</button>
              <button @click="cancel" class="boton boton_Cancel">Cancel</button>
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
  import { ref } from "vue";
  export default {
    setup(props){
    let numero_pantalla=ref(0);
  
  
      let name_Category=ref("");
      let description_Category=ref("");
      let date_Category=ref("13/12/2022");
      /*para el FOR*/
      let numero_Target_=1111;
      let name_Target_="nuevo";
      let cantidad_Productos=50;
      let creacion_Date="2/2/2010";
  
      let array_category=[];
      const accetp_category=()=>{
        console.log(name_Category.value +" "+ description_Category.value);
        if (!(name_Category.value==="" || description_Category.value===""))
        {
          /*showModal.value=false;*/
          numero_pantalla.value=0;
          array_category.push({
            name_Category: name_Category.value,
            description_Category: description_Category.value,
            date_Category: date_Category.value
          });
          console.log(array_category);
        };
  
        name_Category.value="";
        description_Category.value="";
  
      };
      const cancel_category=()=>{
        numero_pantalla.value=0;
      }
  
      const erase=()=>{
  
      }
  
      const add_Category=()=>{
  
      }
      /*FIN DE DATOS FOR*/
  
  
  
  
  
  
      let showModal=ref(false);
      let numero=100;
  
  
      let array_products =[];
  
  
  
      /************************************************/
      let description=ref("");
      let amount=ref(0);
      let total_Cost=ref(0);
      let date=ref("2/2/2020");
      let product = {
        description:{
          type: String,
          default: description
        },
        amount:{
          type: Number,
          default: amount
        },
        total_Cost:{
          type: Number,
          default: total_Cost
        },
        date:{
          type: Date,
          default: "1/4/2010"
        }
      };
  
      const cancel=()=>{
        numero_pantalla.value=2;
      }
      const accetp = () =>{
  
  
        if (!(description.value==="" || amount.value===0 || total_Cost.value===0)){
          numero_pantalla.value=2;
          product.amount=amount.value;
          product.total_Cost=total_Cost.value;
          product.description=description.value;
          /*array_products+=product;*/
          array_products.push({description:description.value,
            amount:amount.value,
            total_Cost: total_Cost.value,
            date: date.value});
  
          description.value="";
          amount.value=0;
          total_Cost.value=0;
  
        };
        console.log(array_products);
  
      };
      return{
        numero,
        accetp,
        array_products,
        product,
        description,
        amount,
        total_Cost,
        showModal,
        cancel,
        numero_Target_,
        name_Target_,
        cantidad_Productos,
        creacion_Date,
        name_Category,
        description_Category,
        date_Category,
        array_category,
        accetp_category,
        cancel_category,
        erase,
        add_Category,
        numero_pantalla
      };
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
    height: 500px;
    background-color: #ffff;

    border-radius: 15px;
    text-align: center;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
}
.titulo{
    font-family: "Segoe UI Semibold";
    font-size: 16px;
    margin-bottom: 2rem;
    padding-top: 2rem;
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
    font-size: 12px;
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
    font-size: 12px;
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
    font-size: 14px;
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
    font-size: 12px;
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
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 700;

}

/*+++++++++++++++++++*/
/*
//TARGET*/

.target{
    background-color: white;
    width: 227px;
    height: 260px;
    border-radius: 5px;
    margin:10px;
}

.section1{
    text-align: center;
    font-family: "Segoe UI Semibold";
}

.section1 .titulo{
    font-size: 20px;
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
  </style>