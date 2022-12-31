const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
            title: 'Question',
			Eachusers:[],
			questions:[],
			tags:[],
			search_text: '',
            
        }
    },

	created() {
		this.showerEachUser();

	},

    methods: {

		showerEachUser(){
			axios.get(this.url + "OtheruserAPI/getEachUser")
			.then((result) => {
				result.data.Eachusers;
				console.log(result.data.Eachusers);
			}).catch((err) => {
				console.log(err);
			});
		},

		onEnter(){
			axios.post(this.url + "QuestionAPI/viewSearch/" + this.search_text  )
			.then((result) => {
				console.log(result);
			}).catch((err) => {
				console.log(err);
			});
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
