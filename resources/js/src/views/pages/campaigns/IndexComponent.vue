<template>
    <vs-card>
        <vs-row vs-type="flex" vs-justify="space-between" vs-align="center" vs-w="12">
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-start" vs-align="center">
                <div>
                    <h3>Campaigns</h3>
                </div>
            </vs-col>
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-end" vs-align="center">
                <vs-button @click="showModal" type="filled" color="primary">Add Campaign</vs-button>
            </vs-col>
        </vs-row>
        <vs-divider/>
        <vs-row class="mt-4 mb-4" vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="12">
            <vs-col vs-w="2">
                <label for="Actions">Actions:</label>
                <v-select :disabled="selected_campaigns.length <= 0" label="text" id="Actions" :options="actions_list"
                          v-model="selected_action"
                          :reduce="action => action.id"/>
            </vs-col>
            <vs-col vs-w="2" class="mt-2 ml-5">
                <vs-button :disabled="selected_campaigns.length <= 0" @click="sendAction" color="success" type="border">Go
                </vs-button>
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col>
                <vs-table v-model="selected_campaigns" search :data="campaigns_list" multiple>
                    <template slot="header"></template>
                    <template slot="thead">
                        <vs-th sort-key="id">CI</vs-th>
                        <vs-th sort-key="campaign_name">Campaign Name</vs-th>
                        <vs-th sort-key="network_name">Network Name</vs-th>
                        <vs-th sort_key="offer_name">Offer Name</vs-th>
                        <vs-th sort_key="rotator_name">Rotator Name</vs-th>
                        <vs-th sort_key="platform">Platform</vs-th>
                        <vs-th>URL parameters</vs-th>
                        <vs-th sort_key="status">Status</vs-th>
                        <vs-th>Actions</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr,indextr) in data">
                            <vs-td :data="data[indextr].id">{{data[indextr].id}}</vs-td>
                            <vs-td :data="data[indextr].campaign_name">{{data[indextr].campaign_name}}</vs-td>
                            <vs-td :data="data[indextr].network_name">{{data[indextr].network_name}}</vs-td>
                            <vs-td :data="data[indextr].offer_name">{{data[indextr].offer_name}}</vs-td>
                            <vs-td :data="data[indextr].rotator_name">{{data[indextr].rotator_name}}</vs-td>
                            <vs-td :data="data[indextr].platform">{{platform_names[data[indextr].platform]}}</vs-td>
                            <vs-td>{{'&ci=' + data[indextr].id + '&ri=' + data[indextr].rotator_id + '&oi=' +
                                data[indextr].offer_id}}
                            </vs-td>
                            <vs-td v-if="data[indextr].status === 2" :data="data[indextr].status">Active</vs-td>
                            <vs-td v-else :data="data[indextr].status">Paused</vs-td>
                            <vs-td>
                                <vs-button @click="editCampaign(data[indextr].id)" color="success"
                                           size="small">Edit
                                </vs-button>
                                <vs-button @click="duplicateCampaign(data[indextr].id)" color="primary"
                                           size="small">Duplicate
                                </vs-button>
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vs-col>
        </vs-row>
        <modal v-if="isModalVisible" @close="closeModal">
            <template v-slot:header>
                <p>Add Campaign</p>
            </template>
            <template v-slot:body>
                <add-campaign-component @destroyci="destroyci" :ci="campaign_id"/>
            </template>
        </modal>
    </vs-card>
</template>

<script>
    import AddCampaignComponent from "./AddCampaignComponent";
    import axios from "../../../axios";
    import vSelect from "vue-select";

    export default {
        name: "IndexComponent",
        components: {
            AddCampaignComponent,
            'v-select': vSelect,
        },
        data: () => {
            return {
                selected_campaigns: [],
                isModalVisible: false,
                campaigns_list: [],
                campaign_id: null,
                actions_list: [
                    {id: 0, text: 'Delete'},
                    {id: 1, text: 'Pause'},
                    {id: 2, text: 'Active'},
                ],
                platform_names: {
                    1: 'Facebook',
                    2: 'Google',
                    3: 'Pinterest'
                },
                selected_action: 0
            }
        },
        methods: {
            showModal() {
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            getCampaigns: function () {
                this.$vs.loading();
                axios.get('campaigns/get')
                    .then((response) => {
                        if ("status" in response.data) {
                            throw response.data;
                        }
                        this.campaigns_list = response.data
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
            editCampaign: function (ci) {
                this.campaign_id = ci;
                this.showModal();
            },
            duplicateCampaign: function (ci) {
                if (!confirm(`Are you sure you want to duplicate campaign ${ci}`)) {
                    return;
                }
                this.$vs.loading();
                axios.post('campaigns/duplicate', {
                    camp_id: ci,
                })
                    .then((response) => {
                        if (!response.data.status) {
                            throw response.data.msg;
                        }
                        this.$vs.loading.close();
                        this.$vs.notify({
                            title: 'Sucess',
                            text: response.data.msg,
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'success'
                        })
                        window.location.reload();
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
            destroyci: function () {
                this.campaign_id = null;
            },
            sendAction: function () {
                let action = this.selected_action === 1 ? 'pause' : 'delete';
                if (this.selected_campaigns.length <= 0 || !confirm('Are you sure you want to ' + action + ' campaigns')) {
                    return;
                }
                this.$vs.loading();
                axios.post('campaigns/alter', {
                    status: this.selected_action,
                    campaigns: this.selected_campaigns,
                })
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
            }
        },
        beforeMount() {
            this.getCampaigns();
        }
    }
</script>

<style scoped>

</style>