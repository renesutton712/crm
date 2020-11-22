<template>
    <vs-card>
        <vs-row vs-type="flex" vs-justify="space-between" vs-align="center" vs-w="12">
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-start" vs-align="center">
                <div>
                    <h3>Iframe Pixels</h3>
                </div>
            </vs-col>
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-end" vs-align="center">
                <vs-button @click="showModal" type="filled" color="primary">Add Iframe Pixel</vs-button>
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col>
                <vs-table v-model="selected_iframes" search :data="iframe_list" multiple>
                    <template slot="header"></template>
                    <template slot="thead">
                        <vs-th sort-key="id">ID</vs-th>
                        <vs-th sort-key="iframe_name">Iframe Name</vs-th>
                        <vs-th sort-key="iframe_content">Iframe Content</vs-th>
                        <vs-th>Actions</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr,indextr) in data">
                            <vs-td :data="data[indextr].id">{{data[indextr].id}}</vs-td>
                            <vs-td :data="data[indextr].iframe_name">{{data[indextr].iframe_name}}</vs-td>
                            <vs-td :data="data[indextr].iframe_content">
                                <vx-tooltip title="Full" color="primary" :text="data[indextr].iframe_content" position="bottom">
                                    {{cutString(data[indextr].iframe_content)}}

                                </vx-tooltip>
                            </vs-td>
                            <vs-td>
                                <vs-icon @click="EditIframePixel(data[indextr].id)" icon="create" size="small"
                                         color="success" class="mr-3"></vs-icon>
                                <vs-icon @click="deleteIframePixel(data[indextr].id)" icon="delete" size="small"
                                         color="danger"></vs-icon>
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vs-col>
        </vs-row>
        <modal v-if="isModalVisible" @close="closeModal">
            <template v-slot:header>
                <p>Add Iframe Pixel</p>
            </template>
            <template v-slot:body>
                <add-new-iframe-pixel @destroyPID="destroyPID" :p_id="p_id"></add-new-iframe-pixel>
            </template>
        </modal>
    </vs-card>
</template>

<script>
    import axios from "../../../axios";
    import AddNewIframePixel from "./AddNewIframePixel";

    export default {
        name: "IndexComponent",
        components: {AddNewIframePixel},
        data: () => {
            return {
                isModalVisible: false,
                p_id: null,
                iframe_list: [],
                selected_iframes: [],
            }
        },
        methods: {
            showModal() {
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            getPixels: function () {
                this.$vs.loading();
                axios.get('iframe/get')
                    .then((response) => {
                        this.iframe_list = response.data;
                        this.$vs.loading.close();
                    })
                    .catch(error => {
                        console.log(error);
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
            destroyPID: function () {
                this.p_id = null;
            },
            deleteIframePixel: function (id) {
                if (!confirm('Are you sure you want to delete this network?')) {
                    return
                }
                this.$vs.loading();
                axios.get('iframe/delete/' + id)
                    .then((response) => {
                        if (!response.data.status) {
                            this.$vs.loading.close();
                            throw response.data
                        }
                        location.reload();
                    })
                    .catch(error => {
                        this.$vs.loading.close();
                        this.$vs.loading.close();
                        this.$vs.notify({
                            title: 'Error',
                            text: error.msg,
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'warning'
                        })
                    })
                this.$vs.loading();

            },
            EditIframePixel: function (id) {
                this.p_id = id;
                this.showModal();
            },
            cutString: function (str) {
                return str.substring(0, 150) + '...';
            }
        },
        beforeMount() {
            this.getPixels();
        }
    }
</script>

<style scoped>

</style>