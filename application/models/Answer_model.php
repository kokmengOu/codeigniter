<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Answer_model extends CI_Model {

    function __construct()
    {
        $this->table = 'answer';
		parent::__construct();
        $this->load->database();
    }

	public function getAnswer($id)
	{
		
		$this->db->where('question_id', $id);
		$result = $this->db->get($this->table);
		if ($result->num_rows() > 0) {
			return $result->result();
		}else{
			return false;
		}
	}

	public function getComment($answer)
	{
		$this->db->where('question_id', $answer);
		$result = $this->db->get('comment');
		if ($result->num_rows() > 0) {
			return $result->result();
		}else{
			return false;
		}
	}

	public function addComment($data)
	{
		if ($this->db->insert('comment',$data)) {
			return true;
		}
		else{
			return false;
		}
	}

	public function addAnswer( $data)
	{
		if ($this->db->insert('answer',$data)) {
			return true;
		}
		else{
			return false;
		}
	}

	public function upvote($id,$count)
	{
			$this->db->set('answer_upvote', $count);
			$this->db->where('answer_id', $id);
			$this->db->update('answer');
	}

	public function downvote($id,$count)
	{
			$this->db->set('answer_downvote', $count);
			$this->db->where('answer_id', $id);
			$this->db->update('answer');
	}

	public function deleteAnswer($id)
	{
		$data = array(
			'answer_id' => $id,
		);

		$this->db->where($data);
		$query = $this->db->delete('answer');
	}

	public function deleteComment($id)
	{
		$data = array(
			'comment_id' => $id,
		);

		$this->db->where($data);
		$query = $this->db->delete('comment');

	}


}
