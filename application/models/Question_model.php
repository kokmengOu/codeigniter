<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/RestController.php';
use chriskacerguis\RestServer\RestController;

class UserAPI extends CI_Controller {
    
    public function __construct()
    {
		parent::__construct();
        $this->load->model('User_model');
    }

	public function index()
	{
		$this->load->view('register');
	}

	public function checkEmail()
	{
		$this->is_available = null;
		$data=$this->input->post('email');
		$response = $this->User_model->is_email_available($data);
		if($response==true){
			$this->is_available = 'yes';
		}else{
			$this->is_available = 'no';
		}

		$array = array(
			'is_available' => $this->is_available
		);

		echo json_encode($array);
	}

	public function register_post()
	{
		$options = [
			'cost' => 12,
		];

		$data = array(
			'user_name' => $this->input->post('username'),
			'user_email' => $this->input->post('email'),
			'user_passwordhash' => 	password_hash($this->input->post('password'), PASSWORD_BCRYPT, $options),
		);

			if($this->User_model->insert($data)==true){
			        echo "Records Saved Successfully";
			}
			else{
					echo "Insert error !";
			}
	}

	public function login_post()
	{
		# code...
	}

}
