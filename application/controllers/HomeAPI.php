<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class HomeAPI extends CI_Controller {
    
    public function __construct()
    {
		parent::__construct();
        $this->load->model('Question_model');
		$this->load->model('Tag_model');
    }

	public function index()
	{
		$this->load->view('homeView');
	}

	public function logout()
	{
		$data = $this->session->all_userdata();
		foreach($data as $row => $rows_value)
		{
		 $this->session->unset_userdata($row);
		}
		$this->session->sess_destroy();
		redirect('UserAPI');
	}

	public function getQuestion(){
		$response["questions"] = $this->Question_model->getQuestion();
		echo json_encode($response);
	}

	public function getQuestionTag()
	{		
		$modelCode = $this->uri->segment(3);
		
		$response["questionTags"] = $this->Question_model->getQuestionTag($modelCode);
		echo json_encode($response);
	}

	public function getTag()
	{

		$response["tags"] = $this->Tag_model->getTag();
		echo json_encode($response);
	}

	public function upvote()
	{
		$id = $this->uri->segment(3);
		$count = $this->uri->segment(4);
		$this->Question_model->upvote($id,$count);
	}

	public function downvote()
	{
		$id = $this->uri->segment(3);
		$count = $this->uri->segment(4);
		$this->Question_model->downvote($id,$count);
	}

}
