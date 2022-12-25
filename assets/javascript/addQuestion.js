const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/w1790671/index.php/",
            Title_message : null,
			Content_message : null,
            is_disable : false,
			class_name : '',
			dynamic_class : true,
            title : 'title',
            content : 'content',
            question: {
                title: null,
                content : null,
            },
			tag :{

			},
			img : {

			},
        }
    },

    methods: {

        checkTitle(){
			if(this.question.title.length > 2 )
			{
				this.dynamic_class = true;
				this.Title_message = 'Plea';
				this.is_disable = false;
				this.class_name = 'success'
				return true;
			}
			else{
				this.dynamic_class = true;
				this.Content_message = 'This email is already registered';
				this.is_disable = true;
				this.class_name = 'danger';
				return false;
			}
        },

		checkContent(){
			if(this.question.title.length > 2 )
			{
				this.dynamic_class = true;
				this.Content_message = 'Plea';
				this.is_disable = false;
				this.class_name = 'success'
				return true;
			}
			else{
				this.dynamic_class = true;
				this.message = 'This email is already registered';
				this.is_disable = true;
				this.class_name = 'danger';
				return false;
			}
		},

		AddQuestion(){
			if (this.checkTitle() == true && this.checkContent() == true ) {
				this.dynamic_class = true;
				this.message = 'Plea';
				this.is_disable = false;
				this.class_name = 'success'

				const form = new FormData();
				form.append("title" , this.question.title);
				form.append("content", this.question.content);
				axios.post(this.url + "AddAPI/Add_question", form)
				.then((result) => {
					if(result.data.AddQuestion != "NO"){
						console.log(result.data.is_available);
					}
				}).catch((err) => {
					console.error(err);
				});

			} else {
				this.dynamic_class = true;
				this.message = 'This email is already registered';
				this.is_disable = true;
				this.class_name = 'danger';
			}
		}
    },

})
app.mount('#app')
