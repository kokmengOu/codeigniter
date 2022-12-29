<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/RestController.php';
use chriskacerguis\RestServer\RestController;

class TagAPI extends CI_Controller {
    
    public function __construct()
    {
		parent::__construct();
        $this->load->model('Tag_model');
		if (!isset($_SESSION['loggin_in'])) {
			
			redirect('UserAPI/index','refresh');
		}
    }

	public function index()
	{
		$this->load->view('addTag');
	}

	public function AddTag()
	{
		$data = array(
			'user_id' => $this->input->post('userID'), 
			'tag_title' => $this->input->post('tagTitle'), 
			'tag_content' => $this->input->post('tagContent'), 
			'tag_timestamp' => date('Y-m-d H:i:s'),
		);

		if ($this->Tag_model->addTag($data)==true) {
			echo "Records Saved Successfully";
					
			redirect('HomeAPI/index');
		}else{
			echo "Insert error !";
		}
	}

	public function getTag()
	{

	}

	public function deleteTag()
	{
	}

}
