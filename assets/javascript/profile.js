const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
			title: 'PROFILE',
			questions: [],
			tags: [],
			favorite: [],
			Userdetails: [],
			isVisibleEditOne : false,
            EditOneDanger: true,
			isVisibleEdittwo : false,
            EditTwoDanger: true,
            Description_text : '',
            bio_text: '',
            is_invalid_Description : '',
            is_invalid_bio : '',
			search_text:'',
			searchQuestions: [],
		}
    },

	created() {
		this.showUserQuestion();
		this.showUserTag();
		this.showUserfavorite();
		this.showUserDetail();
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

		showUserDetail(){
			axios.get(this.url + "ProfileAPI/getProfileDetail")
			.then((result) => {
				result.data.Userdetails;
				this.Userdetails = result.data.Userdetails.slice();
			}).catch((err) => {
				console.log(err);
			});
		},

		showUserQuestion(){
			axios.get(this.url + "ProfileAPI/getQuestion")
			.then((result) => {
				result.data.questions;
				console.log(result.data.questions);
				this.questions = result.data.questions.slice();
				console.log(this.questions.question_id == result.data.questions.question_id);
			}).catch((err) => {
				console.log(err);
			});
		},

		showUserTag(){
			axios.get(this.url + "ProfileAPI/getTag")
			.then((result) => {
				result.data.tags;
				this.tags = result.data.tags.slice();
			}).catch((err) => {
				console.log(err);
			});
		},

		showUserfavorite(){
			axios.get(this.url + "ProfileAPI/getFavorite")
			.then((result) => {
				result.data.favorites;
				this.favorite = result.data.favorites.slice();
			}).catch((err) => {
				console.log(err);
			});
		},

		deleteQuestion(id)
		{
			axios.post(this.url + "ProfileAPI/deleteQuestion/" + id)
			.then((result) => {
				alert("Question Successfully delete");
				window.location.assign(this.url + "ProfileAPI/index");
			})
		},

		deletetag(id)
		{
			axios.post(this.url + "ProfileAPI/deleteTag", +id)
			.then((result) => {
				alert("Tag Successfully delete");
				window.location.assign(this.url + "ProfileAPI/index");
			})
		},

		sendFormDescription(){
			if(this.Description_text == '')
			{
                this.is_invalid_Description = 'is-invalid';
			}else{
				console.log(this.Description_text);
				const form = new FormData();
				form.append('description', this.Description_text);
				axios.post(this.url + "ProfileAPI/updateDescription", form)
				.then((result) => {
					alert("description Successfully Updated");
					window.location.assign(this.url + "ProfileAPI/index");
				})
			}
		},

        sendFormBio(){
			if(this.bio_text == '')
			{
                this.is_invalid_bio = 'is-invalid';
			}else{
				const form = new FormData();
				form.append('bio', this.bio_text);
				axios.post(this.url + "ProfileAPI/updateBio", form)
				.then((result) => {
					alert("Bio Successfully Updated");
					window.location.assign(this.url + "ProfileAPI/index");
				})
			}
		},

        editerDescription(){
            this.isVisibleEditOne = !this.isVisibleEditOne;
            this.EditOneDanger=  !this.EditOneDanger;
        },

        editerBio(){
            this.isVisibleEdittwo = !this.isVisibleEdittwo;
            this.EditTwoDanger=  !this.EditTwoDanger;
        },

        closeDescription(){
            this.Description_text='';
            this.isVisibleEditOne = !this.isVisibleEditOne;
            this.EditOneDanger=  !this.EditOneDanger;
        },

        closeBio(){
            this.bio_text='';
            this.isVisibleEdittwo = !this.isVisibleEdittwo;
            this.EditTwoDanger=  !this.EditTwoDanger;
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
