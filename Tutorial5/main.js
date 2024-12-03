Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">

        <div class="product-image">
        <img :src="image" />
        </div>

        <div class="product-info">
            <h1>{{ product }}</h1>
            <h2>PhamHuuAnhVu-001324668</h2>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>

            <ul>
            <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div class="color-box"
                v-for="(variant, index) in variants" 
                :key="variant.variantId"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)"
                >
            </div> 

            <button v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >
            Add to cart
            </button>

        </div> 

        <div>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul v-else>
                <li v-for="(review, index) in reviews" :key="index">
                    <p>{{ review.name }}</p>
                    <p>Rating:{{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>
        
        <product-review @review-submitted="addReview"></product-review>
    
    </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0
                }
            ],
            reviews: []
        }
    },
    methods: {
        // Emit an event to add the selected variant to the cart
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        // Update the selected variant based on mouseover
        updateProduct(index) {
            this.selectedVariant = index
        },
        // Add a new review to the reviews array
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        // Compute the full title of the product
        title() {
            return this.brand + ' ' + this.product
        },
        // Get the image of the selected variant
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        // Check if the selected variant is in stock
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        // Compute the shipping cost based on the premium status
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    
        <p class="error" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
        </p>

        <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
        </p>
        
        <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        </p>

        <p>Would you recommend this product?</p>
        <label>
        Yes
        <input type="radio" value="Yes" v-model="recommend"/>
        </label>
        <label>
        No
        <input type="radio" value="No" v-model="recommend"/>
        </label>
            
        <p>
        <input type="submit" value="Submit">  
        </p>    
    
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        // Handle form submission
        onSubmit() {
            this.errors = []
            // Validate form fields
            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                // Emit an event with the new review
                this.$emit('review-submitted', productReview)
                // Reset form fields
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                // Add error messages for missing fields
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.recommend) this.errors.push("Recommendation required.")
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        // Update the cart with the new product ID
        updateCart(id) {
            this.cart.push(id)
        }
    }
})