<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/RestController.php';
use chriskacerguis\RestServer\RestController;

class QuestionAPI extends CI_Controller {
    
    public function __construct()
    {
		parent::__construct();
        $this->load->model('Question_model');
		$this->load->model('Tag_model');
		$this->load->model('Answer_model');
		$this->load->model('Profile_model');
		
    }

	public function index()
	{
		$this->load->view('listquestion');
		$this->session->unset_userdata('question_id');
	}

	public function eachQuestion() // view page
	{
		$this->load->view('eachQuestion');
		$data = array('tag_id' => $this->uri->segment(3));
		$this->session->set_userdata( $data );
	}

	public function addQuestion()
	{
		
	}

	public function addAnswer()
	{
		$data = array(
			'user_id' => $this->input->post('userid'), 
			'question_id' => $this->input->post('questionid'), 
			'answer_id'=> $this->input->post('answerid'),
			'comment_content'=> $this->input->post('commentcontent'),
			'answer_timestamp' => date('Y-m-d H:i:s'),
		);
		$response = $this->Profile_model->updateBio( $this->session->userdata('id') , $data);
		redirect('eachQuestion','refresh');
	}

	public function addComment()
	{
		$data = array(
			'user_id' => $this->input->post('userid'), 
			'question_id' => $this->input->post('questionid'), 
			'answer_id'=> $this->input->post('answerid'),
			'comment_content'=> $this->input->post('commentcontent'),
		);
		$response = $this->Answer_model->addComment( $this->session->userdata('id') , $data);
		redirect('eachQuestion','refresh');
	}

	public function addFavorite()
	{
		$data = array(
			'user_id' => $this->input->post('userid'), 
			'question_id' => $this->input->post('questionid'), 
		);

		$response = $this->Profile_model->updateBio( $this->session->userdata('id') , $data);
		redirect('eachQuestion','refresh');
	}

	public function addUpvote()
	{
		$id = $this->uri->segment(3);
		$count = $this->uri->segment(4);
		$this->Question_model->upvote($id,$count);
	}

	public function addDownvote()
	{
		$id = $this->uri->segment(3);
		$count = $this->uri->segment(4);
		$this->Question_model->downvote($id,$count);
	}

	public function answerUpvote()
	{
		$id = $this->uri->segment(3);
		$count = $this->uri->segment(4);
		$this->Answer_model->upvote($id,$count);
	}

	public function answerDownvote()
	{
		$id = $this->uri->segment(3);
		$count = $this->uri->segment(4);
		$this->Answer_model->downvote($id,$count);
	}

	public function getQuestion(){
		$response["questions"] = $this->Question_model->getQuestion();
		echo json_encode($response);
	}

	public function getSingleQuestion()
	{
		$response["eachQuestions"] = $this->Question_model->getsingleQuestion($this->session->userdata('question_id'));
		echo json_encode($response);
	}

	public function getAnswer()
	{
		$url = $this->uri->segment(3); // question_id
		$response["answers"] = $this->Answer_model->getAnswer($url);
		echo json_encode($response);
		redirect('ProfileAPI','refresh');
	}

	public function getComment()
	{
		$answer = $this->uri->segment(3);
		$response["comments"] = $this->Answer_model->getComment($answer);
		echo json_encode($response);
	}

	public function deleteAnswer()
	{
		$url = $this->uri->segment(3); // question id
		$response = $this->Answer_model->deleteAnswer($url);
		redirect('ProfileAPI','refresh');
	}

	public function deleteComment()
	{
		$url = $this->uri->segment(3); // answer id
		$response = $this->Answer_model->deleteComment($url);
		redirect('ProfileAPI','refresh');
	}

}
