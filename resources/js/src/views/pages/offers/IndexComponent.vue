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
                        <vs-th sort-key="offer_token">Offer token key</vs-th>
                        <vs-th sort-key="offer_token_value">Offer token value</vs-th>
                        <vs-th sort-key="offer_url">Offer URL</vs-th>
                        <vs-th sort_key="status">Status</vs-th>
                        <vs-th sort_key="updated_at">Created</vs-th>
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
                <add-offer-component/>
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
        },
        beforeMount() {
            this.getOffers();
        }
    }
</script>

<style scoped>

</style>