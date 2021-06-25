<template>
    <div id="app">
        <form ref="form">
            <input type="radio" name="group1" value="monsters"><label>Monsters</label>
            <input type="radio" name="group1" value="spells"><label>Spells</label>
            <input type="radio" name="group1" value="classes"><label>Classes</label>
            <input type="radio" name="group1" value="features"><label>Features</label>
            <input type="radio" name="group1" value="skills"><label>Skills</label>
            <button v-on:click="search">Search</button>
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
            console.log(this.$refs.form);
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
        console.log("Component mounted");
    },
    components: {
        'list': ItemList,
        'chosenList': ObjectList,
    }
};
</script>

<style>
#app {
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    color: blue;
}

.row {
    display: flex;
    flex-direction: row;
}
</style>