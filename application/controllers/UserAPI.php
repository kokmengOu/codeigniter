<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/RestController.php';
use chriskacerguis\RestServer\RestController;

class UserAPI extends CI_Controller {
    
    public function __construct()
    {
		parent::__construct();
        $this->load->model('RegisterAndLogin_model');
    }

	public function index()
	{
		$this->load->view('register');
	}

	public function checkEmail()
	{
		$this->is_available = null;
		$data=$this->input->post('email');
		$response = $this->RegisterAndLogin_model->is_email_available($data);
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
			'user_FullName' => $this->input->post('username'),
			'user_Email' => $this->input->post('email'),
			'user_passwordHash' => 	password_hash($this->input->post('password'), PASSWORD_BCRYPT, $options),
			'user_Lastlogin' => date('Y-m-d H:i:s'),
		);

			if($this->RegisterAndLogin_model->insert($data)==true){
			        echo "Records Saved Successfully";
					
					redirect(base_url() . 'index.php/Home/index');
					
			}
			else{
					echo "Insert error !";
			}
	}

	public function login_post()
	{
		$this->is_available = null;
		$email=$this->input->post('email');
		$password=$this->input->post('password');
		$response = $this->RegisterAndLogin_model->checkUser($email,$password);

		$array = array(
			'login_is_available' => $response
		);

		echo json_encode($array);
	}

}
