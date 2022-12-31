const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
			title : 'ADD TAG',
			isinputVisible : false,
			isreviewVisible : true,
			tags : [],
			isInvalid : '',
			text_title: '',
			text_content : '',
			value_one: '',
			value_two: '',
			value_three: '',
			value_four: '',
			value_five: '',
			search_text:'',
			searchQuestions:[],

        }
    },

	created() {
		this.getTag();
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

		sendForm(){
			if(this.text_title != '' || this.text_content != '')
			{
					this.isinputVisible = !this.isinputVisible;
					this.isreviewVisible = !this.isreviewVisible;
			}else{
				this.isInvalid = 'is-invalid';
			}
		},

		submitForm(id){
			console.log(id);
			const form = new FormData();
			form.append("userID", id);
			form.append("questionTitle" , this.text_title);
			form.append("questionContent", this.text_content);
			form.append("valueOne", this.value_one);
			form.append("valueTwo", this.value_two);
			form.append("valueThree", this.value_three);
			form.append("valueFour", this.value_four);
			form.append("valueFive", this.value_five);
			axios.post(this.url + "QuestionAPI/addQuestion" , form)
			.then((result) => {
				alert("You have been successfully Add Question")
				window.location.assign(this.url + "HomeAPI/index");
			}).catch((err) => {
				console.log(err);
			});
		},

		getTag(){
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
