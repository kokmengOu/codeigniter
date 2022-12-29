<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tag_model extends CI_Model {

    function __construct()
    {
        $this->table = 'tag';
		parent::__construct();
        $this->load->database();
    }

	public function getTag()
	{
		$query = $this->db->get($this->table);
		if ($query->num_rows() > 0) {
			return $query->result();
		}
		else{
			return 'ERROR 404';
		}
	}

	public function addTag($data)
	{
		if ($this->db->insert($this->table,$data)) {
			return true;
		}
		else{
			return false;
		}
	}


}
