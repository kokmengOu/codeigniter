<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/RestController.php';
use chriskacerguis\RestServer\RestController;

class QuestionAPI extends CI_Controller {
    
    public function __construct()
    {
		parent::__construct();
		$this->load->model('Profile_model');

		if (!isset($_SESSION['loggin_in'])) {
			
			redirect('UserAPI/index','refresh');
		}
    }

	public function index()
	{
		$this->load->view('UserProfileView');
	}

	public function getProfileDetail()
	{
		$response["questions"] = $this->Question_model->getUserDetail($this->session->userdata('id'));
		echo json_encode($response);
	}

	public function getQuestion()
	{
		$response["questions"] = $this->Question_model->getUserQuestion($this->session->userdata('id'));
		echo json_encode($response);

	}

	public function getFavorite()
	{

	}

	public function getTag()
	{
		$response["tags"] = $this->Question_model->getUserTag($this->session->userdata('id'));
		echo json_encode($response);
	}

}
