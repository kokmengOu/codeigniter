const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
            title: 'Question',
            questions :[],
            
        }
    },

	created() {
		this.showQuestion();
	},

    methods: {

		showQuestion(){
			axios.get(this.url + "QuestionAPI/getQuestion")
			.then((result) => {
				result.data.questions;
				console.log(result.data.questions);
				this.questions = result.data.questions.slice();
				console.log(this.questions.question_id == result.data.questions.question_id);
			}).catch((err) => {
				console.log(err);
			});
		},

		eachTag(id){
			console.log(id);
		},

		Taggle_upvote(id , count){
			axios.post(this.url + "QuestionAPI/addUpvote/" + id + "/" + count )
			.then((result) => {
				console.log(result);
			}).catch((err) => {
				console.log(err);
			});
		},

		Taggle_downvote(id , count){
			axios.post(this.url + "QuestionAPI/addDownvote/" + id + "/" + count )
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
