<template>
    <div>
        <div class="chosen-item">Chosen: {{ chosen }}</div>
        <div class="monster" v-for="(item, index) in data" :key="index" v-on:click="() => {chosen = item.name}">
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
    watch: {
        dataDefault: function(newVal, oldVal) {
            this.data = newVal;
        }
    }
}
</script>

<style>
    .monster {
        color: white;
        background-color: darkolivegreen;
        width: 20%;
        margin: 5px;
        padding: 5px;
    }

    .monster:hover {
        cursor: pointer;
    }

    .chosen-item {
        color: black;
    }
</style>