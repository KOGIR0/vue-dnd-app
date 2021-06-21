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
                <div id="name"> {{ chosen.name }} </div>
                <div id="size"><label>Size:</label> {{ chosen.size }} </div>
                <div id="intelligence"><label>Intelligence:</label> {{ chosen.intelligence }} </div>
                <div id="hit-points"><label>Hit points:</label> {{ chosen.hit_points }} </div>
                <div id="type"><label>Type:</label> {{ chosen.type }} </div>
                <div id="armor_class"><label>Armor class:</label> {{ chosen.armor_class }} </div>
                <div id="wisdom"><label>Wisdom:</label> {{ chosen.wisdom }} </div>
                <div id="xp"><label>XP:</label> {{ chosen.xp }} </div>
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
                console.log(data);
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
        width: 20%;
        padding: 5px;
        background-color: #5DCFC3;
        border-radius: 5px;
    }

    .chosen-item label {
        color: #A64600;
        display: inline-block;
        width: 45%;
    }

    #row {
        display: flex;
        flex-direction: row;
    }
</style>