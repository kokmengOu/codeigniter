const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
            user_name: 'MENG',
            title: 'MEnG',
            upvote_isVisible: true,
            down_isVisible: true,
			questions:[],
			questionTags:[],
            menus: [
                { 
                    message: 'HOME',
                }, 
                { 
                    message: 'QUESTION',
                }, 
                { 
                    message: 'ANSWERS',
                },
                { 
                    message: 'NONE ANSWER',
                },  
                { 
                    message: 'TAGS',
                }, 
                { 
                    message: 'USERS',
                }],

            tags :[],
			search_text:'',
			searchQuestions:[],
            
        }
    },

	created() {
		this.showQuestion();
		this.showQuestionTag();
		this.showTag();
		this.getSearchQuestion();
	},

    methods: {

		
		getSearchQuestion(){
			axios.get(this.url + "QuestionAPI/getQuestion")
			.then((result) => {
				result.data.searchQuestion;
				console.log(result.data.searchQuestion);
				this.searchQuestions = result.data.searchQuestion.slice();
				console.log(this.searchQuestions.question_id == result.data.searchQuestion.question_id);
			}).catch((err) => {
				console.log(err);
			});
		},

		showQuestion(){
			axios.get(this.url + "HomeAPI/getQuestion")
			.then((result) => {
				result.data.questions;
				console.log(result.data.questions);
				this.questions = result.data.questions.slice();
				console.log(this.questions.question_id == result.data.questions.question_id);
			}).catch((err) => {
				console.log(err);
			});
		},

		showQuestionTag(){
			axios.get(this.url + "HomeAPI/getQuestionTag")
			.then((result) => {
				result.data.questionTags;
				this.questionTags = result.data.questionTags.slice();
				console.log(result.data.questionTags);
			}).catch((err) => {
				console.log(err);
			});
		},


		showTag(){
			axios.get(this.url + "HomeAPI/getTag")
			.then((result) => {
				result.data.tags;
				console.log(result.data.tags);
				this.tags = result.data.tags.slice();
				console.log(this.tags);
			}).catch((err) => {
				console.log(err);
			});
		},

		Taggle_upvote(id , count){
			axios.post(this.url + "HomeAPI/upvote/" + id + "/" + count )
			.then((result) => {
				console.log(result);
			}).catch((err) => {
				console.log(err);
			});
		},

		Taggle_downvote(id , count){
			axios.post(this.url + "HomeAPI/downvote/" + id + "/" + count )
			.then((result) => {
				console.log(result);
			}).catch((err) => {
				console.log(err);
			});
		},

		eachQuestion(id){
			window.location.assign(this.url + "QuestionAPI/eachQuestion/" + id );
		},

		eachTag(id){
			window.location.assign(this.url + "TagAPI/vieweachTag/" + id )
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
