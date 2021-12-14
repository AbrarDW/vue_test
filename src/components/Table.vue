<template>
    <div class="card">
        <div class="card-body">
            <table>
                <thead>
                    <tr>
                        <th v-for="(col, key) in columns" :key="key" @click="sortTable(key)">
                            {{col}}
                            <span v-show="key == sortColumn">
                                ({{ ascending ? 'asc' : 'desc' }})
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="users.length > 0">
                    <tr v-for="(user,i) in users" :key="i">
                        <td>{{user.avatar_url}}</td>
                        <td>{{user.login}}</td>
                        <td>{{user.type}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table></table>
    </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
    setup() {
        const columns = {
            'avatar_url': 'Avatar',
            'login': 'Login',
            'type': 'Type',
        }
        const store = useStore()
        const users = computed(() => store.getters.getUsers)
        const ascending = ref(true)
        const sortColumn = ref('login')

        const sortTable = (col) => {
            if (sortColumn.value === col) {
                ascending.value = !ascending.value
                console.log('here')
            } else {
                ascending.value = true
                sortColumn.value = col
            }

            store.dispatch('sortUsers', {
                col,
                ascending: ascending.value
            })
        }

        return {
            columns,
            sortColumn,
            ascending,
            users,
            sortTable
        }
    }
}
</script>

<style>

</style>