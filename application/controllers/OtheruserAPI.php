<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class OtheruserAPI extends CI_Controller {
    
    public function __construct()
    {
		parent::__construct();
        $this->load->model('FindOtherUser_model');
    }

	public function index()
	{
		$this->load->view('otheruser');
	}


	public function getOtherUser(){
		$response["users"] = $this->FindOtherUser_model->getOtherUser();
		echo json_encode($response);
	}


	public function getEachUser()
	{
		$id = $this->uri->segment(3);
		$response['Eachusers'] = $this->FindOtherUser_model->eachUser($id);
		echo json_encode($response);

	}

	public function getEachUserTag()
	{
		$id = $this->uri->segment(3);
		$tag['tags'] = $this->FindOtherUser_model->eachUsertag($id);
		echo json_encode($tag);
	}

	public function getEachUserQuestion()
	{
		$id = $this->uri->segment(3);
		$question['questions'] = $this->FindOtherUser_model->eachUserquestion($id);
		echo json_encode($question);
	}

	public function showEachUser()
	{
		$this->getEachUser();
		$this->getEachUserQuestion();
		$this->getEachUserTag();
		$this->load->view('eachUser');
	}



}
