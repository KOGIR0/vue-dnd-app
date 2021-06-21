<template>
    <div>
        <div id="row">
            <div id="list-column">
                <div 
                class="list-item" 
                v-for="(item, index) in data" :key="index" 
                v-on:click="getChosen(item)"
                :style="[item.index === chosen.index ? { 'background': 'orange' } : 'null']">
                    {{ index }}) {{ item.name }}
                </div>
            </div>
            <div class="chosen-item" v-if="chosen">
                <div id="name"> Name: {{ chosen.name }} </div>
                <div id="size"> Size: {{ chosen.size }} </div>
                <div id="intelligence"> Intelligence: {{ chosen.intelligence }} </div>
                <div id="hit-points"> Hit points: {{ chosen.hit_points }} </div>
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
        background-color: #00675C;
        margin: 5px;
        padding: 5px;
    }

    .chosen-item #name {
        border-bottom: 2px solid black;
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
        padding: 5px;
        background-color: #5DCFC3;
        border-radius: 5px;
    }

    #row {
        display: flex;
        flex-direction: row;
    }
</style>