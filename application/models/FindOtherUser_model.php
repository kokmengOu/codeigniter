<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FindOtherUser_model extends CI_Model {

    function __construct()
    {
        $this->table = 'user_detail';
		parent::__construct();
        $this->load->database();
    }

	public function getOtherUser()
	{
		$this->db->select('user_id , user_FullName, user_Email, user_Lastlogin, user_Lasrlogout, user_description, user_bio');
		
		$query = $this->db->get($this->table);
		if ($query->num_rows() > 0) {
			return $query->result();
		}
		
	}

	public function eachUser($id)
	{
		$this->db->select('user_id , user_FullName, user_Email, user_Lastlogin, user_Lasrlogout, user_description, user_bio');
		$this->db->where('user_id', $id);
		$query = $this->db->get($this->table);
		if ($query->num_rows() > 0) {
			return $query->result();
		}
	}

	public function eachUserquestion($id)
	{
		$this->db->where('user_id', $id);
		$query = $this->db->get('question');
		if ($query->num_rows() > 0) {
			return $query->result();
		}
	}

	public function eachUsertag($id)
	{
		$this->db->where('user_id', $id);
		$query = $this->db->get('tag');
		if ($query->num_rows() > 0) {
			return $query->result();
		}
	}


}
