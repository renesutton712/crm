<template>
    <div>
        <vs-row vs-w="12">
            <vs-col>
                <vs-input class="w-full" label-placeholder="Pixel Name" v-model="form_fields.pixel_name"/>
                <span class="error" v-if="submit && validatePixelName">Pixel name is required!</span>
            </vs-col>
        </vs-row>
        <vs-row vs-w="12" class="mt-4">
            <vs-col>
                <vs-textarea label="Pixel Content" v-model="form_fields.pixel_content" height="400px"></vs-textarea>
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

    export default {
        name: "AddNewIframePixel",
        props: ['p_id'],
        data: () => {
            return {
                submit: false,
                form_fields: {
                    pixel_id: 0,
                    pixel_name: '',
                    pixel_content: '',
                }
            }
        },
        methods: {
            save: function () {
                this.$vs.loading();
                this.form_fields.pixel_id = this.p_id == undefined ? 0 : this.p_id;
                axios.post('iframe/store', this.form_fields)
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
            getIframeContent: function () {
                this.$vs.loading();
                axios.get('iframe/get/' + this.p_id)
                    .then((response) => {
                        this.form_fields.pixel_id = response.data.id;
                        this.form_fields.pixel_name = response.data.iframe_name;
                        this.form_fields.pixel_content = response.data.iframe_content;
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
        computed: {
            validatePixelName() {
                return this.form_fields.network_name === '';
            },
        },
        beforeMount() {
            if (this.p_id !== null) {
                this.getIframeContent();
            }
        },
        destroyed() {
            this.$emit('destroyPID');
        }
    }
</script>

<style scoped>

</style>