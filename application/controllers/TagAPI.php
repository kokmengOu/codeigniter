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
		$this->load->view('listtag');
	}

	public function createTag()
	{
		$this->load->view('addTag');
		$this->session->unset_userdata('tag_id');
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
		$response["tags"] = $this->Tag_model->getTag();
		echo json_encode($response);
	}

	public function vieweachTag(){
		$this->load->view('vieweachtag');
		$data = array('tag_id' => $this->uri->segment(3));
		$this->session->set_userdata( $data );
		
	}

	public function getsingleTag()
	{
		$response["eachTags"] = $this->Tag_model->getsingleTag($this->session->userdata('tag_id'));
		echo json_encode($response);
	}

	public function getQuestionTag()
	{		
		$response["questionTags"] = $this->Tag_model->getQuestionTag($this->session->userdata('tag_id'));
		echo json_encode($response);
	}


}
