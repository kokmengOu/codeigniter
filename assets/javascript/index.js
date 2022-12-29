const { createApp } = Vue

const app = createApp({
    data() {
        return {
            url: "https://w1790671.users.ecs.westminster.ac.uk/demo/index.php/",
            user_name: 'MENG',
            title: 'MEnG',
            upvote_isVisible: true,
            down_isVisible: true,
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

            tags :[
                { 
                    tag_id : '1',
                    tag_title: 'HONEY_1',
                }, 
                { 
                    tag_id : '2',
                    tag_title: 'HONEY_2',
                }, 
                { 
                    tag_id : '3',
                    tag_title: 'HONEY_3',
                },
                { 
                    tag_id : '4',
                    tag_title: 'HONEY_4',
                },  
                { 
                    tag_id : '5',
                    tag_title: 'HONEY_5',
                }, 
                { 
                    tag_id : '6',
                    tag_title: 'HONEY_6',
                }],
            
        }
    },

	created() {
		this.showQuestion();
		this.showQuestionTag();
	},

    methods: {

		showQuestion(){
			axios.get(this.url + "HomeAPI/getQuestion")
			.then((result) => {
				result.data.questions;
				console.log(result.data.questions);
			}).catch((err) => {
				console.log(err);
			});
		},

		showQuestionTag(){
			axios.get(this.url + "HomeAPI/getQuestionTag")
			.then((result) => {
				result.data.questionTag;
				console.log(result.data.questionTag);
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
