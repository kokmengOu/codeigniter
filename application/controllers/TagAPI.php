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

	public function addTag()
	{
		
	}

	public function getTag()
	{
	}

	public function deleteTag()
	{
	}

}
