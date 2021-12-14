<template>
    <input type="text" class="form-control" v-model="login" />
    <button @click="submit" class="btn btn-primary">Submit</button>
</template>

<script>
import { ref } from "@vue/reactivity";
import { inject } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const axios = inject("axios");
        const store = useStore();

        const login = ref(null);

        const submit = () => {
            const api =
                "https://api.github.com/search/users?q=" +
                login.value +
                " in:login";
            axios
                .get(api)
                .then((response) => {
                    const data = response.data.items.map((item) => {
                        return {
                            login: item.login,
                            avatar_url: item.avatar_url,
                            type: item.type,
                        };
                    });

                    store.commit("setUsers", data);
                    store.dispatch("paginateUsers", {
                        rowsPerPage: 10,
                        currentPage: 1,
                    });
                    store.dispatch("sortUsers", {
                        col: "login",
                        ascending: true,
                    });
                })
                .catch(function () {
                    alert("Something went wrong! Try again.");
                });
        };

        return {
            login,
            submit,
        };
    },
};
</script>

<style>
</style>