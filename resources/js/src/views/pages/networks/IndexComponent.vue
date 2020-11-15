<template>
    <vs-card>
        <vs-row vs-type="flex" vs-justify="space-between" vs-align="center" vs-w="12">
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-start" vs-align="center">
                <div>
                    <h3>Networks</h3>
                </div>
            </vs-col>
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-end" vs-align="center">
                <vs-button @click="showModal" type="filled" color="primary">Add Network</vs-button>
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col>
                <vs-table v-model="selected_networks" search :data="networks_list" multiple>
                    <template slot="header"></template>
                    <template slot="thead">
                        <vs-th sort-key="id">ID</vs-th>
                        <vs-th sort-key="network_name">Network Name</vs-th>
                        <vs-th sort-key="network_tokens.token_name">Token Name</vs-th>
                        <vs-th sort-key="network_tokens.token">Token Value</vs-th>
                        <vs-th>Actions</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr,indextr) in data">
                            <vs-td :data="data[indextr].id">{{data[indextr].id}}</vs-td>
                            <vs-td :data="data[indextr].network_name">{{data[indextr].network_name}}</vs-td>

                            <vs-td :data="data[indextr].network_tokens[0].token_name"
                                   v-if="typeof data[indextr].network_tokens[[1]] !== 'undefined'">
                                {{data[indextr].network_tokens[0].token_name}},
                                {{data[indextr].network_tokens[[1]].token_name}}
                            </vs-td>
                            <vs-td v-else>{{data[indextr].network_tokens[0].token_name}}</vs-td>
                            <vs-td v-if="typeof data[indextr].network_tokens[[1]] !== 'undefined'"
                                   :data="data[indextr].network_tokens[0].token">
                                {{(data[indextr].network_tokens[0].token)}},
                                {{(data[indextr].network_tokens[1].token)}}
                            </vs-td>
                            <vs-td v-else>{{(data[indextr].network_tokens[0].token)}}</vs-td>
                            <vs-td>
                                <vs-icon @click="editNetwork(data[indextr].id)" icon="create" size="small"
                                         color="success" class="mr-3"></vs-icon>
                                <vs-icon @click="deleteNetwork(data[indextr].id)" icon="delete" size="small"
                                         color="danger"></vs-icon>
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vs-col>
        </vs-row>
        <modal v-if="isModalVisible" @close="closeModal">
            <template v-slot:header>
                <p>Add Network</p>
            </template>
            <template v-slot:body>
                <add-network-component @destroyNi="destroyNi" :ni="ni"/>
            </template>
        </modal>
    </vs-card>
</template>

<script>
    import axios from "../../../axios";
    import AddNetworkComponent from "./AddNetworkComponent";

    export default {
        name: "IndexComponent",
        components: {AddNetworkComponent},
        data: () => {
            return {
                isModalVisible: false,
                networks_list: [],
                selected_networks: [],
                ni: null,
            }
        },
        methods: {
            showModal() {
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
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
            limitString: function (string) {
                return string.length > 20 ? `${string.substring(0, 20)}...` : string;
            },
            destroyNi: function () {
                this.ni = null;
            },
            deleteNetwork: function (id) {
                if (!confirm('Are you sure you want to delete this network?')) {
                    return
                }
                this.$vs.loading();
                axios.get('networks/delete/' + id)
                    .then((response) => {
                        if (!response.data.status) {
                            this.$vs.loading.close();
                            throw response.data
                        }
                        location.reload();
                    })
                    .catch(error => {
                        this.$vs.loading.close();
                    })
                this.$vs.loading();

            },
            editNetwork(id) {
                this.ni = id;
                this.showModal();
            }
        },
        beforeMount() {
            this.getNetworks();
        }
    }
</script>

<style scoped>

</style>