<template>
    <div id="app">
        <form ref="form">
            <input type="radio" name="group1" value="monsters"><label>Monsters</label>
            <input type="radio" name="group1" value="spells"><label>Spells</label>
            <input type="radio" name="group1" value="classes"><label>Classes</label>
            <input type="radio" name="group1" value="features"><label>Features</label>
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
import ObjectKeyList from './ObjectKeyList.vue';

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
            for(let i = 0; i < 4; i++)
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
            });
        },
        onItemClick(index)
        {
            let dataProcess = {
                'monsters': (data) => {
                    let monster = {
                        'Name': data.name,
                        'Armor Class': data.armor_class,
                        'Challenge Rating': data.challenge_rating,
                        'Charisma': data.charisma,
                        'Constitution': data.constitution,
                        'Damage Immunities': data.damage_immunities.join(','),
                        'Damage Resistances': data.damage_resistances.join(','),
                        'Damage Vulnerabilities': data.damage_vulnerabilities.join(','),
                        'Dexterity': data.dexterity,
                        'Hit Dice': data.hit_dice,
                        'Hit Points': data.hit_points,
                        'Intelligence': data.intelligence,
                        'Languages': data.languages,
                        'Sences': data.sences,
                        'Size': data.size,
                        'Strength': data.strength,
                        'Type': data.type,
                        'Wisdom': data.wisdom,
                        'XP': data.xp
                    }
                    this.chosenItemParam = monster;
                },
                'spells': (data) => {

                },
                'classes': (data) => {

                },
                'features': (data) => {

                }
            }
            fetch('https://www.dnd5eapi.co' + this.urls[index])
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                dataProcess['monsters'](data);
            });
        }
    },
    mounted: function() {
        console.log("Component mounted");
    },
    components: {
        'list': ItemList,
        'chosenList': ObjectKeyList,
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