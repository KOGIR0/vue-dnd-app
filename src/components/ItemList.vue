<template>
    <div>
        <div id="row">
            <div id="list-column">
                <div 
                class="list-item" 
                v-for="(item, index) in data" :key="index" 
                v-on:click="onItemClick(index); chosenIndex=index;"
                :style="[index === chosenIndex ? { 'background': 'orange' } : 'null']">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dataDefault: Array,
        onItemClick: Function
    },
    data: function () {
        return {
            data: [],
            chosenIndex: "",
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

    .chosen-item {
        color: black;
        display: flex;
        flex-direction: column;
        padding: 5px;
        background-color: #5DCFC3;
        border-radius: 5px;
        width: 50%;
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