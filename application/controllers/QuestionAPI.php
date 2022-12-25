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
		$this->load->view('question');
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
	}

	public function addDownvote()
	{
	}

	public function getQuestion()
	{
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
