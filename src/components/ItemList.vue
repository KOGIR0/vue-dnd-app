<template>
    <div>
        <div id="row">
            <div id="list-column">
                <div 
                class="list-item" 
                v-for="(item, index) in data" :key="index" 
                v-on:click="onItemClick ? onItemClick(index) : null; chosenIndex=index;"
                :style="[index === chosenIndex ? { 'background': 'orange', 'color': 'black' } : 'null']">
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
            this.chosenIndex = '';
        }
    }
}
</script>

<style lang="less">
    @main-color: #00675C;
    @label-color: #A64600;
    @chosen-item-color: #5DCFC3;

    .list-item {
        color: white;
        background-color: @main-color;
        margin: 5px;
        padding: 5px;

        &:hover
        {
            cursor: pointer;
        }
    }

    .chosen-item 
    {
        color: black;
        display: flex;
        flex-direction: column;
        padding: 5px;
        background-color: @chosen-item-color;
        border-radius: 5px;
        width: 50%;

        #name
        {
            border-bottom: 2px solid black;
        }
        
        label
        {
            color: @label-color;
            display: inline-block;
            width: 45%;
        }
    }

    #row {
        display: flex;
        flex-direction: row;
    }
</style>