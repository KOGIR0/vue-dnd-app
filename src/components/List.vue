<template>
    <div>
        <div class="chosen-item">Chosen: {{ chosen }}</div>
        <div class="list-item" v-for="(item, index) in data" :key="index" v-on:click="getChosen(item)">
            {{ index }}) {{ item.name }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dataDefault: Array,
    },
    data: function () {
        return {
            data: this.dataDefault,
            chosen: "",
        }
    },
    methods: {
        getChosen: function(item)
        {
            this.chosen = item.name;
            fetch("https://www.dnd5eapi.co" + item.url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
        }
    },
    watch: {
        dataDefault: function(newVal, oldVal) {
            this.data = newVal;
        }
    }
}
</script>

<style>
    .list-item {
        color: white;
        background-color: darkolivegreen;
        width: 20%;
        margin: 5px;
        padding: 5px;
    }

    .list-item:hover {
        cursor: pointer;
    }

    .chosen-item {
        color: black;
    }
</style>