import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Input, DatePicker } from 'antd';import {checkInStart, checkInSuccess, checkInFailure, closePopup, openPopup} from "../slices/roomsSlice";
import {checkInRoom} from "../store/actionRooms"
import moment from 'moment'
import { UserOutlined } from '@ant-design/icons';


const ModalCheckIn = ({room}) => {
    const isShowPopup = useSelector(state => state.room.isShowPopup); 
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [selectedDates, setSelectedDates] = useState([]);


    const handleOk = () => {
        dispatch(checkInRoom({name: inputValue}, {id: room.id, isCheckedIn: true, checkInDate: moment().format('YYYY-MM-DD')}));
        dispatch(closePopup());
    };
  
    const handleCancel = () => {
      dispatch(closePopup());
    };

    const showModal = () => {
        dispatch(openPopup());
      };

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
    
      const validateMessages = {
        required: '${label} is required!',
        types: {
          text: '${label} is not a valid email!',
          data: '${label} is not a valid number!',
        },
      };

    console.log('scsscscscssss')

      return (
        <>
        <Button type="primary" disabled={room.isCheckedIn} onClick={showModal}>
          Check In
        </Button>
        <Modal title="Basic Modal" open={isShowPopup} onOk={handleOk} onCancel={handleCancel}>
          <p>Please add guest's name</p>
          <Input placeholder="enter guest's name" prefix={<UserOutlined />} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <p>Please enter date</p>
          <DatePicker.RangePicker placeholder={['Check in', 'Check out']} onChange={dates => setSelectedDates(dates)} />
        </Modal>
      </>
    );
  };

export default ModalCheckIn