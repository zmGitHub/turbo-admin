import React from 'react';
import './Sidebar.scss' 

export const Sidebar = () => (
<div className="page-sidebar navbar-collapse collapse">
	<ul className="page-sidebar-menu">
		<li className="heading">
			<h3>GENERAL</h3>
		</li>
		<li className="start">
			<a href="#/dashboard.html">
			<i className="icon-home"></i>
			<span className="title">Dashboard</span>
			</a>
		</li>
		<li>
			<a href="javascript:;">
			<i className="icon-settings"></i>
			<span className="title">AngularJS Features</span>
			<span className="arrow"></span>
			</a>
			<ul className="sub-menu">
				<li>
					<a href="#/ui_bootstrap.html">
					<i className="icon-puzzle"></i> UI Bootstrap
					</a>
				</li>
				<li>
					<a href="#/file_upload.html">
					<i className="icon-paper-clip"></i> File Upload
					</a>
				</li>
				<li>
					<a href="#/ui_select.html">
					<i className="icon-check"></i> UI Select
					</a>
				</li>
			</ul>
		</li>
		<li>
			<a href="javascript:;">
			<i className="icon-wrench"></i>
			<span className="title">jQuery Plugins</span>
			<span className="arrow "></span>
			</a>
			<ul className="sub-menu">
				<li>
					<a href="#/form-tools">
						<i className="icon-puzzle"></i> Form Tools
					</a>
				</li>
				<li>
					<a href="#/pickers">
						<i className="icon-calendar"></i> Date & Time Pickers
					</a>
				</li>
				<li>
					<a href="#/dropdowns">
						<i className="icon-refresh"></i> Custom Dropdowns
					</a>
				</li>
				<li>
					<a href="#/tree">
						<i className="icon-share"></i> Tree View
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<i className="icon-briefcase"></i> Datatables
						<span className="arrow "></span>
					</a>
					<ul className="sub-menu">
						<li>
							<a href="#/datatables/advanced.html">
							<i className="icon-tag"></i> Advanced Datatables
							</a>
						</li>
						<li>
							<a href="#/datatables/ajax.html">
							<i className="icon-refresh"></i> Ajax Datatables
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</li>
		<li>
			<a href="#/profile/dashboard" id="sidebar_menu_link_profile">
			<i className="icon-user"></i>
			<span className="title">User Profile</span>
			</a>
		</li>
		<li>
			<a href="#/todo">
			<i className="icon-check"></i>
			<span className="title">Task & Todo</span>
			</a>
		</li>
		<li>
			<a href="../index.html" target="_blank">
			<i className="icon-paper-plane"></i>
			<span className="title">HTML Version</span>
			</a>
		</li>
	</ul>	
</div>	
)
export default Sidebar