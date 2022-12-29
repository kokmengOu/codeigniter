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
		$this->db->select('user_detail.user_FullName,question.question_id, question.question_title, question.question_content, question.question_published, question.question_upvote, question.question_downvote');
		
		$this->db->join('user_detail', 'user_detail.user_id=question.question_id');
		
		$query = $this->db->get('question');
		
		if ($query->num_rows() > 0) {
			return $query->result();
		}
		else{
			return 'ERROR 404';
		}
	}

	public function getQuestionTag(){

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
}
