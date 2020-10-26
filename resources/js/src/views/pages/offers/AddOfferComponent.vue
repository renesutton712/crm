<template>
    <div>
        <vs-row vs-w="12">
            <vs-col>
                <vs-input class="w-full" label-placeholder="Offer Name" v-model="form_fields.offer_name"/>
                <span class="error" v-if="submit && validateOfferName">Offer name is required!</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-3">
            <vs-col>
                <label for="Network">Select Network(optional):</label>
                <v-select label="network_name" id="Network" :options="networks_list"
                          v-model="form_fields.network_id"
                          :reduce="network => network.id"/>
                <span class="info">Select network associated with the offer</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-3">
            <vs-col>
                <vs-input class="w-full" label-placeholder="Offer URL(Optional)" v-model="form_fields.offer_url"/>
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
    import vSelect from "vue-select";

    export default {
        name: "AddOfferComponent",
        components: {
            'v-select': vSelect,
        },
        data: () => {
            return {
                submit: false,
                form_fields: {
                    offer_name: '',
                    network_id: '',
                    offer_url: '',
                },
                networks_list: [],
            }
        },
        methods: {
            save: function () {
                this.submit = true;
                if (this.validateOfferName) {
                    return false;
                }
                axios.post('offers/store', this.form_fields)
                    .then((response) => {
                        if ("status" in response.data && !response.data.status) {
                            throw response.data;
                        }
                        location.reload();
                    })
                    .catch(error => {
                        this.$vs.loading.close();
                        this.$vs.notify({
                            title: 'Error',
                            text: error.msg,
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'warning'
                        })
                    })
            },
            getNetworks: function () {
                axios.get('networks/get')
                    .then((response) => {
                        if ("status" in response.data) {
                            throw response.data;
                        }
                        this.networks_list = response.data;
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
            }
        },
        computed: {
            validateOfferName() {
                return this.form_fields.offer_name === '';
            }
        },
        beforeMount() {
            this.getNetworks();
        }
    }
</script>

<style scoped>

</style>