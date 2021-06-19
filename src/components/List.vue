<template>
    <div>
        <div id="row">
            <div id="list-column">
                <div class="list-item" v-for="(item, index) in data" :key="index" v-on:click="getChosen(item)">
                    {{ index }}) {{ item.name }}
                </div>
            </div>
            <div class="chosen-item" v-if="chosen">
                <div> Name: {{ chosen.name }} </div>
                <div> Size: {{ chosen.size }} </div>
                <div> Intelligence: {{ chosen.intelligence }} </div>
                <div> Hit points: {{ chosen.hit_points }} </div>
            </div>
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
            fetch("https://www.dnd5eapi.co" + item.url)
            .then((res) => res.json())
            .then((data) => {
                if(this.chosen.index === data.index)
                {
                    this.chosen = '';
                } else {
                    this.chosen = data;
                }
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
        margin: 5px;
        padding: 5px;
    }

    .list-item:hover {
        cursor: pointer;
    }

    #list-column {
        width: 20%;
    }

    .chosen-item {
        color: black;
        display: flex;
        flex-direction: column;
        position: fixed;
        margin-left: 20%;
    }

    #row {
        display: flex;
        flex-direction: row;
    }
</style>