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
                <span class="error" v-if="submit && validateNetwork">Network is required!</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-3">
            <vs-col vs-w="5">
                <vs-input class="w-full" label-placeholder="Offer URL param key" v-model="form_fields.offer_token"/>
                <span class="error" v-if="submit && validateOfferToken">Offer name is required!</span>
            </vs-col>
            <vs-col vs-w="2"></vs-col>
            <vs-col vs-w="5">
                <vs-input class="w-full" label-placeholder="Offer URL param value" v-model="form_fields.offer_token_val"/>
                <span class="error" v-if="submit && validateOfferTokenVal">Offer name is required!</span>
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
        props: ['offer_id'],
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
                    offer_token: '',
                    offer_token_val: '',
                    offer_id: '',
                    offer_rand_id: '',
                },
                networks_list: [],
            }
        },
        methods: {
            save: function () {
                this.submit = true;
                if (this.validateOfferName || this.validateNetwork || this.validateOfferToken || this.validateOfferTokenVal) {
                    return false;
                }
                this.$vs.loading();
                this.form_fields.offer_id = this.offer_id == undefined ? 0 : this.offer_id;
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
            },
            getOffer: function () {
                this.$vs.loading();
                axios.get('offers/get/' + this.offer_id)
                    .then((response) => {
                        if (!response.data.status) {
                            throw response.data;
                        }
                        this.form_fields.offer_name = response.data.offer_name;
                        this.form_fields.network_id = response.data.network_id;
                        this.form_fields.offer_token = response.data.offer_token;
                        this.form_fields.offer_token_val = response.data.offer_token_value;
                        this.form_fields.offer_url = response.data.offer_url;
                        this.form_fields.offer_rand_id = response.data.offer_id;
                        this.$vs.loading.close();
                    })
                    .catch(error => {
                        this.$vs.loading();
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
            },
            validateNetwork() {
                return this.form_fields.network_id === '';
            },
            validateOfferToken() {
                return this.form_fields.offer_token === '';
            },
            validateOfferTokenVal() {
                return this.form_fields.offer_token_val === '';
            }
        },
        beforeMount() {
            this.getNetworks();
            if (this.offer_id !== null) {
                this.getOffer();
            }
        },
        destroyed() {
            this.$emit('destroyOfferId');
        }
    }
</script>

<style scoped>

</style>