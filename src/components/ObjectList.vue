<template>
    <div class="object-list">
        <div v-for="(item, index) in Object.keys(obj).filter(key => obj[key])"
        :key="index"
        class="list-item">
            <label class="object-key-label">{{ item }}</label> {{ obj[item] }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        obj: Object,
    }
}
</script>

<style lang="less">
.object-key-label {
    display: inline-block;
    background-color: #FFAA00;
    color: black;
    padding: 5px;
    margin: 5px;
    width: 150px;
    border-radius: 5px;
}

.object-list {
    color: black;
}
</style>