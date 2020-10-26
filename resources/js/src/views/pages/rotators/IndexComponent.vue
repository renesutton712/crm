<template>
    <vs-card>
        <vs-row vs-type="flex" vs-justify="space-between" vs-align="center" vs-w="12">
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-start" vs-align="center">
                <div>
                    <h3>Rotator</h3>
                </div>
            </vs-col>
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-end" vs-align="center">
                <vs-button @click="showModal" type="filled" color="primary">Add Rotator</vs-button>
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col>
                <vs-table v-model="selected_rotators" search :data="rotators_list" multiple>
                    <template slot="header"></template>
                    <template slot="thead">
                        <vs-th sort-key="id">ID</vs-th>
                        <vs-th sort-key="campaign_name">Rotator Name</vs-th>
                        <vs-th sort-key="network_name">Status</vs-th>
                        <vs-th sort_key="offer_name">Created</vs-th>
                        <vs-th>Actions</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr,indextr) in data">
                            <vs-td :data="data[indextr].id">{{data[indextr].id}}</vs-td>
                            <vs-td :data="data[indextr].rotator_name">{{data[indextr].rotator_name}}</vs-td>
                            <vs-td :data="data[indextr].status">{{data[indextr].status}}</vs-td>
                            <vs-td :data="data[indextr].updated_at">{{convertDate(data[indextr].updated_at)}}</vs-td>
                            <vs-td></vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vs-col>
        </vs-row>
        <modal v-if="isModalVisible" @close="closeModal" @destroyri="destroyri" :ri="rotator_id">
            <template v-slot:header>
                <p>Add Rotator</p>
            </template>
            <template v-slot:body>
                <add-new-rotator/>
            </template>
        </modal>
    </vs-card>
</template>

<script>
    import AddNewRotator from "./AddNewRotator";
    import axios from "../../../axios";

    export default {
        name: "IndexComponent",
        components: {AddNewRotator},
        data: () => {
            return {
                isModalVisible: false,
                rotators_list: [],
                selected_rotators: [],
                rotator_id: null,
            }
        },
        methods: {
            convertDate: function (isoString) {
                let date = new Date(isoString);
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            },
            showModal() {
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            getRotators: function () {
                this.$vs.loading();
                axios.get('rotators/get')
                    .then((response) => {
                        this.rotators_list = response.data
                        if (this.rotators_list.length === 0) {
                            throw 'No rotators found'
                        }
                        this.$vs.loading.close();
                    })
                    .catch(error => {
                        this.$vs.loading.close();
                        this.$vs.notify({
                            title: 'Error',
                            text: error,
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'warning'
                        })
                    })
            },
            editRotator: function (ri) {
                this.campaign_id = ri;
                this.showModal();
            },
            destroyri: function () {
                this.rotator_id = null;
            },
        },
        beforeMount() {
            this.getRotators();
        }
    }
</script>

<style scoped>

</style>