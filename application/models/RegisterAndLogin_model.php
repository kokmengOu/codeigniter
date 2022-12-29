<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class RegisterAndLogin_model extends CI_Model {

    function __construct()
    {
        $this->table = 'user_detail';
		parent::__construct();
        $this->load->database();
    }

	public function is_email_available($data)
	{
		$this->db->where('user_Email', $data);
		$query = $this->db->get($this->table);

		if($query->num_rows() > 0){
			return true;
		}
		else{
			return false;
		}

	}

	public function insert($data)
	{

		if($this->db->insert('user_detail',$data))
		{    
			return 'Data is inserted successfully';
		}
		  else
		{
			return "Error has occured";
		}
	}


	public function checkUser($email, $password)
	{
		$this->db->where('user_Email', $email);
		$query = $this->db->get($this->table);

		if($query->num_rows() > 0){
			foreach ($query->result() as $row ) {
				if(password_verify($password,$row->user_passwordHash)){
					$data = array(
						'username' => $row->user_FullName,
						'id'=> $row->user_id,
						'loggin_in' => true
					);
					$this->session->set_userdata($data);
				}else{
					return false;
				}
			}
		}
		else{
			return false;
		}

	}

}
