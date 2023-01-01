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

	public function EachTag($data)
	{
		$this->db->where('tag_id', $data);
		$query = $this->db->get($this->table);
		if($query->num_rows() > 0){
			return $query->result();
		}else{
			return false;
		}
	}

	public function getsingleTag($id)
	{
		$this->db->where('tag_id', $id);
		$query = $this->db->get($this->table);
		if($query->num_rows() > 0){
			return $query->result();
		}else{
			return false;
		}
	}

	public function getQuestionTag($id)
	{
		
		$this->db->select(' question.question_id, question.question_title , question.question_upvote, question.question_published, question.question_downvote, question.question_content , question_tag.tag_id');    
		$this->db->from('question_tag');
		$this->db->join('question', 'question_tag.question_id = question.question_id');
		$query = $this->db->get();

		if($query->num_rows() > 0){
			return $query->result();
		}else{
			return false;
		}
	}
	
	public function geteachQuestiontag()
	{
		
		$this->db->select('tag.tag_id ,tag.tag_title, tag.tag_content, question_tag.question_id');
		 $this->db->join('tag', 'question_tag.tag_id=tag.tag_id');
		 $query =$this->db->get('question_tag');
		
		if ($query->num_rows() > 0) {
			return  $query->result();
		}else{
			return false;
		}
		
	}


}
