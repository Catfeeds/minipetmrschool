<?php
namespace Ht\Controller;
use Think\Controller;
class StustyleController extends PublicController{
	/*
	*
	* 获取、查询课程表数据
	*/
	public function index(){

		//搜索
		$title = trim($_REQUEST['title']);
		//构建搜索条件
		$condition = array();
		$condition['del'] = 0;
		if ($title) {
			$condition['title'] = array('LIKE','%'.$title.'%');
		}

		//分页
		$count = M('student_style')->where($condition)->count();// 查询满足要求的总记录数
		$Page    = new \Think\Page($count,25);// 实例化分页类 传入总记录数和每页显示的记录数(25)

		//分页跳转的时候保证查询条件
		foreach($condition as $key=>$val) {
		    $Page->parameter[$key]  =  urlencode($val);
		}

		//头部描述信息，默认值 “共 %TOTAL_ROW% 条记录”
		$Page->setConfig('header', '<li class="rows">共<b>%TOTAL_ROW%</b>条&nbsp;第<b>%NOW_PAGE%</b>页/共<b>%TOTAL_PAGE%</b>页</li>');
		//上一页描述信息
	    $Page->setConfig('prev', '上一页');
	    //下一页描述信息
	    $Page->setConfig('next', '下一页');
	    //首页描述信息
	    $Page->setConfig('first', '首页');
	    //末页描述信息
	    $Page->setConfig('last', '末页');
	    /*
	    * 分页主题描述信息 
	    * %FIRST%  表示第一页的链接显示  
	    * %UP_PAGE%  表示上一页的链接显示   
	    * %LINK_PAGE%  表示分页的链接显示
	    * %DOWN_PAGE% 	表示下一页的链接显示
	    * %END%   表示最后一页的链接显示
	    */
	    $Page->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');

		$show    = $Page->show();// 分页显示输出
		// 进行分页数据查询 注意limit方法的参数要使用Page类的属性
		$list = M('student_style')->where($condition)->order('id desc')->limit($Page->firstRow.','.$Page->listRows)->select();
		foreach ($list as $k => $v) {
			$list[$k]['addtime'] = date("Y-m-d H:i",$v['addtime']);
		}

		$this->assign('list',$list);// 赋值数据集
		$this->assign('page',$show);// 赋值分页输出

		//搜索内容输出
		$this->assign('title',$title);
		$this->display(); // 输出模板

	}


	/*
	*
	* 跳转添加或修改新闻页面
	*/
	public function add(){
		$info = M('student_style')->where('id='.intval($_REQUEST['id']))->find();
		// if ($info) {
		// 	if (intval($info['opentime'])) {
		// 		$info['opentime'] = date("Y-m-d H:i",$info['opentime']);
		// 	}else{
		// 		$info['opentime'] = '待定';
		// 	}
		// }
		$this->assign('info',$info);
		$this->display();
	}


	/*
	*
	* 添加或修改新闻信息
	*/
	public function save(){
		//构建数组
		M('student_style')->create();
		$id = intval($_REQUEST['id']);
		if (!empty($_FILES["file"]["tmp_name"])) {
			//文件上传
			$info = $this->upload_images($_FILES["file"],array('jpg','png','jpeg'),"stustyle/".date(Ymd));
			if(!is_array($info)) {// 上传错误提示错误信息
				$this->error($info);
				exit();
			}else{// 上传成功 获取上传文件信息
				M('student_style')->photo = 'UploadFiles/'.$info['savepath'].$info['savename'];
				$xt = M('student_style')->where('id='.intval($id))->field('photo')->find();
				if (intval($id) && $xt['photo']) {
					$img_url = "Data/".$xt['photo'];
					if(file_exists($img_url)) {
						@unlink($img_url);
					}
				}
			}
		}

		//来源
		if(empty($_POST['source'])){
			M('student_style')->source = '雷米高';
		}	

		//保存数据
		if (intval($id)) {
			$result = M('student_style')->where('id='.intval($id))->save();
		}else{
			//保存操作时间
			M('student_style')->addtime = time();
			$result = M('student_style')->add();
		}
		//判断数据是否更新成功
		if ($result) {
			$this->success('操作成功.','index');
		}else{
			$this->error('操作失败.');
		}
	}

	/*
	*
	* 新闻删除、新闻评论删除
	*/
	public function del(){
		//以后删除还要加权限登录判断
		$id = intval($_REQUEST['did']);
		$check_info = M('student_style')->where('id='.intval($id))->find();
		if (!$check_info) {
			$this->error('非法操作.');
			exit();
		}

		if (intval($check_info['del'])==1) {
			$this->redirect('index');
			exit();
		}

		$res = M('student_style')->where('id='.intval($id))->save(array('del'=>1));
		if ($res) {
			//把对应图片也一起删除
			$xt = $check_info['photo'];
			if ($xt) {
				$img_url = "Data/".$xt;
				if(file_exists($img_url)) {
					@unlink($img_url);
				}
			}
			$this->redirect('index');
		}else{
			$this->error('操作失败.');
		}
	}
}