const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
			title : 'TAG',
			questionTags: [],
			eachTags: [],
			search_text:'',
			searchQuestions:[],
        }
    },

	created() {
		this.getSigleTag();
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

		getSigleTag(){
			axios.get(this.url + "TagAPI/getsingleTag")
			.then((result) => {
				result.data.eachTags;
				console.log(result.data.eachTags);
				this.eachTags = result.data.eachTags.slice();
				console.log(this.eachTags);
				this.getQuestionTag();
			}).catch((err) => {
				console.log(err);
			});
		},

		getQuestionTag(){
			axios.get(this.url + "TagAPI/getQuestionTag")
			.then((result) => {
				result.data.questionTags;
				console.log(result.data.questionTags);

				const response = result.data.questionTags.filter(({ tag_id }) => tag_id === this.eachTags[0].tag_id );

				this.questionTags = response.slice();
				console.log(this.questionTags);
			}).catch((err) => {
				console.log(err);
			});
		},

		eachQuestion(id){
			window.location.assign(this.url + "QuestionAPI/eachQuestion/" + id );
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
