<template>
    <vs-card>
        <vs-row vs-type="flex" vs-justify="space-between" vs-align="center" vs-w="12">
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-start" vs-align="center">
                <div>
                    <h3>Pixels</h3>
                </div>
            </vs-col>
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-end" vs-align="center">
                <vs-button @click="showModal" type="filled" color="primary">Add Pixel</vs-button>
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col>
                <vs-table v-model="selected_pixels" search :data="pixels_list" multiple>
                    <template slot="header"></template>
                    <template slot="thead">
                        <vs-th sort-key="unique_id">ID</vs-th>
                        <vs-th sort-key="unique_id">Pixel Name</vs-th>
                        <vs-th sort-key="event">Lead URL</vs-th>
                        <vs-th sort-key="event">FTD URL</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr,indextr) in data">
                            <vs-td :data="data[indextr].id">{{data[indextr].id}}</vs-td>
                            <vs-td :data="data[indextr].name">{{data[indextr].pixel_name}}</vs-td>
                            <vs-td :data="data[indextr].pixel_group[[0]].url">{{data[indextr].pixel_group[[0]].url}}
                            </vs-td>
                            <vs-td v-if="typeof data[indextr].pixel_group[[1]] !== 'undefined'"
                                   :data="data[indextr].pixel_group[[1]].url">{{data[indextr].pixel_group[[1]].url}}
                            </vs-td>
                            <vs-td v-else>None</vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vs-col>
        </vs-row>
        <modal v-if="isModalVisible" @close="closeModal">
            <template v-slot:header>
                <p>Add Pixel</p>
            </template>
            <template v-slot:body>
                <add-new-pixel/>
            </template>
        </modal>
    </vs-card>
</template>

<script>
    import axios from "../../../axios";
    import AddNewPixel from "./AddNewPixel";

    export default {
        name: "IndexComponent",
        components: {AddNewPixel},
        data: () => {
            return {
                isModalVisible: false,
                selected_pixels: [],
                pixels_list: [],
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
                axios.get('pixels/get')
                    .then((response) => {
                        this.pixels_list = response.data;
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
            this.getPixels();
        }
    }
</script>

<style scoped>

</style>