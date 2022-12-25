<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {

    function __construct()
    {
        $this->table = 'user';
		parent::__construct();
        $this->load->database();
    }

	public function is_email_available($data)
	{
		$this->db->where('user_email', $data);
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

		if($this->db->insert('user',$data))
		{    
			return 'Data is inserted successfully';
		}
		  else
		{
			return "Error has occured";
		}
	}

	public function checkUser($data)
	{
        $this->user_email  = $data['email'];
        $query = $this->db->get_where($this->table, $this);
        return $query->row_array();
	}
}
