<template>
    <div class="card">
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th
                            v-for="(col, key) in columns"
                            :key="key"
                            @click="sortTable(key)"
                        >
                            {{ col }}
                            <span v-show="key == sortColumn">
                                ({{ ascending ? "asc" : "desc" }})
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="getPaginatedUsers.length > 0">
                    <tr v-for="(user, i) in getPaginatedUsers" :key="i">
                        <td>
                            <img
                                :src="user.avatar_url"
                                alt=""
                                srcset=""
                                height="50"
                            />
                        </td>
                        <td>{{ user.login }}</td>
                        <td>{{ user.type }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-center">
                <button class="btn btn-sm btn-secondary" @click="movePages(-1)">
                    Back
                </button>
                <p>{{ currentPage }} out of {{ users.length / rowsPerPage }}</p>
                <button class="btn btn-sm btn-secondary" @click="movePages(1)">
                    Next
                </button>
            </div>
        </div>
        <table></table>
    </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
    setup() {
        const columns = {
            avatar_url: "Avatar",
            login: "Login",
            type: "Type",
        };
        const store = useStore();
        const users = computed(() => store.getters.getUsers);
        const getPaginatedUsers = computed(
            () => store.getters.getPaginatedUsers
        );
        const ascending = ref(true);
        const sortColumn = ref("login");
        const rowsPerPage = 10;
        const startRow = ref(0);
        const currentPage = ref(1);

        const sortTable = (col) => {
            if (sortColumn.value === col) {
                ascending.value = !ascending.value;
            } else {
                ascending.value = true;
                sortColumn.value = col;
            }

            store.dispatch("sortUsers", {
                col,
                ascending: ascending.value,
            });
        };

        const movePages = (i) => {
            let newStartRow = startRow.value + i * rowsPerPage;
            if (
                newStartRow >= 0 &&
                newStartRow < getPaginatedUsers.value.length
            ) {
                startRow.value = newStartRow;
            }

            if (i === 1) {
                let newPage = currentPage.value + 1;
                if (newPage <= users.value.length / rowsPerPage) {
                    currentPage.value = newPage;
                }
            } else {
                let newPage = currentPage.value - 1;
                if (newPage > 0) {
                    currentPage.value = newPage;
                }
            }

            store.dispatch("paginateUsers", {
                rowsPerPage,
                currentPage: currentPage.value,
            });
        };

        return {
            columns,
            sortColumn,
            ascending,
            users,
            getPaginatedUsers,
            startRow,
            rowsPerPage,
            currentPage,
            sortTable,
            movePages,
        };
    },
};
</script>

<style>
</style>