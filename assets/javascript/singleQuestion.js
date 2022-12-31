const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
            title: 'Question',
			users: [],
			comments: [],
			answers:[],
			eachQuestions:[],
			answer_text : '',
            comment_text: '',
			search_text:'',
			searchQuestions:[],
        }
    },

	created() {
		this.showQuestion();
		this.getAnswer();
		this.getComment();
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

		showQuestion(){
			axios.get(this.url + "QuestionAPI/getSingleQuestion")
			.then((result) => {
				result.data.eachQuestions;
				console.log(result.data.eachQuestions);
				this.eachQuestions = result.data.eachQuestions.slice();
				console.log(this.eachQuestions);
				data = this.eachQuestions[0].user_id;
				this.getQuestionUser(data);
			}).catch((err) => {
				console.log(err);
			});
		},

		getAnswer(){
			axios.get(this.url + "QuestionAPI/getAnswer")
			.then((result) => {
				result.data.answers;
				console.log(result.data.answers);
				this.answers = result.data.answers.slice();
				console.log(this.answers);
			}).catch((err) => {
				console.log(err);
			});
		},

		getComment(){
			axios.get(this.url + "QuestionAPI/getComment")
			.then((result) => {
				result.data.comments;
				console.log(result.data.comments);
				this.comments = result.data.comments.slice();
				console.log(this.comments);
			}).catch((err) => {
				console.log(err);
			});
		},

		getQuestionUser(id){
			axios.get(this.url + "QuestionAPI/getQuestionUser/" + id)
			.then((result) => {
				result.data.questionUser;
				console.log(result.data.questionUser);
				this.users = result.data.questionUser.slice();
				console.log(this.users);
			}).catch((err) => {
				console.log(err);
			});
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

		answer_upvote(id , count){
			axios.post(this.url + "QuestionAPI/answerUpvote/" + id + "/" + count )
			.then((result) => {
				console.log(result);
			}).catch((err) => {
				console.log(err);
			});
		},

		answer_downvote(id , count){
			axios.post(this.url + "QuestionAPI/answerDownvote/" + id + "/" + count )
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
