const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
            title: 'Tag',
            tags :[],
            
        }
    },

	created() {
		this.showTag();
	},

    methods: {

		showTag(){
			axios.get(this.url + "TagAPI/getTag")
			.then((result) => {
				result.data.tags;
				console.log(result.data.tags);
				this.tags = result.data.tags.slice();
				console.log(this.tags);
			}).catch((err) => {
				console.log(err);
			});
		},

		eachTag(id){
			console.log(id);
		}

    },
})

app.mount('#app')
document.querySelector('.searchbox [type="reset"]').addEventListener('click', function() {  this.parentNode.querySelector('input').focus();});
anime({
    targets: '#QandA path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function(el, i) { return i * 150 },
    direction: 'alternate',
    loop: true
});
