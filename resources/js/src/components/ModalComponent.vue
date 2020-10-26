<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal"
                 role="dialog"
                 aria-labelledby="modalTitle"
                 aria-describedby="modalDescription">
                <header class="modal-header" id="modalTitle">
                    <slot name="header">
                        This is the default tile!
                        <button type="button" class="btn-close" @click="close" aria-label="Close modal">
                            x
                        </button>
                    </slot>
                </header>
                <section class="modal-body" id="modalDescription">
                    <slot name="body">
                        I'm the default body!
                    </slot>
                </section>
                <footer class="modal-footer">
                    <slot name="footer">
                        <vs-button color="danger" type="filled" @click="close" aria-label="Close modal">
                            Close
                        </vs-button>
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "modal",
        methods: {
            close() {
                this.$emit('close');
            },
        },
    }
</script>

<style scoped>
    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
    }

    .modal {
        max-width: 950px;
        width: 100%;
        height: 800px;
        background: #FFFFFF;
        /*border: 1px solid #5048a8;*/
        border-radius: 5px;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        left: unset;
        top: 1%;
    }

    .modal-header,
    .modal-footer {
        padding: 15px;
        display: flex;
    }

    .modal-header {
        border-bottom: 1px solid #eeeeee;
        color: #4AAE9B;
        justify-content: space-between;
    }

    .modal-footer {
        border-top: 1px solid #eeeeee;
        justify-content: flex-end;
    }

    .modal-body {
        position: relative;
        padding: 20px 10px;
        /*max-height: 500px;*/
        /*height: 500px;*/
        max-height: 850px;
        height: 850px;
        overflow-y: auto;
    }

    .btn-close {
        border: none;
        font-size: 20px;
        padding: 20px;
        cursor: pointer;
        font-weight: bold;
        color: #4AAE9B;
        background: transparent;
    }

    .btn-green {
        color: white;
        background: #4AAE9B;
        border: 1px solid #4AAE9B;
        border-radius: 2px;
    }

    .modal-fade-enter,
    .modal-fade-leave-active {
        opacity: 0;
    }

    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity .5s ease
    }
</style>
