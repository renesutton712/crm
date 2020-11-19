<template>
    <vs-card>
        <vs-row vs-type="flex" vs-justify="space-between" vs-align="center" vs-w="12">
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-start" vs-align="center">
                <div>
                    <h3>Offers</h3>
                </div>
            </vs-col>
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-end" vs-align="center">
                <vs-button @click="showModal" type="filled" color="primary">Add Offer</vs-button>
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col>
                <vs-table v-model="selected_offers" search :data="offers_list" multiple>
                    <template slot="header"></template>
                    <template slot="thead">
                        <vs-th sort_key="id">ID</vs-th>
                        <vs-th sort_key="network_name">Network Name</vs-th>
                        <vs-th sort-key="offer_id">OI</vs-th>
                        <vs-th sort-key="offer_name">Offer Name</vs-th>
                        <vs-th sort-key="offer_token">Param key</vs-th>
                        <vs-th sort-key="offer_token_value">Param value</vs-th>
                        <vs-th sort-key="offer_url">Offer URL</vs-th>
                        <vs-th sort_key="status">Status</vs-th>
                        <vs-th sort_key="updated_at">Created</vs-th>
                        <vs-th sort_key="actions">Actions</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr,indextr) in data">
                            <vs-td :data="data[indextr].id">{{data[indextr].id}}</vs-td>
                            <vs-td :data="data[indextr].network_name">{{data[indextr].network_name}}</vs-td>
                            <vs-td :data="data[indextr].offer_id">{{data[indextr].offer_id}}</vs-td>
                            <vs-td :data="data[indextr].offer_name">{{data[indextr].offer_name}}</vs-td>
                            <vs-td :data="data[indextr].offer_token">{{data[indextr].offer_token}}</vs-td>
                            <vs-td :data="data[indextr].offer_token_value">{{data[indextr].offer_token_value}}</vs-td>
                            <vs-td :data="data[indextr].offer_url">{{data[indextr].offer_url}}</vs-td>
                            <vs-td v-if="data[indextr].status === 1" :data="data[indextr].status">Active</vs-td>
                            <vs-td v-else :data="data[indextr].status">Not Active</vs-td>
                            <vs-td :data="data[indextr].updated_at">{{data[indextr].updated_at}}</vs-td>
                            <vs-td>
                                <vs-icon @click="editOffer(data[indextr].id)" icon="create" size="small"
                                         color="success" class="mr-3"></vs-icon>
                                <vs-icon @click="deleteOffer(data[indextr].id)" icon="delete" size="small"
                                         color="danger"></vs-icon>
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vs-col>
        </vs-row>
        <modal v-if="isModalVisible" @close="closeModal">
            <template v-slot:header>
                <p>Add Offer</p>
            </template>
            <template v-slot:body>
                <add-offer-component @destroyOfferId="destroyOfferId" :offer_id="offer_id"/>
            </template>
        </modal>
    </vs-card>
</template>

<script>
    import AddOfferComponent from "./AddOfferComponent";
    import axios from "../../../axios";

    export default {
        name: "IndexComponent",
        components: {AddOfferComponent},
        data: () => {
            return {
                isModalVisible: false,
                offers_list: [],
                selected_offers: [],
                offer_id: null,
            }
        },
        methods: {
            showModal() {
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            getOffers: function () {
                this.$vs.loading();
                axios.get('offers/get')
                    .then((response) => {
                        if (typeof response.data === "string") {
                            throw response.data;
                        }
                        this.offers_list = response.data;
                        this.$vs.loading.close();
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
            editOffer: function (offer_id) {
                this.offer_id = offer_id;
                this.showModal();
            },
            deleteOffer: function (id) {
                if (!confirm('Are you sure you want to delete this offer?')) {
                    return;
                }
                axios.get('offers/delete/' + id)
                    .then((response) => {
                        if (!response.data.status) {
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
            destroyOfferId: function () {
                this.offer_id = null
            }
        },
        beforeMount() {
            this.getOffers();
        }
    }
</script>

<style scoped>

</style>