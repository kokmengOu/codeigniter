const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
			title : 'TAG',
			questionTags: [],
			eachTags: [],
			search_text:'',
        }
    },

	created() {
		this.getSigleTag();
	},

    methods: {

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
