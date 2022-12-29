<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class HomeAPI extends CI_Controller {
    
    public function __construct()
    {
		parent::__construct();
        $this->load->model('Question_model');
		$this->load->model('Tag_model');



		if(!$this->session->userdata('id')){
			redirect('UserAPI/index');
		}
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
		redirect('UserAPI');
	}

	public function getQuestion(){
		$response["questions"] = $this->Question_model->getQuestion();
		echo json_encode($response);
	}

	public function getQuestionTag()
	{
		$response["questionTag"] = $this->Question_model->getQuestionTag();
		echo json_encode($response);
	}



}
