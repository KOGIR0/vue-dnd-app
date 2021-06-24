<template>
    <div>
        <div v-for="(item, index) in Object.keys(obj).filter(key => obj[key])"
        :key="index">
        {{ item }} : {{ obj[item] }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        obj: Object,
    },
    data: function()
    {
        return {

        }
    }
}
</script>