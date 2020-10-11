/** @format */

import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  UserAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const { SubMenu } = Menu;

const Header = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
      <Menu.Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Menu.Item>

      <SubMenu key='SubMenu' icon={<SettingOutlined />} title='Username'>
        <Menu.Item key='setting:1'>Option 1</Menu.Item>
        <Menu.Item key='setting:2'>Option 2</Menu.Item>
        <Menu.Item icon={<LoginOutlined />} onClick={logout}>
          Logout
        </Menu.Item>
      </SubMenu>

      <Menu.Item key='login' icon={<UserOutlined />} className='float-right'>
        <Link to='/login'>Login</Link>
      </Menu.Item>

      <Menu.Item
        key='register'
        icon={<UserAddOutlined />}
        className='float-right'>
        <Link to='/register'>Register</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
