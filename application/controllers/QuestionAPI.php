<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/RestController.php';
use chriskacerguis\RestServer\RestController;

class QuestionAPI extends CI_Controller {
    
    public function __construct()
    {
		parent::__construct();
        $this->load->model('Question_model');
    }

	public function index()
	{
		$this->load->view('listquestion');
	}

	public function addQuestion()
	{
		
	}

	public function addAnswer()
	{
	}

	public function addComment()
	{
	}

	public function addFavorite()
	{
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

	public function getQuestion()
	{
		$response["questions"] = $this->Question_model->getQuestion();
		echo json_encode($response);
	}

	public function getanswer()
	{
	}

	public function NoAnswer()
	{
	}

	public function getComment()
	{
	}

		public function getFavorite()
		{
		}

	public function deleteQuestion()
	{
	}

	public function deleteAnswer()
	{
	}

	public function deleteComment()
	{
	}

}
