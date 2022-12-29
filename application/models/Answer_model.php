<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Answer_model extends CI_Model {

    function __construct()
    {
        $this->table = 'question';
		parent::__construct();
        $this->load->database();
    }

	public function getQuestion()
	{
		$this->db->select('*');
		$result = $this->db->get($this->table);
		

		
	}



}
