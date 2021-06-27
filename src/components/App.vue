<template>
    <div id="app">
        <form ref="form" id="form">
            <label><input class="input" type="radio" name="group1" value="monsters">Monsters</label>
            <label><input class="input" type="radio" name="group1" value="spells">Spells</label>
            <label><input class="input" type="radio" name="group1" value="classes">Classes</label>
            <label><input class="input" type="radio" name="group1" value="features">Features</label>
            <label><input class="input" type="radio" name="group1" value="skills">Skills</label>
            <button v-on:click="search">Get Data</button>
        </form>
        <div class="row">
            <list v-bind:dataDefault="names" v-bind:onItemClick="onItemClick"></list>
            <chosen-list :obj="chosenItemParam"></chosen-list>
        </div>
    </div>
</template>

<script>
"use strict";
import ItemList from './ItemList.vue';
import ObjectList from './ObjectList.vue';
import { ParseMonsterJSON, 
        ParseSpellJSON, 
        ParseClassJSON, 
        ParseFeatureJSON, 
        ParseSkillJSON } from '../js/ParserFunctions';

export default {
    data(){
        return {
            chosenValue: '',
            names: [],
            urls: [],
            chosenItemParam: {},
        };
    },
    methods: {
        search(e){
            e.preventDefault();
            let chosenInputValue = '';
            for(let i = 0; i < this.$refs.form.length - 1; i++)
            {
                if(this.$refs.form[i].checked === true)
                {
                    chosenInputValue = this.$refs.form[i].value;
                }
            }
            this.chosenValue = chosenInputValue;
            
            fetch('https://www.dnd5eapi.co/api/' + this.chosenValue)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.names = data.results.map((item) => item.name);
                this.urls = data.results.map((item) => item.url);
                this.chosenItemParam = {};
            });
        },
        onItemClick(index)
        {
            let dataParsers = {
                'monsters': ParseMonsterJSON,
                'spells': ParseSpellJSON,
                'classes': ParseClassJSON,
                'features': ParseFeatureJSON,
                'skills': ParseSkillJSON,
            }
            fetch('https://www.dnd5eapi.co' + this.urls[index])
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(dataParsers.hasOwnProperty(this.chosenValue))
                {
                    this.chosenItemParam = dataParsers[this.chosenValue](data);
                } else {
                    console.log("No " + this.chosenValue + " process function");
                }
            });
        }
    },
    mounted: function() {
    },
    components: {
        'list': ItemList,
        'chosenList': ObjectList,
    }
};
</script>

<style lang="less">
#app {
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
}

.row {
    display: flex;
    flex-direction: row;
}

#form
{
    @main-color: #00675C;
    @btn-hover-color: #019485;

    color: black;
    display: flex;
    flex-direction: column;
    button
    {
        background-color: @main-color;
        color: white;
        border: 2px solid @main-color;
        border-radius: 4px;
        width: 100px;

        &:hover
        {
            background-color: @btn-hover-color;
        }
    }
}
</style>