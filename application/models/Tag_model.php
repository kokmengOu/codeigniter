<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tag_model extends CI_Model {

    function __construct()
    {
        $this->table = 'tag';
		parent::__construct();
        $this->load->database();
    }

	public function is_email_available($data)
	{
		
	}

	public function insert($data)
	{

	}


	public function checkUser($email, $password)
	{


	}

}
