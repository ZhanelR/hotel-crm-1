import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';
import {checkOutRoom} from "../store/actionRooms"
import moment from 'moment'

const ModalCheckOut = ({room}) => {
    // const isShowPopup = useSelector(state => state.room.isShowPopup) 
    const [isShowPopup, setIsShowPopup] = useState()
    const dispatch = useDispatch()

    const onOk = () => {
        dispatch(checkOutRoom({name:""}, {id: room.id, isCheckedIn: false, checkInDate:"2017-04-02"}));
        setIsShowPopup(false)
    };
  
    const handleCancel = () => {
      setIsShowPopup(false)
    };

    const showModal = () => {
      setIsShowPopup(true)
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
      /* eslint-enable no-template-curly-in-string */
      
     /*  const onFinish = ({room}) => {
    
        dispatch(checkInRoom({name:"vasya"}, {id:1}));    
    }; */
   
      return (
        <>
          <Button type="primary" disabled={!room.isCheckedIn} onClick={showModal}>
            Check Out
          </Button>
          <Modal title="Basic Modal" open={isShowPopup} onOk={onOk} onCancel={handleCancel}>
            <p>Are you sure you want to check the guest out?</p>
          </Modal>
        </>
      );
    };

export default ModalCheckOut