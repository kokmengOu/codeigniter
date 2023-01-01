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
			tags:[],
			answer_text : '',
            comment_text: '',
			search_text:'',
			searchQuestions:[],
			favorite_isVisible : false,
			isInvalid : '',
			isInvalidComment:'',

        }
    },

	created() {
		this.showQuestion();
		this.getQuestionTag();
		this.getAnswer();
		this.getComment();
		this.getSearchQuestion();
		this.checkFavorite();
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

		getQuestionTag(){
			axios.get(this.url + "QuestionAPI/getQuestionTag")
			.then((result) => {
				result.data.tags;
				console.log(result.data.tags);

				const response = result.data.tags.filter(({ question_id }) => question_id === this.eachQuestions[0].question_id );

				this.tags = response.slice();
				console.log(this.tags);
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

		checkFavorite(){
			axios.get(this.url + "QuestionAPI/checkFavorite")
			.then((result) => {
				result.data.checkFavorite;
				console.log(result.data.checkFavorite);
				this.favorite_isVisible = result.data.checkFavorite.check;
			}).catch((err) => {
				console.log(err);
			});
		},

        Taggle_favorite(id){
			if (this.favorite_isVisible != true) { //favorite
				axios.post(this.url + "QuestionAPI/addFavorite/" + id  )
				.then((result) => {
					console.log(result);
					this.favorite_isVisible = true;
				}).catch((err) => {
					console.log(err);
				});
			} else { //not favorite
				axios.post(this.url + "QuestionAPI/deleteFavorite/" + id  )
				.then((result) => {
					console.log(result);
					this.favorite_isVisible = false;
				}).catch((err) => {
					console.log(err);
				});
			}

        },

		eachTag(id){
			window.location.assign(this.url + "TagAPI/vieweachTag/" + id )
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

		addComment(id){
			if (this.comment_text != '' && this.comment_text != null) {
				const form = new FormData();
				form.append("answerId", id);
				form.append("comment" , this.comment_text);
	
				axios.post(this.url + "QuestionAPI/addComment", form )
				.then((result) => {
					alert("comment Successfully add");
					window.location.assign(this.url + "QuestionAPI/eachQuestion/" + this.eachQuestions[0].question_id );
					console.log(result);
				}).catch((err) => {
					console.log(err);
				});
			}else{
				this.isInvalidComment = 'is-invalid';
			}
		},

		addAnswer(){
			if (this.answer_text != '' && this.answer_text != null)  {
				console.log(this.answer_text);
				const form = new FormData();
				form.append("answercontent", this.answer_text);
				axios.post(this.url + "QuestionAPI/addAnswer", form )
				.then((result) => {
					alert("Answer Successfully add");
					window.location.assign(this.url + "QuestionAPI/eachQuestion/" + this.eachQuestions[0].question_id );
					console.log(result);
				}).catch((err) => {
					console.log(err);
				});
			}else{
				this.isInvalid = 'is-invalid';
			}
		},

		deleteAnswer(id)
		{
			axios.post(this.url + "QuestionAPI/deleteAnswer/" + id)
			.then((result) => {
				alert("Answer Successfully delete");
				window.location.assign(this.url + "QuestionAPI/eachQuestion/" + this.eachQuestions[0].question_id );
			})
		},

		deleteComment(id)
		{
			axios.post(this.url + "QuestionAPI/deleteComment/" + id)
			.then((result) => {
				alert("Comment Successfully delete");
				window.location.assign(this.url + "QuestionAPI/eachQuestion/" + this.eachQuestions[0].question_id );
			})
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
