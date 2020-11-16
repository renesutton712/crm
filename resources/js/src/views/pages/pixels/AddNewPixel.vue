<template>
    <div>
        <vs-row vs-w="12">
            <vs-col>
                <vs-input class="w-full" label-placeholder="Postback Name" v-model="form_fields.pixel_name"/>
                <span class="error" v-if="submit && validatePixelName">Postback name is required!</span>
            </vs-col>
        </vs-row>
        <!--        <vs-row vs-w="12" class="mt-3">-->
        <!--            <vs-col>-->
        <!--                <label for="Campaign">Select Campaign:</label>-->
        <!--                <v-select label="campaign_name" id="Campaign" :options="campaigns_list"-->
        <!--                          v-model="form_fields.campaign_id"-->
        <!--                          :reduce="camp => camp.id"/>-->
        <!--                <span class="info">Select network associated with the offer</span>-->
        <!--            </vs-col>-->
        <!--        </vs-row>-->
        <vs-row vs-w="12" v-for="(item, index) in form_fields.pixel_url" class="mb-3 mt-3">
            <vs-col vs-w="4">
                <vs-input class="w-full" label-placeholder="URL" v-model="item.url"/>
            </vs-col>
            <vs-col vs-w="4" class="mr-3 ml-3">
                <!--                <vs-input class="w-full" label-placeholder="Type" v-model="item.type"/>-->
                <vs-select v-model="item.type" class="w-full" label="Type">
                    <vs-select-item :value="1" :text="'Lead'" class="w-full"></vs-select-item>
                    <vs-select-item :value="2" :text="'FTD'" class="w-full"></vs-select-item>
                </vs-select>
            </vs-col>
            <vs-col vs-w="2">
                <vs-button @click="removePixelUrl(index)" class="mt-5" icon-pack="feather" icon="icon-minus-square" type="border"
                           color="dark" :disabled="form_fields.pixel_url.length <= 1"></vs-button>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12">
            <vs-col>
                <vs-button size="small" @click="addPixelUrl" color="dark" type="border"
                           :disabled="form_fields.pixel_url.length === 2">+ Add Url
                </vs-button>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-5">
            <vs-col>
                <vs-button @click="save" color="success" type="filled">Save</vs-button>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
    import axios from "../../../axios";
    import vSelect from "vue-select";

    export default {
        components: {
            'v-select': vSelect,
        },
        name: "AddNewPixel",
        data: () => {
            return {
                submit: false,
                campaigns_list: [],
                form_fields: {
                    pixel_name: '',
                    campaign_id: '',
                    pixel_url: [
                        {url: '', type: 1},
                    ],

                }
            }
        },
        methods: {
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
            save: function () {
                this.submit = true;
                if (this.validatePixelName) {
                    return
                }
                this.$vs.loading();
                axios.post('pixels/store', this.form_fields)
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
            removePixelUrl: function (index) {
                this.form_fields.pixel_url.splice(index, 1);
            },
            addPixelUrl: function () {
                this.form_fields.pixel_url.push({url: '', type: 2});
            },
        },
        computed: {
            validatePixelName() {
                return this.form_fields.pixel_name === '';
            },
        },
        beforeMount() {
            // this.getCampaigns();
        }
    }
</script>

<style scoped>

</style>