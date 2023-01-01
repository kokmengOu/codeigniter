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
		$this->session->unset_userdata('question_id'); //unset everypage
		$this->session->unset_userdata('question_title'); // unset everypage
	}

	public function eachQuestion() // view page
	{
		$this->load->view('vieweachquestion');
		$data = array('question_id' => $this->uri->segment(3));
		$this->session->set_userdata( $data );
	}

	public function viewaddQuestion()
	{
		$this->load->view('addQuestion');
		
	}

	public function addQuestion()
	{

		$data  = array(
			'user_id' => $this->input->post('userID'), 
			'question_title' => $this->input->post('questionTitle'), 
			'question_content' => $this->input->post('questionContent'), 
			'question_published' => date('Y-m-d H:i:s'),
			'question_upvote' => 0, 
			'question_downvote' => 0, 
		);
		
		$response = $this->Question_model->addQuestion($data ,  $this->input->post('questionTitle'));
			$valueOne = $this->input->post('valueOne');
			if($valueOne != '' || $valueOne != null){
				$this->Question_model->addValueone($this->input->post('userID'), $valueOne , $response);
			}
			$valueTwo = $this->input->post('valueTwo');
			if($valueTwo != '' || $valueTwo != null){
				$this->Question_model->addValuetwo( $this->input->post('userID'), $valueTwo , $response);
			}
			$valueThree = $this->input->post('valueThree');
			if($valueThree != '' || $valueThree != null){
				$this->Question_model->addValuethree( $this->input->post('userID'), $valueThree , $response);
			}
			$valueFour = $this->input->post('valueFour');
			if($valueFour != '' || $valueFour != null){
				$this->Question_model->addValuefour( $this->input->post('userID'), $valueFour , $response);
			}
			$valueFive = $this->input->post('valueFive');
			if($valueFive != '' || $valueFive != null){
				$this->Question_model->addValuefive( $this->input->post('userID'), $valueFive , $response);
			}

		redirect('eachQuestion','refresh');
	}

	public function addAnswer()
	{
		$data = array(
			'user_id' => $this->session->userdata('id'), 
			'question_id' => $this->session->userdata('question_id'), 
			'answer_content'=> $this->input->post('answercontent'),
			'answer_timestamp' => date('Y-m-d H:i:s'),
			'answer_upvote' => 0,
			'answer_downvote' => 0,
		);
		$response = $this->Answer_model->addAnswer($data);
		redirect('eachQuestion','refresh');
	}

	public function addComment()
	{
		$data = array(

			'user_id' => $this->session->userdata('id'),
			'question_id' => $this->session->userdata('question_id'),
			'answer_id' => $this->input->post('answerId'),
			'comment_content' => $this->input->post('comment'),

		);
		$response = $this->Answer_model->addComment($data);
		redirect('eachQuestion','refresh');
	}

	public function addFavorite()
	{
		$data = array(
			'user_id' => $this->session->userdata('id'), 
			'question_id' => $this->uri->segment(3), 
		);

		$response = $this->Question_model->addFavorite($data);
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

	public function getQuestionTag(){
		$response["tags"] = $this->Tag_model->geteachQuestiontag();
		echo json_encode($response);
	}


	public function checkFavorite(){
		$response["checkFavorite"] = $this->Question_model->checkFavorite($this->session->userdata('question_id'));
		echo json_encode($response);
	}

	public function getSingleQuestion()
	{
		$response["eachQuestions"] = $this->Question_model->getsingleQuestion($this->session->userdata('question_id'));
		echo json_encode($response);
	}

	public function getQuestionUser() // you can use join 
	{
		$response["questionUser"] = $this->Question_model->getQuestionUser( $this->uri->segment(3) );
		echo json_encode($response);
	}

	public function getAnswer()
	{
		$response["answers"] = $this->Answer_model->getAnswer($this->session->userdata('question_id'));
		echo json_encode($response);
		redirect('ProfileAPI','refresh');
	}

	public function getComment()
	{
		$response["comments"] = $this->Answer_model->getComment($this->session->userdata('question_id'));
		echo json_encode($response);
	}

	
	public function deleteFavorite()
	{
		$data = array(
			'question_id' => $this->uri->segment(3), 
		);

		$response = $this->Question_model->deleteFavorite($data);
		redirect('eachQuestion','refresh');
	}

	public function deleteAnswer()
	{
		$url = $this->uri->segment(3); // answer id
		$response = $this->Answer_model->deleteAnswer($url);
	}

	public function deleteComment()
	{
		$url = $this->uri->segment(3); // comment id
		$response = $this->Answer_model->deleteComment($url);
	}

	public function viewSearch()
	{
		$this->load->view('viewSearch');
		$data = array('question_title' => urldecode( $this->uri->segment(3))); //https://www.php.net/manual/en/function.urldecode.php
		$this->session->set_userdata( $data );
	}

	public function seachQuestion()
	{ 

		$data = array(
			'question_title' => $this->session->userdata('question_title'), 
		);

		$response['searchQuestion'] = $this->Question_model->seachQuestion($data); // return data

		echo json_encode($response);
	}

}
