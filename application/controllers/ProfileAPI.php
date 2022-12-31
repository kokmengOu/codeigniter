<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/RestController.php';
use chriskacerguis\RestServer\RestController;

class ProfileAPI extends CI_Controller {
    
    public function __construct()
    {
		parent::__construct();
		if(!$this->session->userdata('id'))
		{
		 redirect('HomeAPI/index');
		}
		$this->load->model('Profile_model');


    }

	public function index()
	{
		$this->load->view('UserProfileView');
	}

	public function getProfileDetail()
	{
		$response["Userdetails"] = $this->Profile_model->getUserDetail($this->session->userdata('id'));
		echo json_encode($response);
	}

	public function getQuestion()
	{
		$response["questions"] = $this->Profile_model->getUserQuestion($this->session->userdata('id'));
		echo json_encode($response);

	}

	public function getTag()
	{
		$response["tags"] = $this->Profile_model->getUserTag($this->session->userdata('id'));
		echo json_encode($response);
	}

	public function updateDescription()
	{
		$data = array(
			'user_description' => $this->input->post('description'),
		);

		$response = $this->Profile_model->updateDescription( $this->session->userdata('id') , $data);
		echo json_encode($response);
		
		redirect('ProfileAPI','refresh');
		
	}

	public function updateBio()
	{
		$data = array(
			'user_bio' => $this->input->post('bio'),
		);
		$response = $this->Profile_model->updateBio( $this->session->userdata('id') , $data);
		redirect('ProfileAPI','refresh');
		
	}

	public function deleteQuestion()
	{
		$url = $this->uri->segment(3);
		$response = $this->Profile_model->deleteQuestion($url);
		redirect('ProfileAPI','refresh');
	}

	public function deleteTag()
	{
		$url = $this->uri->segment(3);
		$response = $this->Profile_model->deleteTag($url);
		redirect('ProfileAPI','refresh');
		
	}

}
