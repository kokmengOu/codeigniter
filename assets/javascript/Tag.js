const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
            title: 'Tag',
            tags :[],
			questionTags: [],
			eachTags: [],
			search_text:[],
			searchQuestions : [],
        }
    },

	created() {
		this.showTag();
		this.getSearchQuestion();
	},

    methods: {

		
		getSearchQuestion(){
			axios.get(this.url + "QuestionAPI/getQuestion")
			.then((result) => {
				result.data.questions;
				console.log(result.data.questions);
				this.searchQuestions = result.data.questions.slice();
				console.log(this.searchQuestions.question_id == result.data.questions.question_id);
			}).catch((err) => {
				console.log(err);
			});
		},

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
			window.location.assign(this.url + "TagAPI/vieweachTag/" + id )
		},

		onEnter(){
			axios.post(this.url + "QuestionAPI/viewSearch/" + this.search_text  )
			.then((result) => {
				console.log(result);
				window.location.assign(this.url + "QuestionAPI/viewSearch/" + this.search_text);
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
