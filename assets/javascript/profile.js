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
		}
    },

	created() {
		this.showUserQuestion();
		this.showUserTag();
		this.showUserfavorite();
		this.showUserDetail();
	},

    methods: {

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

		updateDescription(){
			axois.post(this.url + "ProfileAPI/updateDescription")
			.then((result) => {
				alert("Description Successfully Updated")
			}).catch((err) => {
				alert("error 404");
				console.log(err);
			});
		},

		updateBio(){
			axois.post(this.url + "ProfileAPI/updateBio")
			.then((result) => {
				alert("Description Successfully Updated")
			}).catch((err) => {
				alert("error 404");
				console.log(err);
			});
		},

		deleteQuestion(id)
		{
			console.log(id);
		},

		deletetag(id)
		{

		},

		sendFormDescription(){
			if(this.Description_text == '')
			{
                this.is_invalid_Description = 'is-invalid';
			}else{
                this.is_invalid_Description = '';
			}
		},

        sendFormBio(){
			if(this.bio_text == '')
			{
                this.is_invalid_bio = 'is-invalid';
			}else{
                this.is_invalid_bio = '';
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
        }



    },

})
app.mount('#app')
