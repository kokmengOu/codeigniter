const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
			title : 'ADD TAG',
			isinputVisible : false,
			isreviewVisible : true,
			isInvalid : '',
			text_title: '',
			text_content : '',
			search_text:'',
			searchQuestions:[],

        }
    },

	created() {
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
			form.append("tagTitle" , this.text_title);
			form.append("tagContent", this.text_content);
			axios.post(this.url + "TagAPI/AddTag" , form)
			.then((result) => {
				alert("You have been successfully")
				window.location.assign(this.url + "HomeAPI/index");
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
