<script>
</script>

<template>
  <div class="dasboard">
    <div class="table-board">
      <h1>Dashboard</h1>
      <div class="table-content">
        <div class="cards-table">
          <div class="card">

          </div>
          <div class="card">

          </div>
          <div class="card">

          </div>
        </div>
      </div>
    </div>
    <div class="last-register">
      <div class="table-last">

      </div>
    </div>
  </div>
</template>

<style scoped>
  .dasboard {
    width: 100%;
    color: black;
    border-radius: 3px;
    height: 100%;
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
  }

  .last-register {
    width: 20%;
    align-content: center;
  }
  .table-last {
    margin-top: 100px;
    height: 500px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.5);
  }

</style>
