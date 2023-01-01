<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Question_model extends CI_Model {

    function __construct()
    {
        $this->table ='question';
		parent::__construct();
        $this->load->database();
    }

	public function getQuestion()
	{
		$query = $this->db->get('question');
		
		if ($query->num_rows() > 0) {
			return $query->result();
		}
		else{
			return 'ERROR 404';
		}
	}

	public function getQuestionTag($modelCode){

		$this->db->select('tag.tag_title, tag.tag_id, question.question_id');
		
		$this->db->join('question', 'question_tag.question_id = question.question_id');
		$this->db->join('tag', 'question_tag.tag_id = tag.tag_id');

		$query = $this->db->get('question_tag');
		
		if ($query->num_rows() > 0) {
			return $query->result();
		}
		else{
			return 'ERROR 404';
		}
	}

	public function upvote($id,$count)
	{
			$this->db->set('question_upvote', $count);
			$this->db->where('question_id', $id);
			$this->db->update('question');
	}

	public function downvote($id,$count)
	{
			$this->db->set('question_downvote', $count);
			$this->db->where('question_id', $id);
			$this->db->update('question');
	}

	public function getSingleQuestion($data)
	{
		$this->db->where('question_id', $data);
		$query = $this->db->get($this->table);
		if($query->num_rows() > 0){
			return $query->result();
		}else{
			return false;
		}
	}

	public function getQuestionUser($data)
	{
		$this->db->where('user_id', $data);
		$query = $this->db->get('user_detail');
		if($query->num_rows() > 0){
			return $query->result();
		}else{
			return false;
		}
	}

	public function addQuestion($data , $title)
	{
		if($this->db->insert($this->table,$data)) {

			$this->db->where('question_title', $title);
			$query = $this->db->get($this->table);
			if($query->num_rows() > 0){
				foreach ($query->result() as $row ) {
					return $row->question_id;
				}
			}else{
				return false;
			}

		}
		else{
			return false;
		}
	}

	public function addValuefive($user, $tag, $question)
	{
		$this->db->where('tag_title', $tag);
		$query = $this->db->get('tag');
		if($query->num_rows() > 0){
			foreach ($query->result() as $row ) {
				$value = array(
					'user_id' => $user, 
					'tag_id' => $row->tag_id, 
					'question_id' => $question,
				);
				if($this->db->insert('question_tag', $value )) {
					return true;
				}
				else{
					return false;
				}
			}
		}
	}

	public function addValueone($user, $tag, $question)
	{
		$this->db->where('tag_title', $tag);
		$query = $this->db->get('tag');
		if($query->num_rows() > 0){
			foreach ($query->result() as $row ) {
				$value = array(
					'user_id' => $user, 
					'tag_id' => $row->tag_id, 
					'question_id' => $question,
				);
				if($this->db->insert('question_tag', $value )) {
					return true;
				}
				else{
					return false;
				}
			}
		}
	}

	public function addValuetwo($user, $tag, $question)
	{
		$this->db->where('tag_title', $tag);
		$query = $this->db->get('tag');
		if($query->num_rows() > 0){
			foreach ($query->result() as $row ) {
				$value = array(
					'user_id' => $user, 
					'tag_id' => $row->tag_id, 
					'question_id' => $question,
				);
				if($this->db->insert('question_tag', $value )) {
					return true;
				}
				else{
					return false;
				}
			}
		}
	}

	public function addValuethree($user, $tag, $question)
	{
		$this->db->where('tag_title', $tag);
		$query = $this->db->get('tag');
		if($query->num_rows() > 0){
			foreach ($query->result() as $row ) {
				$value = array(
					'user_id' => $user, 
					'tag_id' => $row->tag_id, 
					'question_id' => $question,
				);
				if($this->db->insert('question_tag', $value )) {
					return true;
				}
				else{
					return false;
				}
			}
		}
	}

	public function addValuefour($user, $tag, $question)
	{
		$this->db->where('tag_title', $tag);
		$query = $this->db->get('tag');
		if($query->num_rows() > 0){
			foreach ($query->result() as $row ) {
				$value = array(
					'user_id' => $user, 
					'tag_id' => $row->tag_id, 
					'question_id' => $question,
				);
				if($this->db->insert('question_tag', $value )) {
					return true;
				}
				else{
					return false;
				}
			}
		}
	}

	public function seachQuestion($data)
	{
		
		$this->db->where($data);
		$query = $this->db->get($this->table);
		if($query->num_rows() > 0){
			return $query->result();	
		}
		else{
			return false;
		}
		
	}

	public function deleteFavorite($id)
	{
		$this->db->where($id);
		$query = $this->db->delete('favorite');
	}

	public function addFavorite( $data)
	{
		if ($this->db->insert('favorite',$data)) {
			return true;
		}
		else{
			return false;
		}
	}

	public function checkFavorite($id)
	{
		
		$this->db->where('question_id', $id);
		$query =$this->db->get('favorite');
		if ($query->num_rows() > 0) {
			$arrayName = array(
				'check' =>true , 
			);
			return $arrayName;
		}else{
			$arrayName = array(
				'check' =>false , 
			);
			return $arrayName;
		}
	}
	
}
