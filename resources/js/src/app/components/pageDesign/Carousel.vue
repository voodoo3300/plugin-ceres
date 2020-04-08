<template>
    <div class="row" ref="observer">
        <div class="col-12 col-lg-12" v-if="itemCount > itemsPerPage">
            <div class="list-item-carousel owl-carousel owl-theme owl-single-item" ref="carouselContainer">
                <slot-component v-for="(item, index) in $slots.items" :key="index" :vnode="item" />
            </div>
        </div>

        <div :class="columnWidths" v-else v-for="item in $slots.items">
            <slot-component :vnode="item"/>
        </div>
    </div>
</template>

<script>
import "owl.carousel";

export default {
    components: {
        SlotComponent: {
            functional: true,
            render: (createElement, context) => context.data.attrs.vnode
        }
    },

    props: {
        itemsPerPage: {
            type: Number,
            default: 4
        }
    },

    data() {
        return {
            itemCount: 0,
            init: false
        }
    },

    computed:
    {
        columnWidths()
        {
            const itemsPerPage = Math.min(Math.max(this.itemsPerPage, 1), 4);

            return [
                "col-12",
                itemsPerPage === 1 ? "col-sm-12" : "col-sm-6",
                "col-md-" + (12 / itemsPerPage)
            ];
        }
    },

    // watch:
    // {
    //     itemCount()
    //     {
    //         console.log("watched");
    //         this.initializeCarousel();
    //     }
    // },

    created()
    {
        
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            // if (this.itemCount > this.itemsPerPage)
            // {
            //     this.initializeCarousel();
            // }

            // this.observer = new MutationObserver(mutation => {
            //     if (this.$slots.items && this.$slots.items.length !== this.itemCount)
            //     {
            //         this.itemCount = this.$slots.items.length;
            //         this.initializeCarousel();
            //     }
            // });

            // this.observer.observe(this.$refs.observer, { attributes: true, childList: true, characterData: true, subtree: true });
        });
    },

    beforeUpdate()
    {
        this.itemCount = this.$slots.items ? this.$slots.items.length : 0;
        console.log("beforeUpdate slot: ", this.itemCount);
    },

    updated()
    {
        // this.initializeCarousel();
        console.log("updated");
        setTimeout(() => this.initializeCarousel());
    },

    methods:
    {
        initializeCarousel()
        {
            if (this.itemCount > this.itemsPerPage && !this.init)
            {
                console.log("init");
                this.init = true;
                $(this.$refs.carouselContainer).owlCarousel({
                    autoHeight: true,
                    dots: true,
                    items: this.itemsPerPage,
                    responsive: {
                        0: {
                            items: 1
                        },
                        576: {
                            items: this.itemsPerPage > 1 ? 2 : 1
                        },
                        768: {
                            items: this.itemsPerPage > 3 ? 3 : this.itemsPerPage
                        },
                        992: {
                            items: this.itemsPerPage
                        }
                    },
                    lazyLoad: false,
                    loop: false,
                    margin: 30,
                    mouseDrag: true,
                    nav: true,
                    navClass: [
                        "owl-single-item-nav left carousel-control list-control-special",
                        "owl-single-item-nav right carousel-control list-control-special"
                    ],
                    navContainerClass: "",
                    navText: [
                        "<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>",
                        "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"
                    ],
                    smartSpeed: 350
                });
            }
        }
    }
}

</script>
