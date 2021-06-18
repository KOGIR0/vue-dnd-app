<template>
    <div id="app">
        <input
        v-model="message"
        type="text">
        <h2 class="message">{{ message }}</h2>
        <button v-on:click="search">Search</button>
        <list v-bind:dataDefault="this.data"></list>
    </div>
</template>

<script>
import List from './List.vue';

export default {
    data(){
        return {
            message: 'Hello World',
            data: [],
        };
    },
    methods: {
        search(){
            fetch('https://www.dnd5eapi.co/api/monsters')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.data = data.results;
            });
        },
    },
    mounted: function() {
        console.log("Component mounted");
    },
    components: {
        'list': List
    }
};
</script>

<style>
#app {
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    color: blue;
}
</style>