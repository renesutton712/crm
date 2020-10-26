<template>
    <div>
        <vs-row vs-w="12">
            <vs-col>
                <vs-input class="w-full" label-placeholder="Network Name" v-model="fields.network_name"/>
                <span class="error" v-if="submit && validateNetworkName">Network name is required!</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12">
            <vs-col>
                <vs-input class="w-full" label-placeholder="API Key" v-model="fields.api_key"/>
                <span class="error" v-if="submit && validateApiKey">API key is required!</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-5">
            <vs-col>
                <vs-button @click="save" color="success" type="filled">Save</vs-button>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
    import axios from "../../../axios";

    export default {
        name: "AddNetworkComponent",
        data: () => {
            return {
                submit: false,
                fields: {
                    network_name: '',
                    api_key: '',
                }
            }
        },
        methods: {
            save: function () {
                this.submit = true;
                if (this.validateNetworkName && this.validateApiKey) {
                    return
                }
                axios.post('networks/store', this.fields)
                    .then((response) => {
                        if (!response.data.status) {
                            throw response.data
                        }
                        location.reload();
                    })
                    .catch(error => {
                        this.$vs.notify({
                            title: 'Error',
                            text: error.msg,
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'warning'
                        })
                    })
            },
        },
        computed: {
            validateNetworkName() {
                return this.fields.network_name === '';
            },
            validateApiKey() {
                return this.fields.api_key === '';
            },
        }
    }
</script>

<style scoped>

</style>