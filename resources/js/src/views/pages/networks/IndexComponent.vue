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
                        <vs-th sort-key="network_tokens.token">Token</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr,indextr) in data">
                            <vs-td :data="data[indextr].id">{{data[indextr].id}}</vs-td>
                            <vs-td :data="data[indextr].network_name">{{data[indextr].network_name}}</vs-td>

                            <vs-td v-if="data[indextr].network_tokens.length > 0"
                                   :data="data[indextr].network_tokens[0].token_name">
                                {{data[indextr].network_tokens[0].token_name}}
                                {{data[indextr].network_tokens[1] in data[indextr].network_tokens ?
                                data[indextr].network_tokens[1].token_name : 'none'}}
                            </vs-td>
                            <vs-td v-else>No token</vs-td>
                            <vs-td v-if="data[indextr].network_tokens.length > 0"
                                   :data="data[indextr].network_tokens[0].token">
                                {{(data[indextr].network_tokens[0].token)}}
                            </vs-td>
                            <vs-td v-else>No token</vs-td>
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
                <add-network-component/>
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
            }
        },
        beforeMount() {
            this.getNetworks();
        }
    }
</script>

<style scoped>

</style>