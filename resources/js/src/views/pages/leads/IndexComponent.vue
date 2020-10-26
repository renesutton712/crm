<template>
    <vs-card>
        <vs-row vs-type="flex" vs-justify="space-between" vs-align="center" vs-w="12">
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-start" vs-align="center">
                <div>
                    <h3>Leads</h3>
                </div>
            </vs-col>
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-end" vs-align="center">
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col>
                <vs-table v-model="selected_leads" search :data="leads_list" multiple>
                    <template slot="header"></template>
                    <template slot="thead">
                        <vs-th sort-key="unique_id">ID</vs-th>
                        <vs-th sort-key="campaign_name">Campaign Name</vs-th>
                        <vs-th sort-key="network.network_name">Network Name</vs-th>
                        <vs-th sort-key="offer.offer_name">Offer Name</vs-th>
                        <vs-th sort-key="country">Country</vs-th>
                        <vs-th sort-key="first_name">First Name</vs-th>
                        <vs-th sort-key="last_name">Last Name</vs-th>
                        <vs-th sort-key="email">Email</vs-th>
                        <vs-th sort-key="phone">Phone</vs-th>
                        <vs-th sort-key="ip">IP</vs-th>
                        <vs-th sort-key="ua">UA</vs-th>
                        <vs-th sort-key="status">Type</vs-th>
                        <vs-th sort-key="url_params">URL Params</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr,indextr) in data">
                            <vs-td :data="data[indextr].unique_id">{{data[indextr].unique_id}}</vs-td>
                            <vs-td v-if="data[indextr].campaign !== null" :data="data[indextr].campaign.campaign_name">
                                {{data[indextr].campaign.campaign_name}}
                            </vs-td>
                            <vs-td v-else>Campaign not found!</vs-td>
                            <vs-td v-if="data[indextr].network !== null" :data="data[indextr].network.network_name">
                                {{data[indextr].network.network_name}}
                            </vs-td>
                            <vs-td v-else>No Network found</vs-td>
                            <vs-td v-if="data[indextr].offer !== null" :data="data[indextr].offer.offer_name">
                                {{data[indextr].offer.offer_name}}
                            </vs-td>
                            <vs-td v-else>No Offer Found!</vs-td>
                            <vs-td :data="data[indextr].country">{{data[indextr].country}}</vs-td>
                            <vs-td :data="data[indextr].first_name">{{data[indextr].first_name}}</vs-td>
                            <vs-td :data="data[indextr].last_name">{{data[indextr].last_name}}</vs-td>
                            <vs-td :data="data[indextr].email">{{data[indextr].email}}</vs-td>
                            <vs-td :data="data[indextr].phone">{{data[indextr].phone}}</vs-td>
                            <vs-td :data="data[indextr].ip">{{data[indextr].ip}}</vs-td>
                            <vs-td :data="data[indextr].ua">{{data[indextr].ua}}</vs-td>
                            <vs-td v-if="data[indextr].status === 3" class="font-bold text-primary" :data="data[indextr].status">
                                FTD
                            </vs-td>
                            <vs-td v-else :class="[data[indextr].status === 1 ? 'text-dark font-bold' : 'text-success font-bold']"
                                   :data="data[indextr].status">{{data[indextr].status === 1 ? 'Click' : 'Lead'}}
                            </vs-td>
                            <vs-td :data="data[indextr].url_params">{{data[indextr].url_params}}</vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vs-col>
        </vs-row>
    </vs-card>
</template>

<script>
    import axios from "../../../axios";

    export default {
        name: "IndexComponent",
        data: () => {
            return {
                leads_list: [],
                selected_leads: [],
            }
        },
        methods: {
            getLeads: function () {
                this.$vs.loading();
                axios.get('leads/get')
                    .then((response) => {
                        if ("status" in response.data) {
                            throw response.data;
                        }
                        this.leads_list = response.data;
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
            }
        },
        beforeMount() {
            this.getLeads();
        }
    }
</script>

<style scoped>

</style>