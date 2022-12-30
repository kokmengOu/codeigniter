<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Profile_model extends CI_Model {

    function __construct()
    {
        $this->table = 'user_detail';
		parent::__construct();
        $this->load->database();
    }

	public function getUserDetail($data)
	{
		$this->db->where('user_id', $data);
		$query = $this->db->get($this->table);

		if($query->num_rows() > 0){
			return $query->result();
		}
		else{
			return "Error 404";
		}
	}

	public function getUserQuestion($data)
	{
		$this->db->where('user_id', $data);
		$query = $this->db->get('question');

		if($query->num_rows() > 0){
			return $query->result();
		}
		else{
			return "Error 404";
		}
	}


	public function getUserTag($data)
	{
		$this->db->where('user_id', $data);
		$query = $this->db->get('tag');

		if($query->num_rows() > 0){
			return $query->result();
		}
		else{
			return "Error 404";
		}
	}

	public function updateDescription($id)
	{

	}

}
