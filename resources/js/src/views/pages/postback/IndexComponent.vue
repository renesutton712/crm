<template>
    <vs-card>
        <vs-row vs-type="flex" vs-justify="space-between" vs-align="center" vs-w="12">
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-start" vs-align="center">
                <div>
                    <h3>Postbacks</h3>
                </div>
            </vs-col>
            <vs-col vs-w="6" vs-type="flex" vs-justify="flex-end" vs-align="center">
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col>
                <vs-table v-model="selected_postbacks" search :data="postback_list" multiple>
                    <template slot="header"></template>
                    <template slot="thead">
                        <vs-th sort-key="unique_id">ID</vs-th>
                        <vs-th sort-key="unique_id">Unique</vs-th>
                        <vs-th sort-key="network_name">Network</vs-th>
                        <vs-th sort-key="event">Event</vs-th>
                        <vs-th sort-key="payout">Payout</vs-th>
                        <vs-th sort-key="created_at">Created</vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr,indextr) in data">
                            <vs-td :data="data[indextr].id">{{data[indextr].id}}</vs-td>
                            <vs-td :data="data[indextr].unique_id">{{data[indextr].unique_id}}</vs-td>
                            <vs-td :data="data[indextr].network_name">{{data[indextr].network_name}}</vs-td>
                            <vs-td :class="[data[indextr].event === 'FTD' ? 'text-primary font-bold' : 'text-success font-bold']"
                                   :data="data[indextr].event">{{data[indextr].event}}
                            </vs-td>
                            <vs-td :data="data[indextr].payout">{{'$' + data[indextr].payout}}</vs-td>
                            <vs-td :data="data[indextr].created_at">{{data[indextr].created_at}}</vs-td>
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
                selected_postbacks: [],
                postback_list: [],
            }
        },
        methods: {
            getPostbacks: function () {
                this.$vs.loading();
                axios.get('postbacks/get')
                    .then((response) => {
                        this.postback_list = response.data;
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
            this.getPostbacks();
        }
    }
</script>

<style scoped>

</style>