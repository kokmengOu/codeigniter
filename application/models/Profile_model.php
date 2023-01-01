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
	}

	public function getUserQuestion($data)
	{
		$this->db->where('user_id', $data);
		$query = $this->db->get('question');

		if($query->num_rows() > 0){
			return $query->result();
		}
	
	}


	public function getUserTag($data)
	{
		$this->db->where('user_id', $data);
		$query = $this->db->get('tag');

		if($query->num_rows() > 0){
			return $query->result();
		}
	}

	public function getFavorite(){
		
		$this->db->select('question.question_id, question.question_title , question.question_upvote, question.question_published, question.question_downvote, question.question_content, favorite.user_id');
		$this->db->join('question', 'favorite.question_id = question.question_id');
		$query = $this->db->get('favorite');
		
		if ($query->num_rows() > 0) {
			return $query->result();
		}
		else{
			return 'ERROR 404';
		}

	}

	public function updateDescription($id , $data)
	{
		$this->db->where('user_id', $id);
		$this->db->update('user_detail', $data);
	}

	public function updateBio($id , $data)
	{
		$this->db->where('user_id', $id);
		$this->db->update('user_detail', $data);
	}

	public function deleteQuestion($id)
	{
		$data = array(
			'question_id' => $id,
		);

		$this->db->where($data);
		$query = $this->db->delete('question_tag');
		if ($query) {

			$this->db->where($data);
			$query = $this->db->delete('favorite');

				$this->db->where($data);
				$query = $this->db->delete('question');
		}else{

			$this->db->where($data);
			$query = $this->db->delete('favorite');

				$this->db->where($data);
				$query = $this->db->delete('question');
		}
	}

	public function deleteTag($id)
	{
		$data = array(
			'tag_id' => $id,
		);

		$this->db->where($data);
		$query = $this->db->delete('question_tag');
		if ($query) {
			$this->db->where($data);
			$query = $this->db->delete('tag');
		}else{
			$this->db->where($data);
			$query = $this->db->delete('tag');
		}
	}

	public function deleteFavorite($id)
	{
		$data = array(
			'question_id' => $id,
		);
		$this->db->where($data);
		$query = $this->db->delete('favorite');
	}

}
