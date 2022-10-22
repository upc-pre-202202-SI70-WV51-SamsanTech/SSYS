<template>
  <div class="dasboard">
    <div class="table-board">
      <h1>Dashboard</h1>
      <div class="table-content">
        <div class="cards-table">
          <div class="card">
            <div class="card-header">
              <h2>Total Sales</h2>
            </div>
            <div class="card-body">
              <h3>s/. 00.00</h3>
              <p>today</p>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h2>Total expenses</h2>
            </div>
            <div class="card-body">
              <h3>s/. 00.00</h3>
              <p>last 24 hours</p>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <h2>Total revenue</h2>
            </div>
            <div class="card-body">
              <h3>s/. 00,00</h3>
              <p>last 20 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="last-register">
      <div class="table-last">
        <h2>Aggregate Products</h2>
        <p>-</p>
        <ul class="last-purchases">
          <li>
            <div class="product">
              <h3>None</h3>
              <p>-</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import 'primeicons/primeicons.css';

export default {
  name: "Dashboard",
  data() {
    return {
      userData: {}
    }
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("userData"))
    if (!this.userData) this.$router.push({ name: "signIn" })
  }
}

</script>

<style scoped>
.dasboard {
  width: 100%;
  color: black;
  border-radius: 3px;
  height: 98%;
  display: flex;
  flex-direction: row;
}

.table-board {
  width: 80%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  margin-right: 20px;
}

.table-board h1 {
  padding: 20px;
  font-weight: bold;
  font-size: xxx-large;
}

.table-content {
  width: 100%;
  height: 70%;
  padding: 20px;
}

.cards-table {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-gap: 20px;
}

.card {
  background-color: white;
  border-radius: 20px;
  padding: 9% 5%;
}

.card-header h2 {
  font-size: large;
  font-weight: bold;
}

.card-body h3 {
  font-size: 2rem;
  font-weight: bold;
}

.last-register {
  width: 20%;
  align-content: center;
}

.table-last {
  height: 300px;
  border-radius: 20px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.5);
}

.table-last h2 {
  font-size: large;
  font-weight: bold;
}

.last-purchases {
  padding: 10px 0 0 0;
  list-style: none;
}

.product {
  background-color: white;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px;
}

.product h3 {
  font-size: large;
  font-weight: bold;
}


</style>
