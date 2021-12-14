<template>
    <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-6">
                <Search />
                <Table />
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Search from './components/Search.vue'
import Table from './components/Table.vue'

export default {
  name: 'App',
  components: {
    Search,
    Table
  }
}
</script>

