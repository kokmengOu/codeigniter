const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
            title: 'Question',
            users :[],
			Eachusers:[],
			questions:[],
			tags:[],

			isVisibleEachUser : false,
            EditisVisibleEachUser: true,
        }
    },

	created() {
		this.showOtherUser();
	},

    methods: {

		showOtherUser(){
			axios.get(this.url + "OtheruserAPI/getOtherUser")
			.then((result) => {
				result.data.users;
				console.log(result.data.users);
				this.users = result.data.users.slice();
				console.log(this.users.user_id == result.data.users.user_id);
			}).catch((err) => {
				console.log(err);
			});
		},

		eachUser(id){
			//window.location.assign(this.url + "OtheruserAPI/showEachUser" )
			this.isVisibleEachUser = !this.isVisibleEachUser;
            this.EditisVisibleEachUser=  !this.EditisVisibleEachUser;
			this.showeachUser(id);
			this.eachUserTag(id);
			this.eachUserQuestion(id);
		},

		closeBio(){
			this.Eachusers=[],
			this.questions=[],
			this.tags=[],
            this.isVisibleEachUser = !this.isVisibleEachUser;
            this.EditisVisibleEachUser=  !this.EditisVisibleEachUser;
        },

		showeachUser(id){
			axios.get(this.url + "OtheruserAPI/getEachUser/" + id  )
			.then((result) => {
				result.data.Eachusers;
				console.log(result.data.Eachusers);
				this.Eachusers = result.data.Eachusers.slice();
				console.log(this.Eachusers.user_id == result.data.Eachusers.user_id);
			}).catch((err) => {
				console.log(err);
			});
		},

		eachUserQuestion(id){
			axios.get(this.url + "OtheruserAPI/getEachUserQuestion/" + id  )
			.then((result) => {
				result.data.questions;
				console.log(result.data.questions);
				this.questions = result.data.questions.slice();
				console.log(this.questions.question_id == result.data.questions.question_id);
			}).catch((err) => {
				console.log(err);
			});
		},

		eachUserTag(id){
			axios.get(this.url + "OtheruserAPI/getEachUserTag/" + id  )
			.then((result) => {
				result.data.tags;
				console.log(result.data.tags);
				this.tags = result.data.tags.slice();
				console.log(this.tags.tag_id == result.data.tags.tag_id);
			}).catch((err) => {
				console.log(err);
			});
		},


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
